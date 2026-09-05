const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const vm = require('vm');

test('lab-worker.js: rebuildNetMap', async (t) => {
  const code = fs.readFileSync('./lab-worker.js', 'utf8');

  // Helper to run topology updates and get pinToNet
  function runTopologyTest(components, wires) {
    const contextObject = {
      setTimeout: () => {},
      clearTimeout: () => {},
      performance: { now: () => 0 },
      console: console,
      postMessage: () => {}
    };
    contextObject.self = contextObject;
    const context = vm.createContext(contextObject);

    // Run the worker code to define variables and functions,
    // explicitly assigning global vars so they can be overridden,
    // and then call rebuildNetMap and return pinToNet.
    // The variables in lab-worker.js are let declarations at the top level.
    // To access them from outside, we can just run a single block of code.
    const result = vm.runInContext(`
      ${code}

      // Override the components and wires variables using the provided mock data
      components = ${JSON.stringify(components)};
      wires = ${JSON.stringify(wires)};

      // Call the function
      rebuildNetMap();

      // Return the result
      pinToNet;
    `, context);

    return result;
  }

  await t.test('pre-assigns ground rails', () => {
    const pinToNet = runTopologyTest([], []);
    assert.strictEqual(pinToNet['RAIL_TOP_NEG_1'], 'GND');
    assert.strictEqual(pinToNet['RAIL_BOT_NEG_60'], 'GND');
  });

  await t.test('creates new nets for isolated wires', () => {
    const pinToNet = runTopologyTest([], [{ fromPin: 'A1', toPin: 'B1' }]);
    assert.ok(pinToNet['A1'].startsWith('NET_'));
    assert.strictEqual(pinToNet['A1'], pinToNet['B1']);
  });

  await t.test('extends an existing net', () => {
    const pinToNet = runTopologyTest([], [
      { fromPin: 'A1', toPin: 'B1' }, // A1 & B1 get NET_X
      { fromPin: 'B1', toPin: 'C1' }  // C1 should get NET_X
    ]);
    assert.strictEqual(pinToNet['A1'], pinToNet['B1']);
    assert.strictEqual(pinToNet['B1'], pinToNet['C1']);
  });

  await t.test('merges two different nets', () => {
    const pinToNet = runTopologyTest([], [
      { fromPin: 'A1', toPin: 'B1' }, // NET_0
      { fromPin: 'C1', toPin: 'D1' }, // NET_1
      { fromPin: 'B1', toPin: 'C1' }  // Merges NET_0 and NET_1
    ]);
    assert.strictEqual(pinToNet['A1'], pinToNet['D1']);
    assert.strictEqual(pinToNet['A1'], pinToNet['B1']);
    assert.strictEqual(pinToNet['A1'], pinToNet['C1']);
  });

  await t.test('connects wires to ground', () => {
    const pinToNet = runTopologyTest([], [
      { fromPin: 'RAIL_TOP_NEG_1', toPin: 'A1' }
    ]);
    assert.strictEqual(pinToNet['A1'], 'GND');
    assert.strictEqual(pinToNet['RAIL_TOP_NEG_1'], 'GND');
  });

  await t.test('maps isolated component terminal pins to new nets', () => {
    const pinToNet = runTopologyTest([
      { terminals: { t1: 'C_PIN_1', t2: 'C_PIN_2' } }
    ], []);
    assert.ok(pinToNet['C_PIN_1'].startsWith('NET_'));
    assert.ok(pinToNet['C_PIN_2'].startsWith('NET_'));
    assert.notStrictEqual(pinToNet['C_PIN_1'], pinToNet['C_PIN_2']);
  });
});
