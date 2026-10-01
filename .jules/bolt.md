## 2024-05-18 - Graceful inline event handling
**Learning:** Checking for `typeof event !== "undefined" && event && event.currentTarget` is a robust way to handle functions that act both as click handlers and manual initializers in vanilla JS.
**Action:** Use this pattern instead of manual external DOM hacks when initializing states.

## 2024-05-18 - [Optimize Array Lookup in AI Ingredients Prep]
**Learning:** [Replaced O(N*M) lookup inside `useCartIngredientsForAi` with O(1) hash map construction, producing ~5.7x speedup for 10k cart items.]
**Action:** [Constructed a `productMap` inside the function, allowing quick O(1) property lookup instead of `.find()`. Recorded benchmarks and tests.]
