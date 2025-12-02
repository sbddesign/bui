import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const UI_PACKAGE_PATH = join(__dirname, '../../ui');
const OUTPUT_PATH = join(__dirname, '../data/components.json');

/**
 * Extract component metadata from a TypeScript file
 */
function extractComponentMetadata(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  
  // Extract class name (e.g., BuiButton)
  const classMatch = content.match(/export class (\w+)/);
  if (!classMatch) return null;
  
  const className = classMatch[1];
  const componentName = className.replace(/^Bui/, '');
  
  // Extract tag name from customElements.define
  const tagMatch = content.match(/customElements\.define\(['"]([^'"]+)['"]/);
  if (!tagMatch) return null;
  
  const tagName = tagMatch[1];
  
  // Extract static properties using a simpler approach
  // Match each property definition on its own line or multi-line
  const properties = {};
  
  // Find all property definitions: propName: { ... }
  // Use a regex that matches property name and captures the definition
  const propPattern = /(\w+):\s*\{([^}]*?(?:\{[^}]*\}[^}]*?)*)\}/g;
  let propMatch;
  
  // First, extract the properties block
  const propsBlockMatch = content.match(/static properties\s*=\s*\{([\s\S]*?)\n\s*\};/);
  if (!propsBlockMatch) return null;
  
  const propsBlock = propsBlockMatch[1];
  
  // Parse each property line by line
  const lines = propsBlock.split('\n');
  let currentProp = null;
  let propLines = [];
  let braceDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line starts a new property
    const propStartMatch = line.match(/^\s*(\w+):\s*\{/);
    if (propStartMatch) {
      // Save previous property
      if (currentProp && propLines.length > 0) {
        const propDef = propLines.join('\n');
        properties[currentProp] = parsePropertyDef(propDef, currentProp, content);
      }
      currentProp = propStartMatch[1];
      propLines = [line];
      braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      continue;
    }
    
    // Continue collecting lines for current property
    if (currentProp) {
      propLines.push(line);
      braceDepth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      
      // Property definition complete
      if (braceDepth === 0 && line.includes('}')) {
        const propDef = propLines.join('\n');
        properties[currentProp] = parsePropertyDef(propDef, currentProp, content);
        currentProp = null;
        propLines = [];
      }
    }
  }
  
  // Handle last property
  if (currentProp && propLines.length > 0) {
    const propDef = propLines.join('\n');
    properties[currentProp] = parsePropertyDef(propDef, currentProp, content);
  }
  
  function parsePropertyDef(propDef, propName, fullContent) {
    // Extract type
    const typeMatch = propDef.match(/type:\s*(\w+)/);
    const type = typeMatch ? typeMatch[1] : 'String';
    
    // Extract attribute name (if different from property name)
    const attrMatch = propDef.match(/attribute:\s*['"]([^'"]+)['"]/);
    const attribute = attrMatch ? attrMatch[1] : propName;
    
    // Check if reflect is true
    const reflect = propDef.includes('reflect: true');
    
    // Check if it's required (no default in constructor and no ? in TypeScript declaration)
    const tsDeclMatch = fullContent.match(new RegExp(`declare\\s+${propName}(\\?)?:`));
    const optional = tsDeclMatch && tsDeclMatch[1] === '?';
    
    return {
      type: type.toLowerCase(),
      attribute: attribute,
      reflect: reflect,
      required: !optional && type.toLowerCase() !== 'boolean',
    };
  }
  
  // Extract allowed values from const arrays (e.g., const BUTTON_STYLE_TYPES = ['filled', 'outline'] as const)
  const constArrays = {};
  const constRegex = /const\s+(\w+)\s*=\s*\[([^\]]+)\]\s+as\s+const/g;
  let constMatch;
  
  while ((constMatch = constRegex.exec(content)) !== null) {
    const constName = constMatch[1];
    const valuesStr = constMatch[2];
    const values = valuesStr
      .split(',')
      .map(v => v.trim().replace(/['"]/g, ''))
      .filter(v => v);
    
    // Try to match this const array to a property
    // Common patterns: BUTTON_STYLE_TYPES -> styleType, INPUT_MOODS -> mood
    for (const [propName, propInfo] of Object.entries(properties)) {
      const propUpper = propName.toUpperCase().replace(/([A-Z])/g, '_$1').slice(1);
      if (constName.includes(propUpper) || constName.includes(propName.toUpperCase())) {
        propInfo.allowedValues = values;
        break;
      }
    }
    
    constArrays[constName] = values;
  }
  
  // Extract default values from constructor
  const constructorMatch = content.match(/constructor\(\)\s*\{([^}]+)\}/s);
  if (constructorMatch) {
    const constructorBody = constructorMatch[1];
    for (const [propName, propInfo] of Object.entries(properties)) {
      const defaultMatch = constructorBody.match(
        new RegExp(`this\\.${propName}\\s*=\\s*([^;]+)`)
      );
      if (defaultMatch) {
        let defaultValue = defaultMatch[1].trim();
        // Clean up the default value
        defaultValue = defaultValue.replace(/['"]/g, '');
        if (defaultValue === 'false') {
          propInfo.defaultValue = false;
        } else if (defaultValue === 'true') {
          propInfo.defaultValue = true;
        } else if (!isNaN(defaultValue) && defaultValue !== '') {
          propInfo.defaultValue = Number(defaultValue);
        } else {
          propInfo.defaultValue = defaultValue;
        }
        propInfo.required = false; // Has default, so not required
      }
    }
  }
  
  return {
    name: componentName,
    className: className,
    tagName: tagName,
    properties: properties,
  };
}

/**
 * Get all component TypeScript files
 */
function getComponentFiles() {
  const files = [
    'button.ts',
    'toggle.ts',
    'input.ts',
    'message.ts',
    'numpad-button.ts',
    'numpad.ts',
    'button-cluster.ts',
    'money-value.ts',
    'bitcoin-value.ts',
    'option-dot.ts',
    'bitcoin-qr-display.ts',
    'amount-option-tile.ts',
    'avatar.ts',
  ];
  
  return files.map(file => join(UI_PACKAGE_PATH, file));
}

/**
 * Generate component data JSON
 */
function generateComponentData() {
  const files = getComponentFiles();
  const components = [];
  
  for (const file of files) {
    try {
      const metadata = extractComponentMetadata(file);
      if (metadata) {
        components.push(metadata);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  // Sort by component name
  components.sort((a, b) => a.name.localeCompare(b.name));
  
  const data = {
    components: components,
    generatedAt: new Date().toISOString(),
  };
  
  writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
  console.log(`Generated component data for ${components.length} components`);
  console.log(`Output: ${OUTPUT_PATH}`);
}

generateComponentData();
