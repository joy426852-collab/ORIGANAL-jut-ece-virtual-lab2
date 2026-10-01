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
console.log('Baseline:', end - start, 'ms');

start = performance.now();
const mixedOpt = new THREE.Color();
for (let i = 0; i < count; i++) {
  mixedOpt.lerpColors(c1, c2, Math.random());
  colors[i * 3] = mixedOpt.r;
  colors[i * 3 + 1] = mixedOpt.g;
  colors[i * 3 + 2] = mixedOpt.b;
}
end = performance.now();
console.log('Optimized (lerpColors):', end - start, 'ms');
