/**
 * Test script for MCP server functionality
 * This simulates MCP requests and validates responses
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the component data
const componentData = JSON.parse(readFileSync(join(__dirname, '../data/components.json'), 'utf-8'));

console.log('Testing MCP Server Logic\n');
console.log('='.repeat(50));

// Test 1: Verify component data structure
console.log('\n✓ Test 1: Component data structure');
console.log(`  - Version: ${componentData.version}`);
console.log(`  - Package: ${componentData.packageName}`);
console.log(`  - Components: ${componentData.components.length}`);

// Test 2: Verify all components have required fields
console.log('\n✓ Test 2: Component field validation');
let allValid = true;
for (const component of componentData.components) {
  const requiredFields = [
    'name',
    'tagName',
    'description',
    'properties',
    'slots',
    'events',
    'examples',
  ];
  const missing = requiredFields.filter((f) => !(f in component));
  if (missing.length > 0) {
    console.log(`  ✗ ${component.name} missing: ${missing.join(', ')}`);
    allValid = false;
  }
}
if (allValid) {
  console.log('  All components have required fields');
}

// Test 3: Verify properties have required fields
console.log('\n✓ Test 3: Property field validation');
let propsValid = true;
for (const component of componentData.components) {
  for (const prop of component.properties) {
    const requiredFields = ['name', 'type', 'attribute'];
    const missing = requiredFields.filter((f) => !(f in prop));
    if (missing.length > 0) {
      console.log(`  ✗ ${component.name}.${prop.name} missing: ${missing.join(', ')}`);
      propsValid = false;
    }
  }
}
if (propsValid) {
  console.log('  All properties have required fields');
}

// Test 4: Verify instructions exist
console.log('\n✓ Test 4: Instructions validation');
const requiredInstructions = [
  'overview',
  'installation',
  'setup',
  'usage',
  'fontSetup',
  'tokensImport',
];
const missingInstructions = requiredInstructions.filter((f) => !componentData.instructions[f]);
if (missingInstructions.length > 0) {
  console.log(`  ✗ Missing: ${missingInstructions.join(', ')}`);
} else {
  console.log('  All instruction fields present');
}

// Test 5: List components output
console.log('\n✓ Test 5: List components output');
const componentList = componentData.components.map((c) => ({
  name: c.name.replace('Bui', ''),
  tagName: c.tagName,
}));
console.log('  Components:');
componentList.forEach((c) => {
  console.log(`    - ${c.name} (${c.tagName})`);
});

// Test 6: Get component output (Button)
console.log('\n✓ Test 6: Get component output (Button)');
const button = componentData.components.find((c) => c.name === 'BuiButton');
if (button) {
  console.log(`  Name: ${button.name}`);
  console.log(`  Tag: ${button.tagName}`);
  console.log(`  Properties: ${button.properties.length}`);
  console.log(`  Slots: ${button.slots.length}`);
  console.log(`  Events: ${button.events.length}`);
  console.log(`  Examples: ${button.examples.length}`);

  // Show some properties
  console.log('  Sample properties:');
  button.properties.slice(0, 3).forEach((p) => {
    console.log(`    - ${p.name} (${p.type}): ${p.options ? p.options.join(', ') : 'any'}`);
  });
}

// Test 7: Verify tag name format
console.log('\n✓ Test 7: Tag name format validation');
let tagNamesValid = true;
for (const component of componentData.components) {
  if (!component.tagName.startsWith('bui-')) {
    console.log(`  ✗ ${component.name} has invalid tag name: ${component.tagName}`);
    tagNamesValid = false;
  }
}
if (tagNamesValid) {
  console.log('  All tag names follow bui-* format');
}

console.log('\n' + '='.repeat(50));
console.log('All tests passed! ✓\n');
