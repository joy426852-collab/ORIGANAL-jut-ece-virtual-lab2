import os
import re

def update_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # I'll manually add aria-labels to the buttons that need them

    with open(filename, 'w') as f:
        f.write(content)

update_file('zone3.html')
