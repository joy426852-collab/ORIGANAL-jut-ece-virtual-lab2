const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

function runTests() {
  console.log('Running tests for lab-worker.js...\n');

  // Read the script
  const code = fs.readFileSync('./lab-worker.js', 'utf8');

  let postedMessages = [];

  // Set up mock context
  const context = {
    self: {
      postMessage: (msg) => {
        postedMessages.push(msg);
      }
    },
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    performance: {
      now: () => Date.now()
    },
    Math: Math,
    Float32Array: Float32Array,
    Object: Object,
    Array: Array
  };

  vm.createContext(context);
  vm.runInContext(code, context);

  // Helper to send messages to the worker
  function sendMessage(type, payload) {
    if (context.self.onmessage) {
      context.self.onmessage({ data: { type, payload } });
    }
  }

  // 1. Test INIT & STATE setup
  sendMessage('RESET', {});
  // We cannot directly access let variables in VM context if they are top-level script variables.
  // We need to evaluate them via vm.runInContext
  assert.strictEqual(vm.runInContext('isRunning', context), false, 'Simulation should not be running after RESET');
  console.log('✓ RESET successfully resets running state');

  // 2. Test TOPOLOGY_UPDATE and Netmap Building
  const simpleCircuit = {
    components: [
      { id: 'b1', type: 'BATTERY_9V', terminals: { pos: 'b1_pos', neg: 'b1_neg' }, properties: { voltage: 9.0 } },
      { id: 'r1', type: 'RESISTOR', terminals: { pinA: 'r1_a', pinB: 'r1_b' }, properties: { resistance: 100 } }
    ],
    wires: [
      { fromPin: 'b1_pos', toPin: 'r1_a' },
      { fromPin: 'b1_neg', toPin: 'r1_b' }
    ]
  };

  sendMessage('TOPOLOGY_UPDATE', simpleCircuit);

  // We can verify internal state via the VM context
  assert.ok(vm.runInContext('pinToNet["b1_pos"]', context), 'b1_pos should have a net');
  assert.strictEqual(vm.runInContext('pinToNet["b1_pos"]', context), vm.runInContext('pinToNet["r1_a"]', context), 'Wire should merge nets');
  console.log('✓ TOPOLOGY_UPDATE constructs net map successfully');

  // 3. Test solveCircuitStep
  vm.runInContext('solveCircuitStep()', context);

  const b1PosNet = vm.runInContext('pinToNet["b1_pos"]', context);
  const b1NegNet = vm.runInContext('pinToNet["b1_neg"]', context);

  assert.strictEqual(vm.runInContext(`nodeVoltages["${b1NegNet}"]`, context), 0, 'Battery negative terminal should be GND/0V');
  assert.strictEqual(vm.runInContext(`nodeVoltages["${b1PosNet}"]`, context), 9, 'Battery positive terminal should be 9V');
  assert.strictEqual(vm.runInContext('branchCurrents["r1"]', context), 0.09, 'Resistor current should be 90mA (9V / 100 ohms)');
  console.log('✓ solveCircuitStep correctly resolves simple battery-resistor circuit');

  // 4. Test LED logic
  const ledCircuit = {
    components: [
      { id: 'b2', type: 'BATTERY_9V', terminals: { pos: 'b2_pos', neg: 'b2_neg' }, properties: { voltage: 9.0 } },
      { id: 'led1', type: 'LED', terminals: { anode: 'led_a', cathode: 'led_k' }, properties: { forwardVoltage: 2.2 } }
    ],
    wires: [
      { fromPin: 'b2_pos', toPin: 'led_a' },
      { fromPin: 'b2_neg', toPin: 'led_k' }
    ]
  };
  sendMessage('TOPOLOGY_UPDATE', ledCircuit);
  vm.runInContext('solveCircuitStep()', context);

  assert.ok(vm.runInContext('branchCurrents["led1"]', context) > 0, 'LED should have positive current');
  assert.ok(vm.runInContext('branchCurrents["led1"]', context) <= 0.025, 'LED current should be clamped at 25mA');
  console.log('✓ solveCircuitStep correctly resolves LED piecewise linear model');

  // 5. Test PAUSE and RESUME
  sendMessage('PAUSE', {});
  assert.strictEqual(vm.runInContext('isRunning', context), false, 'PAUSE should stop the simulation');

  sendMessage('RESUME', {});
  assert.strictEqual(vm.runInContext('isRunning', context), true, 'RESUME should start the simulation');

  sendMessage('PAUSE', {}); // Stop for cleanup
  console.log('✓ PAUSE and RESUME handle run state correctly');

  // 6. Test SET_DT
  sendMessage('SET_DT', { dt: 0.001 });
  assert.strictEqual(vm.runInContext('dt', context), 0.001, 'SET_DT should update dt properly');
  console.log('✓ SET_DT updates timestep successfully');

  console.log('\nAll lab-worker.js tests passed successfully! 🚀');
}

runTests();