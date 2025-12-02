import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to UI package components
const UI_PACKAGE_PATH = join(__dirname, '../../ui');
const OUTPUT_PATH = join(__dirname, '../data/components.json');

/**
 * Extract tag name from customElements.define call
 */
function extractTagName(sourceText, className) {
  const tagNamePattern = new RegExp(
    `customElements\\.define\\s*\\(\\s*['"\`]([^'"\`]+)['"\`]\\s*,\\s*${className}`
  );
  const match = sourceText.match(tagNamePattern);
  return match ? match[1] : null;
}

/**
 * Extract const array values (for string literal types)
 */
function extractConstArrayValues(sourceText, propertyName) {
  // First, try to find the const array via validation rules
  // Look for: createStringLiteralValidationRule(CONST_ARRAY, 'propertyName')
  const validationPattern = new RegExp(
    `createStringLiteralValidationRule\\(\\s*(\\w+)\\s*,\\s*['"\`]${propertyName}['"\`]\\s*\\)`,
    'g'
  );
  const validationMatch = [...sourceText.matchAll(validationPattern)];

  if (validationMatch.length > 0) {
    const constArrayName = validationMatch[0][1];
    // Now find the const array definition
    const constArrayPattern = new RegExp(
      `const\\s+${constArrayName}\\s*=\\s*\\[([^\\]]+)\\]\\s*as\\s*const`,
      'g'
    );
    const arrayMatch = [...sourceText.matchAll(constArrayPattern)];
    if (arrayMatch.length > 0 && arrayMatch[0][1]) {
      const values = arrayMatch[0][1]
        .split(',')
        .map((v) => v.trim().replace(/['"`]/g, ''))
        .filter((v) => v.length > 0);
      if (values.length > 0) {
        return values;
      }
    }
  }

  // Fallback: Convert propertyName to various naming conventions
  // e.g., "styleType" -> "STYLE_TYPES", "BUTTON_STYLE_TYPES", etc.
  const camelToUpper = propertyName.replace(/([A-Z])/g, '_$1').toUpperCase();
  const patterns = [
    // Pattern: const BUTTON_STYLE_TYPES = [...]
    new RegExp(`const\\s+\\w+_${camelToUpper}\\s*=\\s*\\[([^\\]]+)\\]\\s*as\\s*const`, 'g'),
    // Pattern: const STYLE_TYPES = [...]
    new RegExp(`const\\s+${camelToUpper}\\s*=\\s*\\[([^\\]]+)\\]\\s*as\\s*const`, 'g'),
    // Pattern: const BUTTON_CONTENTS = [...] (for "content" property)
    new RegExp(
      `const\\s+${propertyName.toUpperCase()}_\\w+\\s*=\\s*\\[([^\\]]+)\\]\\s*as\\s*const`,
      'g'
    ),
    // Pattern: const PROPERTY_NAME = [...]
    new RegExp(
      `const\\s+${propertyName.toUpperCase()}\\w*\\s*=\\s*\\[([^\\]]+)\\]\\s*as\\s*const`,
      'g'
    ),
    // Generic pattern
    new RegExp(
      `const\\s+\\w*${propertyName.toUpperCase()}\\w*\\s*=\\s*\\[([^\\]]+)\\]\\s*as\\s*const`,
      'gi'
    ),
  ];

  for (const pattern of patterns) {
    const matches = [...sourceText.matchAll(pattern)];
    for (const match of matches) {
      if (match[1]) {
        // Extract string values from the array
        const values = match[1]
          .split(',')
          .map((v) => v.trim().replace(/['"`]/g, ''))
          .filter((v) => v.length > 0);
        if (values.length > 0) {
          return values;
        }
      }
    }
  }

  return null;
}

/**
 * Extract default value from constructor
 */
function extractDefaultValue(sourceText, propertyName) {
  // Look for: this.propertyName = value;
  const pattern = new RegExp(`this\\.${propertyName}\\s*=\\s*([^;]+);`);
  const match = sourceText.match(pattern);
  if (match && match[1]) {
    let value = match[1].trim();
    // Remove quotes if it's a string
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('`') && value.endsWith('`'))
    ) {
      value = value.slice(1, -1);
    }
    // Check if it's a boolean
    if (value === 'true' || value === 'false') {
      return value === 'true';
    }
    // Check if it's a number
    if (!isNaN(Number(value)) && value.trim() !== '' && !value.includes(' ')) {
      return Number(value);
    }
    return value;
  }
  return undefined;
}

/**
 * Parse static properties object
 */
function parseStaticProperties(sourceText) {
  const properties = [];

  // Find static properties = { ... } - use a more robust pattern
  // Match from "static properties" to the closing brace, handling nested braces
  const staticPropsStart = sourceText.indexOf('static properties');
  if (staticPropsStart === -1) {
    return properties;
  }

  // Find the opening brace after "static properties ="
  let braceStart = sourceText.indexOf('{', staticPropsStart);
  if (braceStart === -1) {
    return properties;
  }

  // Find the matching closing brace
  let braceCount = 0;
  let braceEnd = braceStart;
  for (let i = braceStart; i < sourceText.length; i++) {
    if (sourceText[i] === '{') braceCount++;
    if (sourceText[i] === '}') braceCount--;
    if (braceCount === 0) {
      braceEnd = i;
      break;
    }
  }

  const propsContent = sourceText.substring(braceStart + 1, braceEnd);

  // Extract each property: propName: { type: ..., attribute: ..., reflect: ... }
  // Handle nested braces properly
  let pos = 0;
  while (pos < propsContent.length) {
    // Find property name
    const propNameMatch = propsContent.substring(pos).match(/^\s*(\w+):\s*\{/);
    if (!propNameMatch) {
      pos++;
      continue;
    }

    const propName = propNameMatch[1];
    const propStart = pos + propNameMatch[0].length - 1; // Position of opening brace

    // Find matching closing brace for this property
    let propBraceCount = 0;
    let propEnd = propStart;
    for (let i = propStart; i < propsContent.length; i++) {
      if (propsContent[i] === '{') propBraceCount++;
      if (propsContent[i] === '}') propBraceCount--;
      if (propBraceCount === 0) {
        propEnd = i;
        break;
      }
    }

    const propConfig = propsContent.substring(propStart + 1, propEnd);

    let propType = 'String';
    let attributeName = propName;
    let reflect = false;

    // Extract type
    const typeMatch = propConfig.match(/type:\s*(\w+)/);
    if (typeMatch) {
      propType = typeMatch[1];
    }

    // Extract attribute name
    const attrMatch = propConfig.match(/attribute:\s*['"`]([^'"`]+)['"`]/);
    if (attrMatch) {
      attributeName = attrMatch[1];
    }

    // Extract reflect
    if (propConfig.includes('reflect:') && propConfig.match(/reflect:\s*true/)) {
      reflect = true;
    }

    // Extract default value from constructor
    const defaultValue = extractDefaultValue(sourceText, propName);

    // Check for validation rules (const arrays)
    const validValues = extractConstArrayValues(sourceText, propName);

    // Determine if required (has default value means not required)
    const required = defaultValue === undefined;

    properties.push({
      name: propName,
      attribute: attributeName,
      type: propType,
      reflect,
      required,
      defaultValue,
      validValues: validValues || null,
    });

    pos = propEnd + 1;
  }

  return properties;
}

/**
 * Parse TypeScript file to extract component information
 */
function parseComponentFile(filePath) {
  const sourceText = readFileSync(filePath, 'utf-8');

  // Find component class name (Bui*)
  const classMatch = sourceText.match(/export\s+class\s+(Bui\w+)/);
  if (!classMatch) {
    return null;
  }

  const className = classMatch[1];
  const componentName = className.replace('Bui', '');

  // Extract tag name
  const tagName = extractTagName(sourceText, className);
  if (!tagName) {
    return null;
  }

  // Parse properties
  const properties = parseStaticProperties(sourceText);

  return {
    name: componentName,
    className,
    tagName,
    properties,
  };
}

/**
 * Main function to generate component data
 */
function generateComponentData() {
  const componentsDir = UI_PACKAGE_PATH;
  const files = readdirSync(componentsDir).filter(
    (f) => f.endsWith('.ts') && !f.includes('.d.ts') && !f.includes('index')
  );

  const components = [];

  for (const file of files) {
    const filePath = join(componentsDir, file);
    try {
      const componentData = parseComponentFile(filePath);
      if (componentData) {
        components.push(componentData);
      }
    } catch (error) {
      console.error(`Error parsing ${file}:`, error.message);
    }
  }

  // Sort components by name
  components.sort((a, b) => a.name.localeCompare(b.name));

  // Write to JSON file
  const outputDir = dirname(OUTPUT_PATH);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(components, null, 2), 'utf-8');
  console.log(`Generated component data for ${components.length} components`);
  console.log(`Output written to: ${OUTPUT_PATH}`);
}

// Run if called directly
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  generateComponentData();
}

export { generateComponentData };
