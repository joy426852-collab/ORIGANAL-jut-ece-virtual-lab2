## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.
## 2024-05-14 - Add Confirmation Dialog for Destructive Actions
**Learning:** Destructive actions without a safety net (like `clearAll()` in the lab workspace) can cause significant user frustration by instantly erasing their progress.
**Action:** Always add a native `confirm()` dialog or a custom modal before executing major destructive actions like clearing the entire breadboard.
