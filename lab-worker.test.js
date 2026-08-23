const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('./lab-worker.js', 'utf-8');

function setupEnvironment() {
  const context = vm.createContext({
    self: {},
    setTimeout: () => {},
    clearTimeout: () => {},
    performance: { now: () => 0 },
  });
  vm.runInContext(code, context);

  return {
    updateTopology: (wires, components) => {
      context.self.onmessage({
        data: {
          type: 'TOPOLOGY_UPDATE',
          payload: {
            wires: wires || [],
            components: components || []
          }
        }
      });
    },
    get pinToNet() { return vm.runInContext('pinToNet', context); }
  };
}

test('rebuildNetMap tests', async (t) => {
  await t.test('pre-assigns ground rails to GND', () => {
    const env = setupEnvironment();
    env.updateTopology([], []);
    assert.strictEqual(env.pinToNet['RAIL_TOP_NEG_1'], 'GND');
    assert.strictEqual(env.pinToNet['RAIL_BOT_NEG_60'], 'GND');
  });

  await t.test('creates new net for two unconnected pins connected by a wire', () => {
    const env = setupEnvironment();
    env.updateTopology([{ fromPin: 'A1', toPin: 'A2' }], []);
    assert.strictEqual(env.pinToNet['A1'], 'NET_0');
    assert.strictEqual(env.pinToNet['A2'], 'NET_0');
  });

  await t.test('extends existing net when new wire connects to it', () => {
    const env = setupEnvironment();
    env.updateTopology([
      { fromPin: 'A1', toPin: 'A2' },
      { fromPin: 'A2', toPin: 'A3' }
    ], []);
    assert.strictEqual(env.pinToNet['A1'], 'NET_0');
    assert.strictEqual(env.pinToNet['A2'], 'NET_0');
    assert.strictEqual(env.pinToNet['A3'], 'NET_0');
  });

  await t.test('merges two different nets', () => {
    const env = setupEnvironment();
    env.updateTopology([
      { fromPin: 'A1', toPin: 'A2' }, // NET_0
      { fromPin: 'B1', toPin: 'B2' }, // NET_1
      { fromPin: 'A2', toPin: 'B1' }  // Merges NET_1 into NET_0
    ], []);
    assert.strictEqual(env.pinToNet['A1'], 'NET_0');
    assert.strictEqual(env.pinToNet['A2'], 'NET_0');
    assert.strictEqual(env.pinToNet['B1'], 'NET_0');
    assert.strictEqual(env.pinToNet['B2'], 'NET_0');
  });

  await t.test('connects pin to GND if wire connects to ground rail', () => {
    const env = setupEnvironment();
    env.updateTopology([
      { fromPin: 'A1', toPin: 'RAIL_TOP_NEG_5' }
    ], []);
    assert.strictEqual(env.pinToNet['A1'], 'GND');
    assert.strictEqual(env.pinToNet['RAIL_TOP_NEG_5'], 'GND');
  });

  await t.test('assigns unique nets to unconnected component terminals', () => {
    const env = setupEnvironment();
    env.updateTopology([], [
      { terminals: { t1: 'C1', t2: 'C2' } }
    ]);
    assert.strictEqual(env.pinToNet['C1'], 'NET_0');
    assert.strictEqual(env.pinToNet['C2'], 'NET_1');
  });

  await t.test('does not reassign nets to component terminals already connected by wires', () => {
    const env = setupEnvironment();
    env.updateTopology([
      { fromPin: 'C1', toPin: 'A1' }
    ], [
      { terminals: { t1: 'C1', t2: 'C2' } }
    ]);
    assert.strictEqual(env.pinToNet['C1'], 'NET_0'); // From wire
    assert.strictEqual(env.pinToNet['A1'], 'NET_0'); // From wire
    assert.strictEqual(env.pinToNet['C2'], 'NET_1'); // From component
  });
});
