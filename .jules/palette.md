## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.

## 2024-05-15 - Add Confirmation for Destructive Actions
**Learning:** Destructive actions like resetting progress or clearing data (e.g., `clearKMap`, `resetAsm`, `resetCPU`) lack confirmation dialogs, leading to potential accidental data loss for users misclicking.
**Action:** Ensure all destructive user interactions include a native `confirm()` prompt or custom modal to prevent accidental data loss.
