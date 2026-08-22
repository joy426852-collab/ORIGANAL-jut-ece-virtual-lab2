## 2026-08-22 - Optimize String Parsing in searchOfflineKB
**Learning:** Extracting string parsing operations, such as regex-based splitting, outside of loops can result in measurable performance improvements (e.g., ~10%) when iterating over large datasets or during frequent search executions.
**Action:** Continually review search logic and nested iterations for repetitive operations that can be optimized by caching their results or extracting them before loops.
