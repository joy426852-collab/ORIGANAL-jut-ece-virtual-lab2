## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.
## 2026-09-15 - [Confirmation Dialogs for Destructive Actions]
**Learning:** Adding a simple, native `confirm()` prompt for critical "Clear Data" actions (like wiping a K-Map grid or a complete circuit board) immediately prevents accidental data loss and is a low-friction way to solve a high-impact user grievance without adding extra UI weight.
**Action:** Always verify if a destructive or resetting action should have a confirmation guard rail, especially in apps with complex user configurations.
