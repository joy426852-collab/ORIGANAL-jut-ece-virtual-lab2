const fs = require('fs');

// Create mock data
const PRODUCTS_DATA = [];
for (let i = 0; i < 10000; i++) { // Let's use more reasonable sizes
  PRODUCTS_DATA.push({ id: `prod-${i}`, name: `Product ${i}` });
}

const AppState = {
  cart: [],
  selectedAiIngredients: []
};

for (let i = 0; i < 1000; i++) {
  AppState.cart.push({ id: `prod-${Math.floor(Math.random() * 10000)}` });
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

  // Create mapping object
  const productMap = {};
  for (let i = 0; i < PRODUCTS_DATA.length; i++) {
    productMap[PRODUCTS_DATA[i].id] = PRODUCTS_DATA[i];
  }

  AppState.cart.forEach(cartItem => {
    const prod = productMap[cartItem.id];
    if (prod && !AppState.selectedAiIngredients.includes(prod.name)) {
      AppState.selectedAiIngredients.push(prod.name);
    }
  });
  return performance.now() - start;
}

// Run a few times to warmup
for (let i=0; i<10; i++) {
    runBaseline();
    runOptimized();
}

let sumBaseline = 0;
let sumOptimized = 0;
const iterations = 50;

for (let i = 0; i < iterations; i++) {
    sumBaseline += runBaseline();
    sumOptimized += runOptimized();
}

console.log(`Baseline Avg: ${(sumBaseline / iterations).toFixed(2)}ms`);
console.log(`Optimized Avg: ${(sumOptimized / iterations).toFixed(2)}ms`);
console.log(`Speedup: ${(sumBaseline / sumOptimized).toFixed(2)}x`);
