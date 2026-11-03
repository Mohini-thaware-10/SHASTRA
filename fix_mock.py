#!/usr/bin/env python3
import sys

filepath = r'C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA\src\lib\dashboard\mock-data.ts'

with open(filepath, 'r', encoding='utf-8-sig') as f:
    content = f.read()

# The exact string from the file (verified via hex dump)
#        title: "Is this a sentence? 'The dog.",
old = "        title: \"Is this a sentence? 'The dog.\","
new = "        title: \"Is this a sentence? The dog.\","

print(f'Old string length: {len(old)}')
print(f'New string length: {len(new)}')

# Check if old is in content
if old in content:
    content = content.replace(old, new)
    with open(filepath, 'w', encoding='utf-8-sig') as f:
        f.write(content)
    print('Replacement successful')
    sys.exit(0)
else:
    print('Old string NOT found in file')
    # Let's debug: find the actual title line
    import re
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if 'title:' in line and 'Is this a sentence' in line:
            print(f'Line {i}: {repr(line[:80])}')
    sys.exit(1)