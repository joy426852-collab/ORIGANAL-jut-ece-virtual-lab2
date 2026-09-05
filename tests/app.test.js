const fs = require('fs');
const vm = require('vm');
const test = require('node:test');
const assert = require('node:assert');

const code = fs.readFileSync('./app.js', 'utf8');

test('loadStoredData gracefully handles invalid JSON from localStorage', () => {
  let warned = false;
  let warnMessage = '';

  const context = {
    window: { innerWidth: 1024, innerHeight: 768 },
    document: {
      addEventListener: () => {},
      getElementById: () => ({ addEventListener: () => {}, style: {}, classList: { add: () => {}, remove: () => {} }, querySelector: () => null }),
      querySelectorAll: () => [],
      querySelector: () => null,
      createElement: () => ({ style: {} }),
      body: { appendChild: () => {}, querySelector: () => null }
    },
    localStorage: {
      getItem: (key) => {
        if (key === 'aroman_cart') return '{"broken": json';
        if (key === 'aroman_wishlist') return '{"broken": json';
        if (key === 'aroman_orders') return '{"broken": json';
        return null;
      },
      setItem: () => {},
      removeItem: () => {}
    },
    console: {
      warn: (msg, err) => {
        warned = true;
        warnMessage = msg;
      },
      log: () => {},
      error: () => {}
    },
    Math: Math,
    Date: Date,
    JSON: JSON,
    setTimeout: setTimeout,
    setInterval: setInterval,
    Set: Set,
    Array: Array,
    Float32Array: Float32Array,
    AudioContext: class {},
    navigator: { userAgent: '' },
    THREE: {
      Scene: class {},
      PerspectiveCamera: class {},
      WebGLRenderer: class { setSize() {} setPixelRatio() {} },
      AmbientLight: class {},
      DirectionalLight: class {}
    }
  };

  vm.createContext(context);

  // Instead of running all of app.js (which fails because of complex DOM), we can just execute the parts we need.
  // Actually, we can run the whole app by mocking enough globals if we want, but since appState is not on the context (it's declared as const AppState in the script scope),
  // we can't access it via context.AppState. We need to assign it to globalThis.AppState inside the script to check it, or return it.

  const modifiedCode = code + `
    globalThis.testAppState = AppState;
    globalThis.testLoadStoredData = loadStoredData;
  `;

  try {
    vm.runInContext(modifiedCode, context);
  } catch (e) {
      console.log(e);
  }

  // Ensure AppState is available now
  assert.ok(context.testAppState, 'AppState should be defined');

  // Reset AppState to known valid defaults
  context.testAppState.cart = [];
  context.testAppState.wishlist = new Set();
  context.testAppState.orders = [];

  // Execute the target function
  context.testLoadStoredData();

  // Assertions
  assert.strictEqual(warned, true, 'console.warn should be called when JSON parsing fails');
  assert.ok(warnMessage.includes('Storage parsing failed'), 'Warning message should indicate parsing failure');

  // Verify app state didn't crash and maintained valid types
  assert.ok(Array.isArray(context.testAppState.cart), 'AppState.cart should remain an array');
  assert.ok(context.testAppState.wishlist instanceof Set, 'AppState.wishlist should remain a Set');
  assert.ok(Array.isArray(context.testAppState.orders), 'AppState.orders should remain an array');
});
