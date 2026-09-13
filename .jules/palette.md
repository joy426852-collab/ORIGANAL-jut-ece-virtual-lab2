## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.
## 2025-02-14 - Add Confirmation Dialog for Destructive Actions
**Learning:** Destructive actions like clearing the board, grid, or chat history in this app lack a confirmation dialog, making it easy for users to accidentally lose their progress or data.
**Action:** Always add a confirmation dialog (e.g., using `confirm()`) for destructive actions to prevent accidental data loss and improve the user experience.
