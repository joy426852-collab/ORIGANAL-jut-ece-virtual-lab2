## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.

## 2026-08-23 - Form Labels Accessibility
**Learning:** Form labels in this app often lacked the `for` attribute to properly link them to their respective inputs/selects. This degrades accessibility as it prevents screen readers from announcing the input names correctly, and impacts UX by not allowing users to click the labels to focus the inputs.
**Action:** Add `for` attributes to all `<label>` elements that lack them to improve accessibility and UX.
