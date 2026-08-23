## 2024-05-18 - Graceful inline event handling
**Learning:** Checking for `typeof event !== "undefined" && event && event.currentTarget` is a robust way to handle functions that act both as click handlers and manual initializers in vanilla JS.
**Action:** Use this pattern instead of manual external DOM hacks when initializing states.
## 2024-05-18 - Avoid O(N) array iteration in hot paths when O(k) is possible via caching
**Learning:** In the circuit solver (`lab-worker.js`), iterating over all components multiple times using `forEach` caused performance issues. We cannot combine the loops naively because order matters (e.g. inject voltages before calculating currents).
**Action:** Instead of filtering inside the high-frequency solver tick, pre-partition the components by type during the infrequent `TOPOLOGY_UPDATE` event into separate arrays. Then, iterate only over those specific subsets in the solver loop using fast, basic `for` loops. This avoids overhead and memory allocation pressure.
