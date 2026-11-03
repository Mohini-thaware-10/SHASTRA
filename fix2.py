#!/usr/bin/env python3
import sys

filepath = r'C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA\src\lib\dashboard\mock-data.ts'

with open(filepath, 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Extract the exact old string from line 1165 (0-indexed 1164)
lines = content.split('\n')
old = lines[1164][:80]  # Get first 80 chars of the line
new = '        title: "Is this a sentence? The dog.",'

print('Old:', repr(old))
print('New:', repr(new))

print('Old length:', len(old))
print('New length:', len(new))

if old in content:
    print('FOUND!')
    new_content = content.replace(old, new)
    with open(filepath, 'w', encoding='utf-8-sig') as f:
        f.write(new_content)
    print('Replaced successfully')
    sys.exit(0)
else:
    print('NOT FOUND')
    # Try different approaches
    # Maybe the line has different content - print exact
    print('Actual line 1165:', repr(lines[1164]))
    sys.exit(1)