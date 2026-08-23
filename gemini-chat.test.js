const test = require('node:test');
const assert = require('node:assert');

test('Haptics failover tests for gemini-chat.js', async (t) => {
  const fs = require('node:fs');
  const content = fs.readFileSync('./gemini-chat.js', 'utf-8');

  // Extract haptics object from the file to test its methods in isolation
  const match = content.match(/const haptics = \{([\s\S]*?)\};\n/);

  // This helper creates a sandbox environment where we can inject a mock navigator
  function runHapticsCode(navigatorMock) {
    const code = `
      let navigator = ${navigatorMock};
      const haptics = {${match[1]}};
      module.exports = haptics;
    `;
    const Module = require('module');
    const m = new Module('');
    m._compile(code, '');
    return m.exports;
  }

  await t.test('does not throw when navigator is undefined', () => {
    const haptics = runHapticsCode('undefined');
    assert.doesNotThrow(() => haptics.tap(), 'tap should not throw');
    assert.doesNotThrow(() => haptics.success(), 'success should not throw');
    assert.doesNotThrow(() => haptics.warning(), 'warning should not throw');
    assert.doesNotThrow(() => haptics.error(), 'error should not throw');
  });

  await t.test('does not throw when navigator.vibrate is undefined', () => {
    const haptics = runHapticsCode('{}');
    assert.doesNotThrow(() => haptics.tap(), 'tap should not throw');
    assert.doesNotThrow(() => haptics.success(), 'success should not throw');
    assert.doesNotThrow(() => haptics.warning(), 'warning should not throw');
    assert.doesNotThrow(() => haptics.error(), 'error should not throw');
  });

  await t.test('calls navigator.vibrate when available', () => {
    const vm = require('node:vm');
    const context = {};

    vm.createContext(context);
    vm.runInContext(`
      const haptics = {${match[1]}};

      const calls = [];
      const navigator = {
        vibrate: (args) => { calls.push(args); }
      };

      haptics.tap();
      haptics.success();
      haptics.warning();
      haptics.error();

      this.calls = calls;
    `, context);

    const calls = context.calls;
    assert.deepEqual(calls[0], 25);
    assert.deepEqual(calls[1], [40, 60, 40]);
    assert.deepEqual(calls[2], [80, 40, 80]);
    assert.deepEqual(calls[3], [120, 60, 120, 60, 180]);
  });
});
