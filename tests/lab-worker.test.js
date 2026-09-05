const fs = require('fs');
const vm = require('vm');
const test = require('node:test');
const assert = require('node:assert');

// Read the script
const code = fs.readFileSync('./lab-worker.js', 'utf8');

test('lab-worker.js tests', async (t) => {
  // Set up mock context
  const context = {
    self: {
      postMessage: (msg) => {
        if (context.onPostMessage) {
          context.onPostMessage(msg);
        }
      }
    },
    performance: {
      now: () => Date.now()
    },
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    Float32Array: Float32Array,
    Object: Object,
    Array: Array,
    Math: Math,
    console: console,
  };

  vm.createContext(context);
  vm.runInContext(code, context);

  const getVar = (name) => vm.runInContext(name, context);
  const callFunc = (name) => vm.runInContext(`${name}()`, context);

  await t.test('INIT starts simulation', () => {
    assert.strictEqual(getVar('isRunning'), false);
    context.self.onmessage({ data: { type: 'INIT' } });
    assert.strictEqual(getVar('isRunning'), true);
    assert.notStrictEqual(getVar('loopHandle'), null);
  });

  await t.test('PAUSE stops simulation', () => {
    context.self.onmessage({ data: { type: 'PAUSE' } });
    assert.strictEqual(getVar('isRunning'), false);
    assert.strictEqual(getVar('loopHandle'), null);
  });

  await t.test('RESUME restarts simulation', () => {
    context.self.onmessage({ data: { type: 'RESUME' } });
    assert.strictEqual(getVar('isRunning'), true);
    assert.notStrictEqual(getVar('loopHandle'), null);
  });

  await t.test('RESET clears state', () => {
    context.self.onmessage({ data: { type: 'RESET' } });
    assert.strictEqual(getVar('isRunning'), false);
    assert.strictEqual(getVar('loopHandle'), null);
    assert.strictEqual(getVar('simTime'), 0.0);
    const nodeVoltages = getVar('nodeVoltages');
    assert.strictEqual(nodeVoltages.GND, 0.0);
    const branchCurrents = getVar('branchCurrents');
    assert.strictEqual(Object.keys(branchCurrents).length, 0);
  });

  await t.test('TOPOLOGY_UPDATE and solveCircuitStep with BATTERY_9V and RESISTOR', () => {
    context.self.onmessage({ data: { type: 'RESET' } });

    // Simulate a simple circuit: 9V battery and a 1k resistor in series
    const components = [
      { id: 'bat1', type: 'BATTERY_9V', properties: { voltage: 9.0 }, terminals: { pos: 'p1', neg: 'p2' } },
      { id: 'res1', type: 'RESISTOR', properties: { resistance: 1000 }, terminals: { pinA: 'p3', pinB: 'p4' } }
    ];

    const wires = [
      { fromPin: 'p1', toPin: 'p3' }, // Battery positive to resistor
      { fromPin: 'p2', toPin: 'GND' }, // Battery negative to GND
      { fromPin: 'p4', toPin: 'GND' }  // Resistor to GND
    ];

    context.self.onmessage({ data: { type: 'TOPOLOGY_UPDATE', payload: { components, wires } } });

    // Now trigger a manual solve step
    callFunc('solveCircuitStep');

    // The resistor is connected between p3 (which is connected to p1, 9V) and p4 (connected to GND, 0V)
    // So voltage at p1, p3 should be 9V. GND, p2, p4 should be 0V.
    const nodeVoltages = getVar('nodeVoltages');
    assert.strictEqual(nodeVoltages['p1'], 9.0);
    assert.strictEqual(nodeVoltages['p3'], 9.0);
    assert.strictEqual(nodeVoltages['p2'], 0.0);
    assert.strictEqual(nodeVoltages['p4'], 0.0);

    // Current through resistor: I = V/R = 9 / 1000 = 0.009 A
    const branchCurrents = getVar('branchCurrents');
    assert.strictEqual(branchCurrents['res1'], 0.009);
  });

  await t.test('SET_DT updates dt', () => {
    context.self.onmessage({ data: { type: 'SET_DT', payload: { dt: 0.001 } } });
    assert.strictEqual(getVar('dt'), 0.001);
  });

  await t.test('SET_SCOPE_PROBE updates scopeProbeNode', () => {
    context.self.onmessage({ data: { type: 'SET_SCOPE_PROBE', payload: { node: 'p3' } } });
    assert.strictEqual(getVar('scopeProbeNode'), 'p3');
  });
});