const fs = require('fs');
const path = require('path');
const { formatHex } = require('culori');

// Paths
const tailwindThemePath = path.join(__dirname, 'lib', 'tailwindcss', 'tailwind-theme.css');
const outputPath = path.join(__dirname, 'lib', 'tailwindcss', 'tailwind.primitives.json');

// Function to convert OKLCH to hex
function oklchToHex(oklchValue) {
  try {
    // Remove any whitespace and ensure it's a valid OKLCH value
    const cleanValue = oklchValue.trim();
    const hex = formatHex(cleanValue);
    return hex;
  } catch (error) {
    console.warn(`Warning: Could not convert OKLCH value "${oklchValue}" to hex:`, error.message);
    return null;
  }
}

// Function to parse color variables from CSS
function parseColorVariables(cssContent) {
  const colorRegex = /--color-([a-zA-Z]+)-(\d+):\s*([^;]+);/g;
  const tokens = {};
  
  let match;
  while ((match = colorRegex.exec(cssContent)) !== null) {
    const [, colorName, number, oklchValue] = match;
    
    // Convert OKLCH to hex
    const hexValue = oklchToHex(oklchValue);
    
    if (hexValue) {
      // Create nested structure: tailwind.colorName.number
      if (!tokens.tailwind) {
        tokens.tailwind = {};
      }
      if (!tokens.tailwind[colorName]) {
        tokens.tailwind[colorName] = {};
      }
      
      tokens.tailwind[colorName][number] = {
        $value: hexValue,
        $type: 'color'
      };
    }
  }
  
  return tokens;
}

// Main function
function convertOklchToHex() {
  console.log('🎨 Converting OKLCH colors to hex...');
  
  try {
    // Read the Tailwind theme CSS file
    if (!fs.existsSync(tailwindThemePath)) {
      throw new Error(`Tailwind theme file not found at: ${tailwindThemePath}`);
    }
    
    const cssContent = fs.readFileSync(tailwindThemePath, 'utf8');
    console.log(`📖 Read CSS file: ${tailwindThemePath}`);
    
    // Parse color variables
    const tokens = parseColorVariables(cssContent);
    
    // Count total colors
    let totalColors = 0;
    for (const colorName in tokens.tailwind) {
      totalColors += Object.keys(tokens.tailwind[colorName]).length;
    }
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write the JSON file
    const jsonContent = JSON.stringify(tokens, null, 2);
    fs.writeFileSync(outputPath, jsonContent);
    
    console.log(`✅ Generated hex tokens at: ${outputPath}`);
    console.log(`📊 Converted ${totalColors} color variables`);
    console.log(`🎨 Color families: ${Object.keys(tokens.tailwind).join(', ')}`);
    
    // Show example structure
    const firstColor = Object.keys(tokens.tailwind)[0];
    const firstNumber = Object.keys(tokens.tailwind[firstColor])[0];
    console.log(`\n💡 Example token structure:`);
    console.log(`   tailwind.${firstColor}.${firstNumber}: ${tokens.tailwind[firstColor][firstNumber].$value}`);
    
  } catch (error) {
    console.error('❌ Error converting OKLCH to hex:', error.message);
    process.exit(1);
  }
}

// Run the conversion
convertOklchToHex(); 