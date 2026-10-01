const fs = require('fs');
const { performance } = require('perf_hooks');
const vm = require('vm');

const appJs = fs.readFileSync('./app.js', 'utf8');

// Mock DOM
const mockDocument = {
  getElementById: (id) => {
    if (id === 'productsGrid') return { innerHTML: '' };
    if (id === 'emptyState') return { style: {} };
    return null;
  },
  querySelectorAll: () => [],
  addEventListener: () => {}
};

const mockWindow = {
  lucide: { createIcons: () => {} },
  addEventListener: () => {}
};

const context = vm.createContext({
  document: mockDocument,
  window: mockWindow,
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: () => {},
  setInterval: () => {},
  console: console,
  requestAnimationFrame: () => {}
});

vm.runInContext(appJs, context);

// Populate fake data to exaggerate the performance difference
// filtered will be PRODUCTS_DATA, so let's make PRODUCTS_DATA large
const largeProductsData = [];
for (let i = 0; i < 5000; i++) {
  largeProductsData.push({
    id: `prod-${i}`,
    name: `Product ${i}`,
    category: 'fruits-veg',
    dept: 'Fresh Produce',
    price: 100,
    originalPrice: 150,
    weight: '2 pcs',
    rating: 4.5,
    reviewCount: 100,
    image: 'https://example.com',
    badge: '100% Organic',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: true,
    deal: true,
    inStock: true,
    description: 'A product',
    features: ['Feature 1', 'Feature 2'],
    nutrition: 'Nutrition',
    modelType: 'avocado'
  });
}
vm.runInContext(`PRODUCTS_DATA.push(...${JSON.stringify(largeProductsData)});`, context);

// Populate cart
const largeCart = [];
for (let i = 0; i < 2000; i++) {
  largeCart.push({ id: `prod-${i * 2}`, qty: 2 });
}
vm.runInContext(`AppState.cart.push(...${JSON.stringify(largeCart)});`, context);
vm.runInContext(`AppState.activeCategory = 'all'; AppState.activeFilter = 'all'; AppState.searchQuery = '';`, context);

function runBenchmark(name, func) {
  const iterations = 100;
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    func();
  }
  const end = performance.now();
  console.log(`${name}: ${(end - start).toFixed(2)} ms for ${iterations} iterations`);
  return end - start;
}

runBenchmark('renderProductCatalog baseline', () => {
  vm.runInContext('renderProductCatalog()', context);
});
