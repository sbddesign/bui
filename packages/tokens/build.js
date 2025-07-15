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

// Function to flatten tokens for CSS output
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
  let themeCSS = '';
  let themeCount = 0;
  
  for (const themeFile of themes) {
    const themePath = path.join(designTokensDir, themeFile);
    const themeTokens = JSON.parse(fs.readFileSync(themePath, 'utf8'));
    
    // Extract theme name and mode from filename
    // Example: "bui.themes.bitcoindesign-light.tokens.json" -> theme: "bitcoindesign", mode: "light"
    const themeNameMatch = themeFile.match(/bui\.themes\.([^.]+)-([^.]+)\.tokens\.json/);
    if (!themeNameMatch) {
      console.warn(`Warning: Could not parse theme filename: ${themeFile}`);
      continue;
    }
    
    const [, themeName, mode] = themeNameMatch;
    
    // Process theme tokens with primitive resolution
    const processedTokens = processThemeTokens(themeTokens, primitives);
    
    // Flatten tokens
    const flattenedTokens = flattenTokens(processedTokens);
    
    // Generate CSS for this theme/mode combination
    themeCSS += `\n[data-theme="${themeName}"][data-mode="${mode}"] {\n`;
    for (const [key, value] of Object.entries(flattenedTokens)) {
      themeCSS += `  --${key}: ${value};\n`;
    }
    themeCSS += `}`;
    
    themeCount++;
  }
  
  // Create the final CSS content
  const cssContent = `/* BUI Design Tokens - Generated CSS Variables */
/* Generated from Design Tokens Manager */
/* Primitives - available globally */
:root {
${primitivesCSS}}

/* Theme-specific variables - applied via data attributes */
/* Usage: <html data-theme="bitcoin-design" data-mode="light"> */${themeCSS}`;

  // Write the CSS file
  const outputPath = path.join(distDir, 'variables.css');
  fs.writeFileSync(outputPath, cssContent);
  
  console.log(`✅ Generated CSS variables at: ${outputPath}`);
  console.log(`📊 Generated ${primitivesCSS.split('\n').filter(line => line.trim().startsWith('--')).length} primitive variables`);
  console.log(`🎨 Generated ${themeCount} theme/mode combinations`);
  console.log(`🎯 Total: ${cssContent.split('\n').filter(line => line.trim().startsWith('--')).length} CSS variables`);
  console.log(`\n💡 Usage: Add data-theme and data-mode attributes to your <html> element`);
  console.log(`   Example: <html data-theme="bitcoin-design" data-mode="light">`);
}

// Run the build
buildTokens(); 