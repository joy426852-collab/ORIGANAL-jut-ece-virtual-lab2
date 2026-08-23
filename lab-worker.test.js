const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const vm = require('vm');

function createWorkerContext() {
    const mockSelf = {
        onmessage: null,
        postMessage: () => {}
    };
    const code = fs.readFileSync('./lab-worker.js', 'utf8');
    const context = vm.createContext({
        self: mockSelf,
        performance: { now: () => Date.now() },
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        Float32Array: Float32Array,
        Object: Object,
        Math: Math,
        Array: Array,
        console: console,
    });
    vm.runInContext(code, context);

    // Add helper function to get values from context's let/const variables
    context.evalInContext = (str) => vm.runInContext(str, context);

    return context;
}

test('lab-worker MNA Solver Tests', async (t) => {

    await t.test('Basic Ohm\'s Law (Battery + Resistor)', () => {
        const ctx = createWorkerContext();

        ctx.self.onmessage({ data: { type: 'TOPOLOGY_UPDATE', payload: {
            components: [
                { id: 'bat1', type: 'BATTERY_9V', terminals: { pos: 'p1', neg: 'gnd' }, properties: { voltage: 9.0 } },
                { id: 'res1', type: 'RESISTOR', terminals: { pinA: 'p1', pinB: 'gnd' }, properties: { resistance: 100 } }
            ],
            wires: []
        }}});

        ctx.evalInContext('solveCircuitStep()');

        const currents = ctx.evalInContext('branchCurrents');
        const voltages = ctx.evalInContext('nodeVoltages');
        const pinToNet = ctx.evalInContext('pinToNet');

        // 9V / 100 ohm = 0.09 A
        assert.strictEqual(currents['res1'], 0.09);
        assert.strictEqual(voltages[pinToNet['p1']], 9.0);
    });

    await t.test('LED Diode Model - Clamped Current', () => {
        const ctx = createWorkerContext();

        ctx.self.onmessage({ data: { type: 'TOPOLOGY_UPDATE', payload: {
            components: [
                { id: 'bat1', type: 'BATTERY_9V', terminals: { pos: 'p1', neg: 'gnd' }, properties: { voltage: 9.0 } },
                { id: 'led1', type: 'LED', terminals: { anode: 'p1', cathode: 'gnd' }, properties: { forwardVoltage: 2.0 } }
            ],
            wires: []
        }}});

        ctx.evalInContext('solveCircuitStep()');
        const currents = ctx.evalInContext('branchCurrents');

        // Vdrop = 9.0. Vforward = 2.0.
        // I = (9.0 - 2.0) / 68.0 = 0.1029 A.
        // It should be clamped to 0.025 A (25 mA)
        assert.strictEqual(currents['led1'], 0.025);
    });

    await t.test('LED Diode Model - Normal Current', () => {
        const ctx = createWorkerContext();

        ctx.self.onmessage({ data: { type: 'TOPOLOGY_UPDATE', payload: {
            components: [
                { id: 'bat1', type: 'BATTERY_9V', terminals: { pos: 'p1', neg: 'gnd' }, properties: { voltage: 2.5 } },
                { id: 'led1', type: 'LED', terminals: { anode: 'p1', cathode: 'gnd' }, properties: { forwardVoltage: 2.0 } }
            ],
            wires: []
        }}});

        ctx.evalInContext('solveCircuitStep()');
        const currents = ctx.evalInContext('branchCurrents');

        // Vdrop = 2.5. Vforward = 2.0.
        // I = (2.5 - 2.0) / 68.0 = 0.0073529...
        const expectedCurrent = (2.5 - 2.0) / 68.0;
        assert.strictEqual(Math.abs(currents['led1'] - expectedCurrent) < 1e-6, true, `Current should be approx ${expectedCurrent}`);
    });

    await t.test('LED Diode Model - Off State', () => {
        const ctx = createWorkerContext();

        ctx.self.onmessage({ data: { type: 'TOPOLOGY_UPDATE', payload: {
            components: [
                { id: 'bat1', type: 'BATTERY_9V', terminals: { pos: 'p1', neg: 'gnd' }, properties: { voltage: 1.5 } },
                { id: 'led1', type: 'LED', terminals: { anode: 'p1', cathode: 'gnd' }, properties: { forwardVoltage: 2.0 } }
            ],
            wires: []
        }}});

        ctx.evalInContext('solveCircuitStep()');
        const currents = ctx.evalInContext('branchCurrents');

        assert.strictEqual(currents['led1'], 0.0);
    });

    await t.test('Reset State', () => {
        const ctx = createWorkerContext();

        ctx.self.onmessage({ data: { type: 'TOPOLOGY_UPDATE', payload: {
            components: [
                { id: 'bat1', type: 'BATTERY_9V', terminals: { pos: 'p1', neg: 'gnd' }, properties: { voltage: 9.0 } },
            ],
            wires: []
        }}});

        ctx.evalInContext('solveCircuitStep()');

        assert.strictEqual(ctx.evalInContext('simTime') > 0, true);
        assert.strictEqual(Object.keys(ctx.evalInContext('nodeVoltages')).length > 1, true);

        ctx.self.onmessage({ data: { type: 'RESET' } });

        assert.strictEqual(ctx.evalInContext('simTime'), 0.0);
        // Since deepStrictEqual can fail across vm boundaries due to object prototype mismatch,
        // stringify for deep equality comparison
        assert.strictEqual(JSON.stringify(ctx.evalInContext('nodeVoltages')), JSON.stringify({ GND: 0.0 }));
        assert.strictEqual(JSON.stringify(ctx.evalInContext('branchCurrents')), JSON.stringify({}));
        assert.strictEqual(ctx.evalInContext('isRunning'), false);
    });

    await t.test('Wires Merging Nets', () => {
        const ctx = createWorkerContext();

        ctx.self.onmessage({ data: { type: 'TOPOLOGY_UPDATE', payload: {
            components: [
                { id: 'bat1', type: 'BATTERY_9V', terminals: { pos: 'p1', neg: 'gnd' }, properties: { voltage: 9.0 } },
                { id: 'res1', type: 'RESISTOR', terminals: { pinA: 'p2', pinB: 'gnd' }, properties: { resistance: 100 } }
            ],
            wires: [
                { fromPin: 'p1', toPin: 'p2' }
            ]
        }}});

        ctx.evalInContext('solveCircuitStep()');
        const currents = ctx.evalInContext('branchCurrents');

        // p1 and p2 should be merged. Current should flow.
        assert.strictEqual(currents['res1'], 0.09);
    });

});
