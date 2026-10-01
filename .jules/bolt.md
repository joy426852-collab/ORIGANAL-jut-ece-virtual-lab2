## 2024-05-18 - Graceful inline event handling
**Learning:** Checking for `typeof event !== "undefined" && event && event.currentTarget` is a robust way to handle functions that act both as click handlers and manual initializers in vanilla JS.
**Action:** Use this pattern instead of manual external DOM hacks when initializing states.
## 2026-09-05 - Optimizing Array Lookups in Loops
**Learning:** O(N) array `.find()` calls inside loops (like cart or wishlist rendering) lead to O(N*M) time complexity, which causes measurable performance bottlenecks as the catalog size scales.
**Action:** Use an object map/dictionary created once during initialization for O(1) lookups instead of `.find()` inside high-frequency loops.
