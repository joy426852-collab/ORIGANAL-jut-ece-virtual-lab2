## 2024-05-18 - Graceful inline event handling
**Learning:** Checking for `typeof event !== "undefined" && event && event.currentTarget` is a robust way to handle functions that act both as click handlers and manual initializers in vanilla JS.
**Action:** Use this pattern instead of manual external DOM hacks when initializing states.
## 2024-10-23 - [O(N*M) Cart Check Optimization]
**Learning:** [Precomputing dictionary lookups using Map in rendering loops instead of Array.find() reduces complexity from O(N*M) to O(N+M) and yields massive speedups in Javascript engines.]
**Action:** [Check other render functions like wishlist or grid map for potential O(N*M) lookups and optimize them to O(N+M) with Maps or Sets.]
