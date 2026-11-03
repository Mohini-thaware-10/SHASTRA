#!/usr/bin/env python3
with open(r'C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA\src/types/dashboard.ts', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Add NexusClass type after JuniorClass
old = 'export type JuniorClass = "1" | "2" | "3" | "4" | "5";'
new = 'export type JuniorClass = "1" | "2" | "3" | "4" | "5";\nexport type NexusClass = "6" | "7" | "8" | "9" | "10";'

if old in content:
    content = content.replace(old, new)
    with open(r'C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA\src/types/dashboard.ts', 'w', encoding='utf-8-sig') as f:
        f.write(content)
    print('Added NexusClass type')
else:
    print('Could not find old string')
    # Debug: print what's around line 100
    lines = content.split('\n')
    for i in range(98, 110):
        if i < len(lines):
            print(f'{i+1}: {lines[i]}')