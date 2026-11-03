#!/usr/bin/env python3
with open(r'C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA\src/types/dashboard.ts', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Add NEXUS activity types after JuniorActivityType
old = 'export type JuniorActivityType =\\n  | "multipleChoice"\\n  | "trueFalse"\\n  | "matchPairs"\\n  | "arrangeOrder"\\n  | "fillInBlanks"\\n  | "selectImage";'
new = 'export type JuniorActivityType =\\n  | "multipleChoice"\\n  | "trueFalse"\\n  | "matchPairs"\\n  | "arrangeOrder"\\n  | "fillInBlanks"\\n  | "selectImage"\\n  | "multiSelect"\\n  | "numeric"\\n  | "shortAnswer"\\n  | "diagram";'

if old in content:
    content = content.replace(old, new)
    with open(r'C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA\src/types/dashboard.ts', 'w', encoding='utf-8-sig') as f:
        f.write(content)
    print('Added NEXUS activity types')
else:
    print('Could not find old string')
    # Debug: print what we have
    import re
    m = re.search(r'export type JuniorActivityType.*?;', content, re.DOTALL)
    if m:
        print('Found:', m.group()[:200])