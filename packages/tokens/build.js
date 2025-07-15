const fs = require('fs');
const path = require('path');

// Paths
const designTokensDir = path.join(__dirname, 'design-tokens');
const manifestPath = path.join(designTokensDir, 'manifest.json');
const distDir = path.join(__dirname, 'dist');

// Read the manifest
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Function to resolve token references like "{orange}" or "{neutral.5}"
function resolveTokenReference(reference, primitives) {
  if (!reference.startsWith('{') || !reference.endsWith('}')) {
    return reference;
  }
  
  const tokenPath = reference.slice(1, -1); // Remove { and }
  const pathParts = tokenPath.split('.');
  
  let current = primitives;
  for (const part of pathParts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      console.warn(`Warning: Could not resolve token reference "${reference}"`);
      return reference;
    }
  }
  
  return current.$value || current;
}

// Function to convert tokens to CSS variables
function convertTokensToCSS(tokens, prefix = '') {
  let css = '';
  
  for (const [key, value] of Object.entries(tokens)) {
    if (typeof value === 'object' && value !== null) {
      if (value.$value !== undefined) {
        // This is a token with a value
        const cssVariableName = prefix ? `${prefix}-${key}` : key;
        css += `  --${cssVariableName}: ${value.$value};\n`;
      } else {
        // This is a nested object, recurse
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        css += convertTokensToCSS(value, newPrefix);
      }
    }
  }
  
  return css;
}

// Function to process theme tokens with primitive resolution
function processThemeTokens(themeTokens, primitives) {
  let processedTokens = {};
  
  function processValue(value) {
    if (typeof value === 'string' && value.startsWith('{')) {
      return resolveTokenReference(value, primitives);
    } else if (typeof value === 'object' && value !== null) {
      if (value.$value && typeof value.$value === 'string' && value.$value.startsWith('{')) {
        return {
          ...value,
          $value: resolveTokenReference(value.$value, primitives)
        };
      } else {
        return value;
      }
    }
    return value;
  }
  
  function traverse(obj, result = {}) {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null && !value.$type) {
        result[key] = {};
        traverse(value, result[key]);
      } else {
        result[key] = processValue(value);
      }
    }
    return result;
  }
  
  return traverse(themeTokens);
}

// Main build process
function buildTokens() {
  console.log('🔨 Building design tokens...');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // Load primitives
  const primitivesPath = path.join(designTokensDir, 'bui.primitives.tokens.json');
  const primitives = JSON.parse(fs.readFileSync(primitivesPath, 'utf8'));
  
  // Generate primitives CSS
  const primitivesCSS = convertTokensToCSS(primitives);
  
  // Process themes
  const themes = manifest.collections.bui.modes.themes;
  let allThemeTokens = {};
  
  for (const themeFile of themes) {
    const themePath = path.join(designTokensDir, themeFile);
    const themeTokens = JSON.parse(fs.readFileSync(themePath, 'utf8'));
    
    // Extract theme name from filename
    const themeName = themeFile.replace('bui.themes.', '').replace('.tokens.json', '');
    
    // Process theme tokens with primitive resolution
    const processedTokens = processThemeTokens(themeTokens, primitives);
    
    // Flatten and prefix theme tokens
    function flattenTokens(obj, prefix = '') {
      let result = {};
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null && value.$value !== undefined) {
          const cssName = prefix ? `${prefix}-${key}` : key;
          result[cssName] = value.$value;
        } else if (typeof value === 'object' && value !== null) {
          const newPrefix = prefix ? `${prefix}-${key}` : key;
          Object.assign(result, flattenTokens(value, newPrefix));
        }
      }
      return result;
    }
    
    const flattenedTokens = flattenTokens(processedTokens);
    
    // Add theme prefix
    for (const [key, value] of Object.entries(flattenedTokens)) {
      allThemeTokens[`${themeName}-${key}`] = value;
    }
  }
  
  // Generate theme CSS
  let themeCSS = '';
  for (const [key, value] of Object.entries(allThemeTokens)) {
    themeCSS += `  --${key}: ${value};\n`;
  }
  
  // Create the final CSS content
  const cssContent = `/* BUI Design Tokens - Generated CSS Variables */
/* Generated from Design Tokens Manager */
:root {
${primitivesCSS}${themeCSS}}`;

  // Write the CSS file
  const outputPath = path.join(distDir, 'variables.css');
  fs.writeFileSync(outputPath, cssContent);
  
  console.log(`✅ Generated CSS variables at: ${outputPath}`);
  console.log(`📊 Generated ${primitivesCSS.split('\n').filter(line => line.trim().startsWith('--')).length} primitive variables`);
  console.log(`🎨 Generated ${themeCSS.split('\n').filter(line => line.trim().startsWith('--')).length} theme variables`);
  console.log(`🎯 Total: ${cssContent.split('\n').filter(line => line.trim().startsWith('--')).length} CSS variables`);
}

// Run the build
buildTokens(); 