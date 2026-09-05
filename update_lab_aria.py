import re

with open('lab.html', 'r') as f:
    content = f.read()

# Replace each tool-btn to add aria-label from title
def repl_tool_btn(m):
    button_tag = m.group(0)
    if 'aria-label' not in button_tag:
        title_match = re.search(r'title="([^"]+)"', button_tag)
        if title_match:
            title = title_match.group(1)
            # insert aria-label after class
            button_tag = button_tag.replace('class="', f'aria-label="{title}" class="', 1)
    return button_tag

content = re.sub(r'<button[^>]*class="tool-btn[^>]*>', repl_tool_btn, content)

with open('lab.html', 'w') as f:
    f.write(content)
