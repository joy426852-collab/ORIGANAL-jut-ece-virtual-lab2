const THREE = require('three');
const { performance } = require('perf_hooks');

const count = 1000000;
const c1 = new THREE.Color(0x34d399);
const c2 = new THREE.Color(0x38bdf8);
const colors = new Float32Array(count * 3);

let start = performance.now();
for (let i = 0; i < count; i++) {
  const mixed = c1.clone().lerp(c2, Math.random());
  colors[i * 3] = mixed.r;
  colors[i * 3 + 1] = mixed.g;
  colors[i * 3 + 2] = mixed.b;
}
let end = performance.now();
console.log('Baseline (clone.lerp):', end - start, 'ms');


start = performance.now();
const c1r = c1.r, c1g = c1.g, c1b = c1.b;
const c2r = c2.r, c2g = c2.g, c2b = c2.b;
for (let i = 0; i < count; i++) {
  const t = Math.random();
  colors[i * 3] = c1r + (c2r - c1r) * t;
  colors[i * 3 + 1] = c1g + (c2g - c1g) * t;
  colors[i * 3 + 2] = c1b + (c2b - c1b) * t;
}
end = performance.now();
console.log('Optimized (Inline manual math):', end - start, 'ms');
