#!/usr/bin/env python3
with open(r'C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA\src\lib\dashboard\mock-data.ts', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Add Nexus learners for classes 6, 8, 9 after the existing ones
# Insert after line 208 (after "if (classNum === 10) return nexusLearner10;")

new_learners = '''
  if (classNum === 6) return nexusLearner6;
  if (classNum === 8) return nexusLearner8;
  if (classNum === 9) return nexusLearner9;
'''

# The existing code has:
#   if (classNum === 7) return nexusLearner7;
#   if (classNum === 10) return nexusLearner10;
#   return {

old_block = '''  if (classNum === 7) return nexusLearner7;
  if (classNum === 10) return nexusLearner10;
  return {'''

new_block = '''  if (classNum === 7) return nexusLearner7;
  if (classNum === 8) return nexusLearner8;
  if (classNum === 9) return nexusLearner9;
  if (classNum === 10) return nexusLearner10;
  return {'''

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(r'C:\Users\thawa\OneDrive\Documents\SHASTRA\SHASTRA\src\lib\dashboard\mock-data.ts', 'w', encoding='utf-8-sig') as f:
        f.write(content)
    print('Added Nexus learners for classes 6, 8, 9')
else:
    print('Could not find block to replace')
    # Debug: print the actual content around that area
    lines = content.split('\n')
    for i in range(204, 220):
        if i < len(lines):
            print(f'{i+1}: {lines[i]}')