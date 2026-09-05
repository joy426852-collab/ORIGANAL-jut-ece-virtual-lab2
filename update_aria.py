import os
import re

def update_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Find buttons with class "tool-btn" and title but no aria-label
    # Regex approach for replacing
    def repl_tool_btn(match):
        button_tag = match.group(0)
        if 'aria-label' not in button_tag:
            title_match = re.search(r'title="([^"]+)"', button_tag)
            if title_match:
                title = title_match.group(1)
                # insert aria-label after <button
                return button_tag.replace('<button ', f'<button aria-label="{title}" ')
        return button_tag

    content = re.sub(r'<button [^>]+class="tool-btn[^>]+>', repl_tool_btn, content)

    # scope panel close button
    # <button class="scope-btn" onclick="toggleScope()">✕</button>
    content = content.replace('<button class="scope-btn" onclick="toggleScope()">✕</button>',
                              '<button class="scope-btn" aria-label="Close oscilloscope" onclick="toggleScope()">✕</button>')

    # logic panel close button
    # <button onclick="toggleLogicPanel()" style="background:none;border:none;color:#475569;cursor:pointer;font-size:14px;">✕</button>
    content = content.replace('<button onclick="toggleLogicPanel()" style="background:none;border:none;color:#475569;cursor:pointer;font-size:14px;">✕</button>',
                              '<button aria-label="Close logic panel" onclick="toggleLogicPanel()" style="background:none;border:none;color:#475569;cursor:pointer;font-size:14px;">✕</button>')

    # cpu modal close button
    # <button onclick="toggleCPU()" style="background:none;border:1px solid rgba(255,255,255,.1);color:#94a3b8;cursor:pointer;border-radius:8px;padding:6px 12px;font-size:12px;font-family:\'JetBrains Mono\',monospace;">✕ Close</button>
    content = content.replace('<button onclick="toggleCPU()" style="background:none;border:1px solid rgba(255,255,255,.1);color:#94a3b8;cursor:pointer;border-radius:8px;padding:6px 12px;font-size:12px;font-family:\'JetBrains Mono\',monospace;">✕ Close</button>',
                              '<button aria-label="Close CPU visualizer" onclick="toggleCPU()" style="background:none;border:1px solid rgba(255,255,255,.1);color:#94a3b8;cursor:pointer;border-radius:8px;padding:6px 12px;font-size:12px;font-family:\'JetBrains Mono\',monospace;">✕ Close</button>')

    with open(filename, 'w') as f:
        f.write(content)

update_file('lab.html')
