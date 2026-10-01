const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

// Extract PRODUCTS_DATA
const productsMatch = content.match(/const PRODUCTS_DATA = (\[[\s\S]*?\n\]);/);
if (!productsMatch) {
  console.log("Could not extract PRODUCTS_DATA");
  process.exit(1);
}

const PRODUCTS_DATA = eval(productsMatch[1]);

// Mock cart items
const cartItems = [];
for (let i = 0; i < 1000; i++) {
  // 1000 random items in cart
  const randomProduct = PRODUCTS_DATA[Math.floor(Math.random() * PRODUCTS_DATA.length)];
  cartItems.push({ id: randomProduct.id, qty: Math.floor(Math.random() * 5) + 1 });
}

function baseline() {
  let subtotal = 0;
  cartItems.forEach(cartItem => {
    const prod = PRODUCTS_DATA.find(p => p.id === cartItem.id);
    if (prod) subtotal += prod.price * cartItem.qty;
  });
  return subtotal;
}

function optimized() {
  let subtotal = 0;
  // Creating a temporary map as suggested
  const prodMap = new Map();
  PRODUCTS_DATA.forEach(p => prodMap.set(p.id, p));
  cartItems.forEach(cartItem => {
    const prod = prodMap.get(cartItem.id);
    if (prod) subtotal += prod.price * cartItem.qty;
  });
  return subtotal;
}

// Or we can just use the global map approach
const globalProdMap = new Map();
PRODUCTS_DATA.forEach(p => globalProdMap.set(p.id, p));
function optimizedGlobal() {
  let subtotal = 0;
  cartItems.forEach(cartItem => {
    const prod = globalProdMap.get(cartItem.id);
    if (prod) subtotal += prod.price * cartItem.qty;
  });
  return subtotal;
}

console.log("Running Benchmark...");
const ITERATIONS = 10000;

const startBase = performance.now();
for(let i=0; i<ITERATIONS; i++) {
  baseline();
}
const endBase = performance.now();
console.log(`Baseline: ${(endBase - startBase).toFixed(2)} ms`);

const startOpt = performance.now();
for(let i=0; i<ITERATIONS; i++) {
  optimized();
}
const endOpt = performance.now();
console.log(`Optimized (Temp Map): ${(endOpt - startOpt).toFixed(2)} ms`);

const startOptG = performance.now();
for(let i=0; i<ITERATIONS; i++) {
  optimizedGlobal();
}
const endOptG = performance.now();
console.log(`Optimized (Global Map): ${(endOptG - startOptG).toFixed(2)} ms`);
