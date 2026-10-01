## 2024-05-18 - Graceful inline event handling
**Learning:** Checking for `typeof event !== "undefined" && event && event.currentTarget` is a robust way to handle functions that act both as click handlers and manual initializers in vanilla JS.
**Action:** Use this pattern instead of manual external DOM hacks when initializing states.
## 2024-05-18 - Performance optimization for O(N*M) lookup
**Learning:** `Array.prototype.find` inside a `map` loop causes O(N*M) complexity which is detrimental for large datasets.
**Action:** Use a `Map` structure for O(1) lookups inside the loop, bringing total complexity down to O(N+M).
