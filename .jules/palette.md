## 2024-05-14 - Add ARIA Labels to Icon Buttons
**Learning:** Icon-only buttons (like hamburger menu, theme toggle, bookmark) in this app often lack `aria-label` attributes. This is a common accessibility issue that prevents screen readers from announcing the button's purpose.
**Action:** Add descriptive `aria-label`s to all icon-only buttons across HTML files to improve accessibility for screen reader users.
## 2024-05-14 - Use `for` attributes in forms
**Learning:** Labels in this app (like in `login.html`) often lack `for` attributes connecting them to the `id` of their inputs. This is a common accessibility issue.
**Action:** Always add descriptive `for` attributes to all `<label>` elements across HTML files connecting them to their corresponding `<input>`/`<select>` `id`s.
