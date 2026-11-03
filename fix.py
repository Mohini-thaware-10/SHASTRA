#!/usr/bin/env python3
import re

with open(r'C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA\src\lib\dashboard\mock-data.ts', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# The actual pattern from the file: title: "Is this a sentence? 'The dog.",
# Need to match the single quote inside double quotes followed by comma
old_pattern = r'title: "Is this a sentence\? \'The dog.\",'
new = 'title: "Is this a sentence? The dog.",'

# Try regex replacement
if re.search(old_pattern, content):
    content = re.sub(old_pattern, new, content)
    with open(r'C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA\src\lib\dashboard\mock-data.ts', 'w', encoding='utf-8-sig') as f:
        f.write(content)
    print('Replaced with regex')
else:
    print('Regex pattern not found, trying simple string...')
    old_simple = "title: \"Is this a sentence? 'The dog.\","
    new_simple = 'title: "Is this a sentence? The dog.",'
    if old_simple in content:
        content = content.replace(old_simple, new_simple)
        with open(r'C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA\src\lib\dashboard\mock-data.ts', 'w', encoding='utf-8-sig') as f:
            f.write(content)
        print('Replaced with simple string')
    else:
        print('No pattern matched')
        # Print line 1165
        lines = content.split('\n')
        print(f'1165: {repr(lines[1164][:60])}')