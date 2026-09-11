## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.
## 2025-05-18 - Add confirmation dialogs to destructive actions
**Learning:** Destructive actions (like clearing the breadboard in lab, resetting K-Maps or assembly editor in calculator, or resetting experiments) lack native confirmation dialogs, leading to accidental loss of work.
**Action:** Always add a native `confirm()` prompt before executing any function that clears user data or resets state to prevent accidental data loss.
