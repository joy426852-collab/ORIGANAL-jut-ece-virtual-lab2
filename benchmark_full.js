const fs = require('fs');

const content = fs.readFileSync('app.js', 'utf8');

const productsMatch = content.match(/const PRODUCTS_DATA = (\[[\s\S]*?\n\]);/);
if (!productsMatch) {
  console.log("Could not extract PRODUCTS_DATA");
  process.exit(1);
}
const PRODUCTS_DATA = eval(productsMatch[1]);

// Dummy AppState
const AppState = {
  cart: [],
  appliedCoupon: null,
  deliveryTip: 0
};

// Create a large cart for the benchmark
for (let i = 0; i < 200; i++) {
  const randomProduct = PRODUCTS_DATA[Math.floor(Math.random() * PRODUCTS_DATA.length)];
  AppState.cart.push({ id: randomProduct.id, qty: Math.floor(Math.random() * 5) + 1 });
}

function baseline() {
  let subtotal = 0;
  AppState.cart.forEach(cartItem => {
    const prod = PRODUCTS_DATA.find(p => p.id === cartItem.id);
    if (prod) subtotal += prod.price * cartItem.qty;
  });

  let html = AppState.cart.map(cartItem => {
    const prod = PRODUCTS_DATA.find(p => p.id === cartItem.id);
    if (!prod) return '';
    return prod.name;
  });

  return subtotal;
}

function optimized() {
  const productMap = new Map();
  for (let i = 0; i < PRODUCTS_DATA.length; i++) {
    productMap.set(PRODUCTS_DATA[i].id, PRODUCTS_DATA[i]);
  }

  let subtotal = 0;
  AppState.cart.forEach(cartItem => {
    const prod = productMap.get(cartItem.id);
    if (prod) subtotal += prod.price * cartItem.qty;
  });

  let html = AppState.cart.map(cartItem => {
    const prod = productMap.get(cartItem.id);
    if (!prod) return '';
    return prod.name;
  });

  return subtotal;
}

const ITERATIONS = 10000;

console.log("Running benchmark...");
const startBase = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  baseline();
}
const endBase = performance.now();

const startOpt = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  optimized();
}
const endOpt = performance.now();

const baseTime = (endBase - startBase).toFixed(2);
const optTime = (endOpt - startOpt).toFixed(2);
const improvement = (((baseTime - optTime) / baseTime) * 100).toFixed(2);

console.log(`Baseline time: ${baseTime} ms`);
console.log(`Optimized time: ${optTime} ms`);
console.log(`Improvement: ${improvement}%`);
