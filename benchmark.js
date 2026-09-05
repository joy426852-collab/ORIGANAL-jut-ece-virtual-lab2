const fs = require('fs');

// Create mock data
const PRODUCTS_DATA = [];
for (let i = 0; i < 100000; i++) {
  PRODUCTS_DATA.push({ id: `prod-${i}`, name: `Product ${i}` });
}

const AppState = {
  cart: [],
  selectedAiIngredients: []
};

for (let i = 0; i < 10000; i++) {
  AppState.cart.push({ id: `prod-${Math.floor(Math.random() * 100000)}` });
}

// Baseline logic
function runBaseline() {
  AppState.selectedAiIngredients = [];
  const start = performance.now();
  AppState.cart.forEach(cartItem => {
    const prod = PRODUCTS_DATA.find(p => p.id === cartItem.id);
    if (prod && !AppState.selectedAiIngredients.includes(prod.name)) {
      AppState.selectedAiIngredients.push(prod.name);
    }
  });
  return performance.now() - start;
}

// Optimized logic
function runOptimized() {
  AppState.selectedAiIngredients = [];
  const start = performance.now();
  const productMap = new Map();
  for (let i = 0; i < PRODUCTS_DATA.length; i++) {
    productMap.set(PRODUCTS_DATA[i].id, PRODUCTS_DATA[i]);
  }
  AppState.cart.forEach(cartItem => {
    const prod = productMap.get(cartItem.id);
    if (prod && !AppState.selectedAiIngredients.includes(prod.name)) {
      AppState.selectedAiIngredients.push(prod.name);
    }
  });
  return performance.now() - start;
}

const t1 = runBaseline();
const t2 = runOptimized();

console.log(`Baseline: ${t1.toFixed(2)}ms`);
console.log(`Optimized: ${t2.toFixed(2)}ms`);
console.log(`Speedup: ${(t1 / t2).toFixed(2)}x`);
