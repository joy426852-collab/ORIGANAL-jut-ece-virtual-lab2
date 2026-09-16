## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.
## 2024-05-19 - Adding Confirmation to Destructive Actions
**Learning:** Destructive actions, such as clearing all data on the screen (`clearAll` in `lab.html`), can lead to accidental data loss if triggered accidentally.
**Action:** Add a native `confirm()` dialog at the top of functions that perform destructive board-level deletions to ensure users actually intend to execute the action.
