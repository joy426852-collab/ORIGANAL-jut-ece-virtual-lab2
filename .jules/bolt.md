## 2024-05-18 - Graceful inline event handling
**Learning:** Checking for `typeof event !== "undefined" && event && event.currentTarget` is a robust way to handle functions that act both as click handlers and manual initializers in vanilla JS.
**Action:** Use this pattern instead of manual external DOM hacks when initializing states.
## 2024-05-15 - [Optimize Union-Find Net Merging]
**Learning:** [Using simple dict iteration (Object.keys(pinToNet).forEach) for net merging leads to O(N^2) complexity, making it extremely slow for larger circuits with many components/wires. Using a proper Union-Find data structure with path compression and union-by-rank reduces this to nearly O(1) amortized, solving the bottleneck.]
**Action:** [Replaced Object.keys iteration with `find` and `union` functions using `parent` and `rank` maps. Flatten the tree at the end to map everything directly to the root.]
