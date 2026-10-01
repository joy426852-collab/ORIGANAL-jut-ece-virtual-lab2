const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const vm = require('vm');

test('gemini-chat.js callGemini API tests', async (t) => {
  // Read and prepare script
  const originalCode = fs.readFileSync('gemini-chat.js', 'utf8');
  const modifiedCode = originalCode.replace(/\}\)\(\);\s*$/, `
    window._test = {
      callGemini,
      getHistory: () => conversationHistory,
      setHistory: (h) => { conversationHistory = h; },
      setApiKey: (k) => { apiKey = k; }
    };
  })();
  `);

  function setupEnvironment(fetchMock) {
    const context = {
      window: {
        location: { pathname: '/lab' },
        innerWidth: 1024,
        addEventListener: () => {}
      },
      document: {
        readyState: 'loading',
        addEventListener: () => {},
        createElement: () => ({ style: {}, classList: { toggle: () => {} } }),
        head: { appendChild: () => {} },
        body: { appendChild: () => {} },
        getElementById: () => null,
        querySelector: () => null
      },
      localStorage: {
        getItem: () => null,
        setItem: () => {}
      },
      navigator: {
        serviceWorker: { register: async () => {} }
      },
      console: console,
      setTimeout: setTimeout,
      setInterval: setInterval,
      clearInterval: clearInterval,
      fetch: fetchMock
    };

    vm.createContext(context);
    vm.runInContext(modifiedCode, context);
    return context.window._test;
  }

  await t.test('Happy path - successful API call', async () => {
    let fetchCalled = false;
    const fetchMock = async (url, options) => {
      fetchCalled = true;
      return {
        ok: true,
        json: async () => ({
          candidates: [{ content: { parts: [{ text: "Hello from Gemini" }] } }]
        })
      };
    };

    const _test = setupEnvironment(fetchMock);
    _test.setApiKey('valid-key');
    _test.setHistory([]);

    const result = await _test.callGemini('Hello');
    assert.strictEqual(fetchCalled, true);
    assert.strictEqual(result, 'Hello from Gemini');

    const history = _test.getHistory();
    assert.strictEqual(history.length, 2);
    assert.strictEqual(history[0].role, 'user');
    assert.strictEqual(history[0].parts[0].text, 'Hello');
    assert.strictEqual(history[1].role, 'model');
    assert.strictEqual(history[1].parts[0].text, 'Hello from Gemini');
  });

  await t.test('Fallback models - retries on 500 error', async () => {
    let fetchCalls = 0;
    const fetchMock = async (url, options) => {
      fetchCalls++;
      if (fetchCalls === 1) {
        return { ok: false, status: 500 };
      }
      return {
        ok: true,
        json: async () => ({
          candidates: [{ content: { parts: [{ text: "Fallback success" }] } }]
        })
      };
    };

    const _test = setupEnvironment(fetchMock);
    _test.setApiKey('valid-key');
    _test.setHistory([]);

    const result = await _test.callGemini('Try fallback');
    assert.strictEqual(fetchCalls, 2);
    assert.strictEqual(result, 'Fallback success');
  });

  await t.test('Invalid key - throws error and stops on 403', async () => {
    let fetchCalls = 0;
    const fetchMock = async (url, options) => {
      fetchCalls++;
      return { ok: false, status: 403 };
    };

    const _test = setupEnvironment(fetchMock);
    _test.setApiKey('invalid-key');
    _test.setHistory([]);

    try {
      await _test.callGemini('Invalid key request');
      assert.fail('Should have thrown an error');
    } catch (e) {
      assert.strictEqual(e.message, 'INVALID_KEY');
      assert.strictEqual(fetchCalls, 1, 'Should not retry on 403');
    }
  });

  await t.test('Offline KB fallback - uses local knowledge when offline', async () => {
    const fetchMock = async (url, options) => {
      throw new TypeError('Failed to fetch');
    };

    const _test = setupEnvironment(fetchMock);
    _test.setApiKey('valid-key');
    _test.setHistory([]);

    const result = await _test.callGemini('explain 8085 ALE pin');
    assert.ok(result.includes('8085 ALE (Address Latch Enable) Pin'));
    assert.ok(result.includes('*(📚 JUT ECE Verified Syllabus Knowledge Base)*'));

    const history = _test.getHistory();
    assert.strictEqual(history.length, 2);
    assert.strictEqual(history[1].role, 'model');
    assert.ok(history[1].parts[0].text.includes('8085 ALE (Address Latch Enable) Pin'));
  });
});
