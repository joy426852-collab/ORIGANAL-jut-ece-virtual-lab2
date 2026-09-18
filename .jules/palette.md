## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.

## 2024-05-15 - Add Confirmation Dialog for Destructive Actions
**Learning:** Destructive actions like clearing data (e.g., K-Map grid) or overwriting code (e.g., 8085 Assembly editor presets) should include a confirmation dialogue. This prevents accidental data loss.
**Action:** Add `confirm()` prompts for all actions that permanently clear, delete, or overwrite user data.
