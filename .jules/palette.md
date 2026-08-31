## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.

## 2024-11-20 - Adding for attributes to labels and missing aria-labels
**Learning:** Found several `<label>` elements not explicitly linked to their corresponding form inputs using `for="id"`. Additionally found various action buttons (e.g., closing panels, sending chat messages, incrementing quantity) missing `aria-label`s. Explicitly linking labels ensures click targets are larger and assistive tech correctly announces the label when the input is focused.
**Action:** Always verify that `<label>` tags explicitly use the `for` attribute and that strictly icon-only buttons include an `aria-label`.
