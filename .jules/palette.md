## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.

## 2024-05-14 - Add Confirmation Dialog to Destructive Actions
**Learning:** Destructive actions such as clearing the entire workbench must have confirmation dialogs to prevent accidental loss of user data/progress. This was missing from the `clearAll` function in the 3D lab environment.
**Action:** Always verify that buttons or links which result in data deletion have a confirmation step (e.g. `confirm(...)`).
