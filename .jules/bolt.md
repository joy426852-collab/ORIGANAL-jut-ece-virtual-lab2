## 2024-05-18 - Graceful inline event handling
**Learning:** Checking for `typeof event !== "undefined" && event && event.currentTarget` is a robust way to handle functions that act both as click handlers and manual initializers in vanilla JS.
**Action:** Use this pattern instead of manual external DOM hacks when initializing states.
## 2023-10-27 - O(N) to O(1) Map Lookup Optimization
**Learning:** Nested loops containing array `.find()` lookups over a static catalog can be highly detrimental to performance. Converting the array to a Map object allows O(1) lookups, providing significant execution speedup (~30-40% faster in simulated tests).
**Action:** When performing multiple lookups against arrays that do not frequently mutate, preemptively initialize and populate a Map for O(1) element access.
