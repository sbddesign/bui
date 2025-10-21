const fs = require('fs');
const path = require('path');

// Paths
const designTokensDir = path.join(__dirname, 'design-tokens');
const manifestPath = path.join(designTokensDir, 'manifest.json');
const distDir = path.join(__dirname, 'dist');

// Read the manifest
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Function to resolve token references recursively like "{orange}" or "{neutral.5}"
function resolveTokenReference(
  reference,
  primitives,
  visited = new Set(),
  currentThemeTokens = null
) {
  if (!reference.startsWith('{') || !reference.endsWith('}')) {
    return reference;
  }

  const tokenPath = reference.slice(1, -1); // Remove { and }

  // Prevent circular references
  if (visited.has(tokenPath)) {
    console.warn(`Warning: Circular reference detected: "${reference}"`);
    return reference;
  }
  visited.add(tokenPath);

  const pathParts = tokenPath.split('.');

  // First try to resolve from current theme tokens (for self-references)
  let current = currentThemeTokens;
  if (current) {
    for (const part of pathParts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        current = null;
        break;
      }
    }
  }

  // If not found in theme tokens, try primitives
  if (!current) {
    current = primitives;
    for (const part of pathParts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        console.warn(
          `Warning: Could not resolve token reference "${reference}"`
        );
        return reference;
      }
    }
  }

  const resolvedValue = current.$value || current;

  // If the resolved value is still a reference, resolve it recursively
  if (typeof resolvedValue === 'string' && resolvedValue.startsWith('{')) {
    return resolveTokenReference(
      resolvedValue,
      primitives,
      visited,
      currentThemeTokens
    );
  }

  return resolvedValue;
}

// Function to recursively resolve all token references in an object
function resolveAllReferences(obj, primitives, currentThemeTokens = null) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      if (value.$value !== undefined) {
        // This is a token with a value
        const resolvedValue =
          typeof value.$value === 'string' && value.$value.startsWith('{')
            ? resolveTokenReference(
                value.$value,
                primitives,
                new Set(),
                currentThemeTokens
              )
            : value.$value;

        result[key] = {
          ...value,
          $value: resolvedValue,
        };

        // Also resolve any nested properties that have their own $value
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          if (
            nestedKey !== '$value' &&
            nestedKey !== '$type' &&
            typeof nestedValue === 'object' &&
            nestedValue !== null
          ) {
            if (nestedValue.$value !== undefined) {
              // This nested property has its own $value, resolve it
              const nestedResolvedValue =
                typeof nestedValue.$value === 'string' &&
                nestedValue.$value.startsWith('{')
                  ? resolveTokenReference(
                      nestedValue.$value,
                      primitives,
                      new Set(),
                      currentThemeTokens
                    )
                  : nestedValue.$value;

              if (!result[key][nestedKey]) {
                result[key][nestedKey] = {};
              }
              result[key][nestedKey] = {
                ...nestedValue,
                $value: nestedResolvedValue,
              };
            } else {
              // This nested property is an object without $value, recurse
              if (!result[key][nestedKey]) {
                result[key][nestedKey] = {};
              }
              Object.assign(
                result[key][nestedKey],
                resolveAllReferences(
                  { [nestedKey]: nestedValue },
                  primitives,
                  currentThemeTokens
                )
              );
            }
          }
        }
      } else {
        // This is a nested object, recurse
        result[key] = resolveAllReferences(
          value,
          primitives,
          currentThemeTokens
        );
      }
    } else {
      result[key] = value;
    }
  }

  return result;
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
  // Use the new comprehensive reference resolution
  return resolveAllReferences(themeTokens, primitives, themeTokens);
}

// Function to flatten tokens for CSS output
function flattenTokens(obj, prefix = '') {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      if (value.$value !== undefined) {
        // This is a token with a value
        const cssName = prefix ? `${prefix}-${key}` : key;
        result[cssName] = value.$value;

        // Process nested properties that have their own $value, but don't create duplicate paths
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          if (
            nestedKey !== '$value' &&
            nestedKey !== '$type' &&
            typeof nestedValue === 'object' &&
            nestedValue !== null &&
            nestedValue.$value !== undefined
          ) {
            const nestedCssName = `${cssName}-${nestedKey}`;
            result[nestedCssName] = nestedValue.$value;
          }
        }
      } else {
        // This is a nested object, recurse
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        Object.assign(result, flattenTokens(value, newPrefix));
      }
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
  const primitivesPath = path.join(
    designTokensDir,
    'bui.primitives.tokens.json'
  );
  const primitives = JSON.parse(fs.readFileSync(primitivesPath, 'utf8'));

  // Load Tailwind primitives
  const tailwindPrimitivesPath = path.join(
    __dirname,
    'lib',
    'tailwindcss',
    'tailwind.primitives.json'
  );
  let tailwindPrimitives = {};
  if (fs.existsSync(tailwindPrimitivesPath)) {
    tailwindPrimitives = JSON.parse(
      fs.readFileSync(tailwindPrimitivesPath, 'utf8')
    );
    console.log('📦 Loaded Tailwind primitives');
  } else {
    console.warn(
      '⚠️  Tailwind primitives not found. Run "pnpm run convert:oklch" first.'
    );
  }

  // Merge primitives (Tailwind primitives take precedence for overlapping keys)
  const mergedPrimitives = { ...primitives, ...tailwindPrimitives };

  // Generate primitives CSS
  const primitivesCSS = convertTokensToCSS(mergedPrimitives);

  // Process themes
  const themes = manifest.collections.bui.modes.themes;
  let themeCSS = '';
  let themeCount = 0;

  // First pass: collect all system tokens from all themes
  const allSystemTokens = {};

  for (const themeFile of themes) {
    const themePath = path.join(designTokensDir, themeFile);
    const themeTokens = JSON.parse(fs.readFileSync(themePath, 'utf8'));

    // Extract system tokens from this theme
    if (themeTokens.system) {
      Object.assign(allSystemTokens, themeTokens.system);
    }
  }

  // Create a complete token set including primitives, tailwind, and system tokens
  const completeTokenSet = { ...mergedPrimitives, system: allSystemTokens };

  for (const themeFile of themes) {
    const themePath = path.join(designTokensDir, themeFile);
    const themeTokens = JSON.parse(fs.readFileSync(themePath, 'utf8'));

    // Extract theme name and mode from filename
    // Example: "bui.themes.bitcoindesign-light.tokens.json" -> theme: "bitcoindesign", mode: "light"
    const themeNameMatch = themeFile.match(
      /bui\.themes\.([^.]+)-([^.]+)\.tokens\.json/
    );
    if (!themeNameMatch) {
      console.warn(`Warning: Could not parse theme filename: ${themeFile}`);
      continue;
    }

    const [, themeName, mode] = themeNameMatch;

    // Process theme tokens with complete token resolution (including Tailwind primitives)
    const processedTokens = resolveAllReferences(
      themeTokens,
      completeTokenSet,
      themeTokens
    );

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
  console.log(
    `📊 Generated ${primitivesCSS.split('\n').filter((line) => line.trim().startsWith('--')).length} primitive variables`
  );
  console.log(`🎨 Generated ${themeCount} theme/mode combinations`);
  console.log(
    `🎯 Total: ${cssContent.split('\n').filter((line) => line.trim().startsWith('--')).length} CSS variables`
  );
  console.log(
    `\n💡 Usage: Add data-theme and data-mode attributes to your <html> element`
  );
  console.log(
    `   Example: <html data-theme="bitcoin-design" data-mode="light">`
  );
}

// Run the build
buildTokens();
