const fs = require('fs');
const path = require('path');

// Read the design tokens JSON file
const tokensPath = path.join(__dirname, 'bui.tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

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

// Generate CSS variables
const cssVariables = convertTokensToCSS(tokens.tokens.primitives.tailwind);

// Create the CSS content
const cssContent = `/* BUI Design Tokens - Generated CSS Variables */
:root {
${cssVariables}}`;

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write the CSS file
const outputPath = path.join(distDir, 'variables.css');
fs.writeFileSync(outputPath, cssContent);

console.log(`✅ Generated CSS variables at: ${outputPath}`);
console.log(`📊 Generated ${cssVariables.split('\n').filter(line => line.trim().startsWith('--')).length} CSS variables`); 