const fs = require('fs');
const vm = require('vm');
const test = require('node:test');
const assert = require('node:assert');

const code = fs.readFileSync('./lab-worker.js', 'utf8');

function createWorkerContext() {
  const context = {
    self: {
      postMessage: (msg) => {
        context.lastMessage = msg;
      },
    },
    setTimeout: (fn, ms) => {
      return setTimeout(fn, ms);
    },
    clearTimeout: (id) => {
      clearTimeout(id);
    },
    performance: {
      now: () => Date.now()
    },
    Math: Math,
    Float32Array: Float32Array,
    Object: Object,
    Array: Array,
    console: console,
    lastMessage: null,
  };
  vm.createContext(context);
  vm.runInContext(code, context);
  return context;
}

function sendMsg(context, type, payload = {}) {
  const handler = vm.runInContext('self.onmessage', context);
  handler({ data: { type, payload } });
}

function getState(context, variable) {
  return vm.runInContext(variable, context);
}

test('lab-worker state transitions (INIT, PAUSE, RESUME, RESET)', () => {
  const context = createWorkerContext();

  assert.strictEqual(getState(context, 'isRunning'), false);

  // INIT
  sendMsg(context, 'INIT');
  assert.strictEqual(getState(context, 'isRunning'), true);
  const loopHandleInit = getState(context, 'loopHandle');
  assert.ok(loopHandleInit !== null);

  // PAUSE
  sendMsg(context, 'PAUSE');
  assert.strictEqual(getState(context, 'isRunning'), false);
  assert.strictEqual(getState(context, 'loopHandle'), null);

  // RESUME
  sendMsg(context, 'RESUME');
  assert.strictEqual(getState(context, 'isRunning'), true);

  // RESET
  sendMsg(context, 'RESET');
  assert.strictEqual(getState(context, 'isRunning'), false);
  assert.strictEqual(getState(context, 'simTime'), 0.0);
});

test('lab-worker solves simple BATTERY and RESISTOR circuit', () => {
  const context = createWorkerContext();

  const components = [
    {
      id: 'bat1',
      type: 'BATTERY_9V',
      terminals: { pos: 'PIN_BAT_P', neg: 'PIN_BAT_N' },
      properties: { voltage: 9.0 }
    },
    {
      id: 'res1',
      type: 'RESISTOR',
      terminals: { pinA: 'PIN_RES_A', pinB: 'PIN_RES_B' },
      properties: { resistance: 220 }
    }
  ];

  const wires = [
    { fromPin: 'PIN_BAT_P', toPin: 'PIN_RES_A' },
    { fromPin: 'PIN_BAT_N', toPin: 'PIN_RES_B' } // Connect to ground side
  ];

  // We simulate connecting battery negative to GND via rail connection
  // the script connects RAIL_* to GND. We'll just add a wire to ground rail
  wires.push({ fromPin: 'PIN_BAT_N', toPin: 'RAIL_TOP_NEG_1' });

  sendMsg(context, 'TOPOLOGY_UPDATE', { components, wires });

  // Run step
  vm.runInContext('solveCircuitStep()', context);

  const nodeVoltages = getState(context, 'nodeVoltages');
  const branchCurrents = getState(context, 'branchCurrents');

  assert.strictEqual(nodeVoltages['PIN_BAT_N'], 0.0);
  assert.strictEqual(nodeVoltages['PIN_BAT_P'], 9.0);

  assert.strictEqual(nodeVoltages['PIN_RES_A'], 9.0);
  assert.strictEqual(nodeVoltages['PIN_RES_B'], 0.0);

  // 9V / 220 Ohm = 0.0409 A
  assert.ok(Math.abs(branchCurrents['res1'] - (9 / 220)) < 0.001);
});

test('lab-worker solves LED current clamping logic', () => {
  const context = createWorkerContext();

  // Battery -> LED -> GND
  const components = [
    {
      id: 'bat1',
      type: 'BATTERY_9V',
      terminals: { pos: 'PIN_BAT_P', neg: 'PIN_BAT_N' },
      properties: { voltage: 9.0 } // high voltage should trigger clamp
    },
    {
      id: 'led1',
      type: 'LED',
      terminals: { anode: 'PIN_LED_A', cathode: 'PIN_LED_K' },
      properties: { forwardVoltage: 2.0 }
    }
  ];

  const wires = [
    { fromPin: 'PIN_BAT_P', toPin: 'PIN_LED_A' },
    { fromPin: 'PIN_BAT_N', toPin: 'PIN_LED_K' },
    { fromPin: 'PIN_BAT_N', toPin: 'RAIL_TOP_NEG_1' } // Ground it
  ];

  sendMsg(context, 'TOPOLOGY_UPDATE', { components, wires });

  // Run step
  vm.runInContext('solveCircuitStep()', context);

  const nodeVoltages = getState(context, 'nodeVoltages');
  const branchCurrents = getState(context, 'branchCurrents');

  assert.strictEqual(nodeVoltages['PIN_BAT_N'], 0.0);
  assert.strictEqual(nodeVoltages['PIN_BAT_P'], 9.0);

  // Expected logic: vDrop = 9.0 - 0.0 = 9.0
  // I = (9.0 - 2.0) / 68.0 = 7.0 / 68 = 0.1029
  // Clamped max is 0.025
  assert.strictEqual(branchCurrents['led1'], 0.025);

  // Now test under clamped logic
  const componentsUnder = [
    {
      id: 'bat2',
      type: 'BATTERY_9V',
      terminals: { pos: 'PIN_BAT_P', neg: 'PIN_BAT_N' },
      properties: { voltage: 3.0 } // 3V
    },
    {
      id: 'led2',
      type: 'LED',
      terminals: { anode: 'PIN_LED_A', cathode: 'PIN_LED_K' },
      properties: { forwardVoltage: 2.0 }
    }
  ];

  const wiresUnder = [
    { fromPin: 'PIN_BAT_P', toPin: 'PIN_LED_A' },
    { fromPin: 'PIN_BAT_N', toPin: 'PIN_LED_K' },
    { fromPin: 'PIN_BAT_N', toPin: 'RAIL_TOP_NEG_1' } // Ground it
  ];

  sendMsg(context, 'TOPOLOGY_UPDATE', { components: componentsUnder, wires: wiresUnder });
  vm.runInContext('solveCircuitStep()', context);

  const branchCurrentsUnder = getState(context, 'branchCurrents');

  // Expected logic: vDrop = 3.0 - 0.0 = 3.0
  // I = (3.0 - 2.0) / 68.0 = 1 / 68 = 0.0147 A
  assert.ok(Math.abs(branchCurrentsUnder['led2'] - (1 / 68)) < 0.001);

  // Test below threshold
  const componentsBelow = [
    {
      id: 'bat3',
      type: 'BATTERY_9V',
      terminals: { pos: 'PIN_BAT_P', neg: 'PIN_BAT_N' },
      properties: { voltage: 1.0 } // 1V
    },
    {
      id: 'led3',
      type: 'LED',
      terminals: { anode: 'PIN_LED_A', cathode: 'PIN_LED_K' },
      properties: { forwardVoltage: 2.0 }
    }
  ];

  const wiresBelow = [
    { fromPin: 'PIN_BAT_P', toPin: 'PIN_LED_A' },
    { fromPin: 'PIN_BAT_N', toPin: 'PIN_LED_K' },
    { fromPin: 'PIN_BAT_N', toPin: 'RAIL_TOP_NEG_1' } // Ground it
  ];

  sendMsg(context, 'TOPOLOGY_UPDATE', { components: componentsBelow, wires: wiresBelow });
  vm.runInContext('solveCircuitStep()', context);

  const branchCurrentsBelow = getState(context, 'branchCurrents');
  assert.strictEqual(branchCurrentsBelow['led3'], 0.0);
});
