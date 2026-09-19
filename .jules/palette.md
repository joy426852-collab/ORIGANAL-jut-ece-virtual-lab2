## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.

## 2025-10-24 - Require Confirmation for Destructive Actions
**Learning:** Destructive actions like clearing entire workspaces or wiping out user data arrays (e.g., in `lab.html`'s `clearAll()` or `calculator.html`'s `clearKMap()`) lack safety nets, which can cause frustrating accidental data loss.
**Action:** Always add a simple native `confirm()` dialogue check before executing wholesale deletions or clears to provide a safety buffer.
