## 2024-05-18 - Graceful inline event handling
**Learning:** Checking for `typeof event !== "undefined" && event && event.currentTarget` is a robust way to handle functions that act both as click handlers and manual initializers in vanilla JS.
**Action:** Use this pattern instead of manual external DOM hacks when initializing states.
## 2026-08-23 - Optimize WebGL Orthographic Rendering Memory
**Learning:** Instantiating large byte arrays (`Uint8Array`, `Uint8ClampedArray`, `ImageData`) inside a `requestAnimationFrame` render loop causes significant garbage collection overhead, leading to frame rate drops (stuttering).
**Action:** When extracting pixels from a `WebGLRenderTarget` using `readRenderTargetPixels`, always allocate and reuse read/flip buffers and `ImageData` globally or outside the loop. Only reallocate them when the canvas dimensions change.
