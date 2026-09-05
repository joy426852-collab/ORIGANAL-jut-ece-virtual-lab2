## 2026-09-05 - Optimizing Array Traversals to Hash Maps
**Learning:** O(N) array traversals (like Array.find()) in loops or highly recurrent code blocks cause performance bottlenecks (O(N^2)). Using a precomputed Hash Map via Map.get() allows for O(1) lookups, providing measurable performance gains and scaling effectively with data size.
**Action:** Always refactor redundant Array.find() inside loops into a Map mapping key-value pairs ahead of execution.
