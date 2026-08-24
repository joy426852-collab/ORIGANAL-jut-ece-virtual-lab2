## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.

## 2024-05-14 - Use `for` attributes in `<label>` elements
**Learning:** `<label>` elements in this app often lack the `for` attribute that links them to their corresponding input elements. This is an accessibility issue, as it prevents screen readers from properly associating the label with the input and prevents users from clicking the label to focus the input.
**Action:** Ensure all `<label>` elements have a `for` attribute matching the `id` of the input they are associated with.
