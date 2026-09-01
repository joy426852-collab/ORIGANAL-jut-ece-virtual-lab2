## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.
## 2024-05-18 - Input Label Accessibility
**Learning:** Adding the `for` attribute to `<label>` elements explicitly links the label to its corresponding form input. This improves screen reader accessibility by clearly associating the label with the input, and also increases the clickable area for users, allowing them to click the label text to focus the input field.
**Action:** Always ensure that all `<label>` elements use the `for` attribute correctly linked to the ID of their respective input elements across all forms in the application.
