## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.
## 2026-09-14 - Add Confirmation Dialog for Destructive Actions
**Learning:** Destructive actions like clearing the entire breadboard workspace cause accidental data loss and frustration if they lack a confirmation step.
**Action:** Always wrap destructive actions, such as `clearAll()` or delete functions, with a native `confirm()` dialog or a custom modal to ensure user intent before proceeding.
