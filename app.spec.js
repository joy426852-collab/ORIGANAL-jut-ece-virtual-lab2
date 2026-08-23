const assert = require('assert');
const fs = require('fs');

// Basic mock
global.document = { addEventListener: () => {} };
global.window = {
  addEventListener: () => {},
  lucide: { createIcons: () => {} }
};
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, value) { this.store[key] = value; },
  clear() { this.store = {}; }
};

let warnings = [];
global.console.warn = (...args) => warnings.push(args);

// Load app.js code inside this script context, modifying it to export the variables
let code = fs.readFileSync('app.js', 'utf8');

// Instead of VM, we can just append an export line to the eval text to get the variables out
code += `
global.testAppState = AppState;
global.testLoadStoredData = loadStoredData;
`;

eval(code);

// Test 1: Corrupted cart data
global.localStorage.clear();
global.localStorage.store['aroman_cart'] = '{"invalid json}';
warnings.length = 0;
global.testLoadStoredData();
assert(warnings.length > 0, 'Should warn on corrupted cart JSON');
assert(warnings[0][0].includes('Storage parsing failed'), 'Should contain specific warning message');

// Test 2: Corrupted wishlist data
global.localStorage.clear();
global.localStorage.store['aroman_wishlist'] = '["invalid"';
warnings.length = 0;
global.testLoadStoredData();
assert(warnings.length > 0, 'Should warn on corrupted wishlist JSON');
assert(warnings[0][0].includes('Storage parsing failed'), 'Should contain specific warning message');

// Test 3: Corrupted orders data
global.localStorage.clear();
global.localStorage.store['aroman_orders'] = '[{bad}]';
warnings.length = 0;
global.testLoadStoredData();
assert(warnings.length > 0, 'Should warn on corrupted orders JSON');
assert(warnings[0][0].includes('Storage parsing failed'), 'Should contain specific warning message');

// Test 4: Valid JSON parsing correctly updates state
global.localStorage.clear();
global.localStorage.store['aroman_cart'] = '[{"id": "prod-1", "qty": 1}]';
global.localStorage.store['aroman_wishlist'] = '["prod-2"]';
global.localStorage.store['aroman_orders'] = '[{"orderId": "123"}]';
warnings.length = 0;
global.testLoadStoredData();
assert.strictEqual(warnings.length, 0, 'Should not warn on valid JSON');
assert.strictEqual(global.testAppState.cart.length, 1);
assert.strictEqual(global.testAppState.cart[0].id, 'prod-1');
assert(global.testAppState.wishlist.has('prod-2'));
assert.strictEqual(global.testAppState.orders.length, 1);
assert.strictEqual(global.testAppState.orders[0].orderId, '123');

console.log('All tests passed successfully.');
