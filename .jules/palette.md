## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.
## 2024-05-14 - Add Form Label Associations
**Learning:** Form `<label>` elements in this app often lack the `for` attribute connecting them to their corresponding `<input>` or `<select>` `id`s. This is a crucial accessibility issue as screen readers cannot associate the label with the input.
**Action:** Always ensure all `<label>` elements use the `for` attribute correctly linked to their inputs' `id`s to improve accessibility for screen reader users and to increase the clickable area of inputs.
