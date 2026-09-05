## 2024-05-18 - Graceful inline event handling
**Learning:** Checking for `typeof event !== "undefined" && event && event.currentTarget` is a robust way to handle functions that act both as click handlers and manual initializers in vanilla JS.
**Action:** Use this pattern instead of manual external DOM hacks when initializing states.
## 2026-09-05 - [Inline Math Operations in Hot Loops]
**Learning:** [Three.js object method chains (like `.clone().lerp()`) allocate new objects on each loop iteration, which severely damages performance and causes excessive Garbage Collection overhead. Converting these object operations into inline math operations (e.g. `c1r + (c2r - c1r) * t`) within hot loops (like processing 1,000,000+ vertices) yields up to 5x performance improvements.]
**Action:** [Avoid object allocations inside inner-loops (hot paths) for graphics/simulation code. Always prefer pre-allocating objects for reuse, or unrolling math into simple scalar variables for inline processing.]
