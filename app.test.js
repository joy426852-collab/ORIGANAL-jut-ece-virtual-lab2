const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const vm = require('vm');

test('useCartIngredientsForAi populates selectedAiIngredients correctly', () => {
  const code = fs.readFileSync('app.js', 'utf8');

  // Replace const with var for global visibility in VM
  const modifiedCode = code
    .replace('const AppState = {', 'var AppState = {')
    .replace('const PRODUCTS_DATA = [', 'var PRODUCTS_DATA = [');

  // We need to mock window, document, and showToast, openModal, updateAiSelectedChipsUI
  const sandbox = {
    console,
    Math,
    window: {
      addEventListener: () => {},
      THREE: {},
    },
    document: {
      addEventListener: () => {},
      querySelectorAll: () => [],
      getElementById: () => ({
        style: {},
        classList: { toggle: () => {}, add: () => {}, remove: () => {} },
      }),
      createElement: () => ({ style: {} }), // mock createElement for toast
    },
    localStorage: {
      getItem: () => null,
      setItem: () => {}
    },
    // Mock the actual functions to override their implementation in VM
    showToast: () => {},
    openModal: () => {},
    updateAiSelectedChipsUI: () => {},
    playSynthSound: () => {},
    setTimeout: (cb) => cb(),
  };

  vm.createContext(sandbox);
  vm.runInContext(modifiedCode, sandbox);

  // We can override the functions in the sandbox AFTER script loads
  // Since the script redefines showToast, we must override it on the sandbox again if we want to mock it.
  sandbox.showToast = () => {};
  sandbox.openModal = () => {};
  sandbox.updateAiSelectedChipsUI = () => {};

  // Set up mock state
  sandbox.AppState.cart = [
    { id: 'prod-1', qty: 1 },
    { id: 'prod-2', qty: 1 }
  ];
  sandbox.AppState.selectedAiIngredients = [];

  // Call the function
  sandbox.useCartIngredientsForAi();

  // Find names in PRODUCTS_DATA
  const prod1 = sandbox.PRODUCTS_DATA.find(p => p.id === 'prod-1');
  const prod2 = sandbox.PRODUCTS_DATA.find(p => p.id === 'prod-2');

  assert.strictEqual(sandbox.AppState.selectedAiIngredients.length, 2);
  assert.ok(sandbox.AppState.selectedAiIngredients.includes(prod1.name));
  assert.ok(sandbox.AppState.selectedAiIngredients.includes(prod2.name));

  // Should handle duplicate ingredients
  sandbox.AppState.cart.push({ id: 'prod-1', qty: 1 });
  sandbox.useCartIngredientsForAi();
  assert.strictEqual(sandbox.AppState.selectedAiIngredients.length, 2, 'Duplicate names should not be added');

  // Add a new product not already in selectedAiIngredients
  sandbox.AppState.cart.push({ id: 'prod-3', qty: 1 });
  sandbox.useCartIngredientsForAi();
  assert.strictEqual(sandbox.AppState.selectedAiIngredients.length, 3, 'New ingredients should be added');
});
