/**
 * Generate component metadata from BUI UI components
 * This script parses the TypeScript component files and extracts:
 * - Component name
 * - Tag name
 * - Properties with types, default values, and options
 * - Slots
 * - Events
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const UI_PACKAGE_DIR = join(__dirname, '../../ui');
const OUTPUT_FILE = join(__dirname, '../data/components.json');

// Component files to process
const COMPONENT_FILES = [
  'button.ts',
  'toggle.ts',
  'message.ts',
  'input.ts',
  'numpad.ts',
  'numpad-button.ts',
  'button-cluster.ts',
  'money-value.ts',
  'bitcoin-value.ts',
  'option-dot.ts',
  'bitcoin-qr-display.ts',
  'amount-option-tile.ts',
  'avatar.ts',
];

/**
 * Parse a component file and extract metadata
 */
function parseComponentFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const componentData = {
    name: '',
    tagName: '',
    description: '',
    properties: [],
    slots: [],
    events: [],
    examples: [],
  };

  // Extract class name (e.g., BuiButton, BuiToggle)
  const classMatch = content.match(/export class (\w+) extends LitElement/);
  if (classMatch) {
    componentData.name = classMatch[1];
  }

  // Extract tag name from customElements.define
  const tagMatch = content.match(/customElements\.define\(['"]([^'"]+)['"]/);
  if (tagMatch) {
    componentData.tagName = tagMatch[1];
  }

  // Extract const arrays for allowed values (e.g., BUTTON_SIZES, BUTTON_STYLE_TYPES)
  const constArrays = {};
  const constMatches = content.matchAll(/const\s+(\w+)\s*=\s*\[([^\]]+)\]\s*as\s*const/g);
  for (const match of constMatches) {
    const name = match[1];
    const valuesStr = match[2];
    const values = valuesStr
      .split(',')
      .map((v) => v.trim().replace(/['"]/g, ''))
      .filter((v) => v.length > 0);
    constArrays[name] = values;
  }

  // Extract static properties block
  const propertiesBlockMatch = content.match(
    /static\s+properties\s*=\s*\{([\s\S]*?)\}(\s*as\s*const)?;/
  );
  if (propertiesBlockMatch) {
    const propsBlock = propertiesBlockMatch[1];

    // Split by property definitions - looking for `propName: {`
    const propRegex = /(\w+):\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
    let propMatch;

    while ((propMatch = propRegex.exec(propsBlock)) !== null) {
      const propName = propMatch[1];
      const propConfig = propMatch[2];

      const property = {
        name: propName,
        type: 'string',
        required: false,
        default: undefined,
        options: undefined,
        attribute: propName,
        description: '',
        reflect: false,
      };

      // Extract type
      const typeMatch = propConfig.match(/type:\s*(\w+)/);
      if (typeMatch) {
        property.type = typeMatch[1].toLowerCase();
      }

      // Extract attribute name if different
      const attrMatch = propConfig.match(/attribute:\s*['"]([^'"]+)['"]/);
      if (attrMatch) {
        property.attribute = attrMatch[1];
      }

      // Extract reflect
      const reflectMatch = propConfig.match(/reflect:\s*(true|false)/);
      if (reflectMatch) {
        property.reflect = reflectMatch[1] === 'true';
      }

      // Try to extract description from comment
      const lineIndex = propsBlock.indexOf(propName + ':');
      const lineEnd = propsBlock.indexOf('\n', lineIndex);
      const line = propsBlock.substring(lineIndex, lineEnd > -1 ? lineEnd : undefined);
      const commentMatch = line.match(/\/\/\s*(.+)/);
      if (commentMatch) {
        property.description = commentMatch[1].trim();
      }

      componentData.properties.push(property);
    }
  }

  // Extract TypeScript property declarations for default values from constructor
  const constructorMatch = content.match(/constructor\(\)\s*\{[\s\S]*?super\(\);([\s\S]*?)\n\s*\}/);
  if (constructorMatch) {
    const constructorBody = constructorMatch[1];

    for (const prop of componentData.properties) {
      // Look for this.propName = value
      const defaultMatch = constructorBody.match(
        new RegExp(`this\\.${prop.name}\\s*=\\s*([^;]+);`)
      );
      if (defaultMatch) {
        let defaultValue = defaultMatch[1].trim();
        // Clean up the default value
        if (defaultValue === 'true' || defaultValue === 'false') {
          prop.default = defaultValue === 'true';
        } else if (defaultValue.match(/^['"].*['"]$/)) {
          prop.default = defaultValue.replace(/['"]/g, '');
        } else if (defaultValue.match(/^-?\d+$/)) {
          prop.default = parseInt(defaultValue, 10);
        } else if (defaultValue.match(/^-?\d+\.?\d*$/)) {
          prop.default = parseFloat(defaultValue);
        } else if (defaultValue === 'undefined' || defaultValue === 'null') {
          prop.default = undefined;
        } else {
          prop.default = defaultValue;
        }
      }
    }
  }

  // Try to match properties with const arrays for allowed values
  for (const prop of componentData.properties) {
    // Look for validation rules that reference const arrays
    const validationMatch = content.match(
      new RegExp(`createStringLiteralValidationRule\\(\\s*(\\w+)\\s*,\\s*['"]${prop.name}['"]\\)`)
    );
    if (validationMatch) {
      const constName = validationMatch[1];
      if (constArrays[constName]) {
        prop.options = constArrays[constName];
      }
    }

    // Also check for options in the description comment
    if (prop.description) {
      const optionsInComment = prop.description.match(/'([^']+)'/g);
      if (optionsInComment && !prop.options) {
        prop.options = optionsInComment.map((o) => o.replace(/'/g, ''));
      }
    }
  }

  // Extract slots from render method
  const slotMatches = content.matchAll(/<slot(?:\s+name=["']([^"']+)["'])?[^>]*>/g);
  const slotNames = new Set();
  for (const slotMatch of slotMatches) {
    const slotName = slotMatch[1] || 'default';
    if (!slotNames.has(slotName)) {
      slotNames.add(slotName);
      componentData.slots.push({
        name: slotName,
        description: slotName === 'default' ? 'Default slot for content' : `Slot for ${slotName}`,
      });
    }
  }

  // Extract events from dispatchEvent calls
  const eventMatches = content.matchAll(
    /dispatchEvent\(\s*new\s+CustomEvent[<\w>]*\(\s*['"]([^'"]+)['"]/g
  );
  const eventNames = new Set();
  for (const eventMatch of eventMatches) {
    const eventName = eventMatch[1];
    if (!eventNames.has(eventName)) {
      eventNames.add(eventName);
      componentData.events.push({
        name: eventName,
        description: `Dispatched when ${eventName.replace(/-/g, ' ')} occurs`,
      });
    }
  }

  // Generate example usage
  componentData.examples = generateExamples(componentData);

  return componentData;
}

/**
 * Generate example code snippets for a component
 */
function generateExamples(component) {
  const examples = [];

  // Basic usage example
  let basicExample = `<${component.tagName}></${component.tagName}>`;
  examples.push({
    title: 'Basic Usage',
    code: basicExample,
    description: `Basic ${component.name} component`,
  });

  // Example with common properties that have options
  const exampleProps = component.properties
    .filter((p) => p.options && p.options.length > 0)
    .slice(0, 2);

  if (exampleProps.length > 0) {
    const propsStr = exampleProps
      .map((p) => `${p.attribute}="${p.options[1] || p.options[0]}"`)
      .join(' ');
    const propsExample = `<${component.tagName} ${propsStr}></${component.tagName}>`;
    examples.push({
      title: 'With Properties',
      code: propsExample,
      description: `${component.name} with custom properties`,
    });
  }

  // Example showing all style variations if styleType exists
  const styleTypeProp = component.properties.find((p) => p.name === 'styleType');
  if (styleTypeProp && styleTypeProp.options) {
    const variations = styleTypeProp.options
      .map((opt) => `<${component.tagName} style-type="${opt}"></${component.tagName}>`)
      .join('\n');
    examples.push({
      title: 'Style Variations',
      code: variations,
      description: `${component.name} style variations`,
    });
  }

  // Example with slot if available
  const namedSlot = component.slots.find((s) => s.name !== 'default');
  if (namedSlot) {
    const slotExample = `<${component.tagName}>
  <span slot="${namedSlot.name}">Slot content</span>
</${component.tagName}>`;
    examples.push({
      title: 'With Slot',
      code: slotExample,
      description: `${component.name} with ${namedSlot.name} slot`,
    });
  }

  return examples;
}

/**
 * Generate description based on component name
 */
function generateDescription(name) {
  const descriptions = {
    BuiButton:
      'A versatile button component with multiple styles (filled, outline, free), sizes, and content options (label, icon, or both).',
    BuiToggle: 'A toggle switch component for boolean input with big and small size options.',
    BuiMessage:
      'A message component for displaying alerts and notifications with different moods (neutral, success, caution, danger).',
    BuiInput:
      'A text input component with label, validation states (moods), and optional left/right icon slots.',
    BuiNumPad: 'A numeric keypad component for entering numbers, arranged in a 3-column grid.',
    BuiNumPadButton: 'Individual button for the numeric keypad, can display numbers or icons.',
    BuiButtonCluster:
      'A container for grouping multiple buttons together horizontally or vertically.',
    BuiMoneyValue:
      'A component for displaying monetary values with customizable symbol, position, and formatting options.',
    BuiBitcoinValue:
      'A component for displaying Bitcoin amounts in various formats: sats, BTC, or BIP-177 (₿ symbol with sats).',
    BuiOptionDot:
      'A small dot indicator for showing selection states, commonly used for pagination or option selection.',
    BuiBitcoinQrDisplay:
      'A QR code display component for Bitcoin payment addresses and Lightning invoices, with unified QR code support.',
    BuiAmountOptionTile:
      'A tile component for displaying selectable amount options with primary/secondary currencies and emoji messages.',
    BuiAvatar:
      'An avatar component for displaying user images or auto-generated gradient backgrounds with optional initials.',
  };
  return descriptions[name] || `A ${name} component from the Bitcoin UI Kit.`;
}

/**
 * Main function to generate component data
 */
function main() {
  console.log('Generating component data from UI package...');

  const components = [];

  for (const file of COMPONENT_FILES) {
    const filePath = join(UI_PACKAGE_DIR, file);
    if (!existsSync(filePath)) {
      console.warn(`Warning: ${file} not found, skipping...`);
      continue;
    }

    console.log(`Processing ${file}...`);
    const componentData = parseComponentFile(filePath);
    componentData.description = generateDescription(componentData.name);

    // Log property count for debugging
    console.log(`  Found ${componentData.properties.length} properties`);

    components.push(componentData);
  }

  // Create the output data structure
  const outputData = {
    version: '0.0.1',
    generatedAt: new Date().toISOString(),
    packageName: '@sbddesign/bui-ui',
    components: components,
    instructions: {
      overview: `The Bitcoin UI Kit (BUI) is a collection of Web Components built with Lit for creating Bitcoin-focused user interfaces. These components are designed to be framework-agnostic and can be used in any web project (vanilla HTML, React, Vue, Svelte, etc.).`,
      installation: `npm install @sbddesign/bui-ui @sbddesign/bui-tokens @sbddesign/bui-icons`,
      setup: `1. Include the CSS variables from @sbddesign/bui-tokens
2. Include the Inter and Outfit fonts from Google Fonts
3. Import the components you need from @sbddesign/bui-ui`,
      usage: `Components are used as custom HTML elements (Web Components). 

To use a component:
1. Call list_components to see all available components
2. Call get_component with the component name to get its details
3. Use the tagName to create the HTML element
4. Set attributes/properties according to the component's property list
5. Use slots to provide custom content where supported

Example workflow:
- list_components → shows "Button" is available
- get_component("Button") → returns { tagName: "bui-button", properties: [...], ... }
- Use: <bui-button style-type="filled" label="Click me"></bui-button>`,
      fontSetup: `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Outfit:wght@100..900&display=swap" rel="stylesheet">`,
      tokensImport: `/* In your CSS */
@import '@sbddesign/bui-tokens/lib/tailwindcss/tailwind-theme.css';

/* Or in HTML */
<link rel="stylesheet" href="node_modules/@sbddesign/bui-tokens/lib/tailwindcss/tailwind-theme.css">`,
      componentImport: `/* Import all components */
import '@sbddesign/bui-ui';

/* Or import specific components */
import '@sbddesign/bui-ui/button.js';
import '@sbddesign/bui-ui/input.js';`,
    },
  };

  // Write the output file
  writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2));
  console.log(`\nComponent data written to ${OUTPUT_FILE}`);
  console.log(`Total components: ${components.length}`);
}

main();
