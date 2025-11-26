#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';
import { generate as generateReactWrappers } from './scripts/generate-react-wrappers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'src', 'svg');
const DIST_DIR = path.join(__dirname, 'dist');
const PACKAGE_JSON_PATH = path.join(__dirname, 'package.json');

// Web component template
const createIconComponent = (iconName, size, svgContent, variant) => {
  const variantCapitalized = variant.charAt(0).toUpperCase() + variant.slice(1);
  const className = `BuiIcon${iconName.charAt(0).toUpperCase() + iconName.slice(1)}${variantCapitalized}${size.charAt(0).toUpperCase() + size.slice(1)}`;
  const tagName = `bui-${iconName.replace(/([A-Z])/g, '-$1').toLowerCase()}-${variant}-${size}`;

  // Extract the inner content of the SVG (everything between <svg> tags)
  const innerContent = svgContent.replace(/<svg[^>]*>([\s\S]*)<\/svg>/i, '$1');

  // Extract the viewBox from the source SVG, default to "0 0 24 24" if not found
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // For solid icons, the SVG should have fill="currentColor", for outline it should be fill="none"
  // Check if the source SVG has fill="currentColor" on the SVG element
  const hasFillCurrentColor = svgContent.match(/<svg[^>]*fill=["']currentColor["'][^>]*>/i);
  const svgFill = hasFillCurrentColor ? 'currentColor' : 'none';

  return `import { LitElement, html, css } from 'lit';

export class ${className} extends LitElement {
  static styles = css\`
    :host {
      display: inline-block;
      line-height: 0;
    }
    
    svg {
      width: 100%;
      height: 100%;
    }
  \`;

  render() {
    return html\`
      <svg xmlns="http://www.w3.org/2000/svg" fill="${svgFill}" viewBox="${viewBox}">
        ${innerContent}
      </svg>
    \`;
  }
}

customElements.define('${tagName}', ${className});

export default ${className};
`;
};

// Index file template
const createIndexFile = (icons) => {
  const imports = [];
  const exports = [];

  icons.forEach(({ iconName, size, variant, className }) => {
    const importPath = `./${iconName}/${variant}/${size}.js`;
    imports.push(`import { ${className} } from '${importPath}';`);
    exports.push(`export { ${className} };`);
  });

  return `${imports.join('\n')}

${exports.join('\n')}

// Export all icons as a map for programmatic access
export const icons = {
${icons.map(({ iconName, size, variant, className }) => `  '${iconName}-${variant}-${size}': ${className}`).join(',\n')}
};
`;
};

async function buildIcons() {
  try {
    // Ensure dist directory exists
    await fs.mkdir(DIST_DIR, { recursive: true });

    const icons = [];

    // Process both outline and solid variants
    const variants = ['outline', 'solid'];

    for (const variant of variants) {
      const variantPath = path.join(SRC_DIR, variant);

      // Check if variant directory exists
      try {
        await fs.access(variantPath);
      } catch {
        // Variant directory doesn't exist, skip it
        continue;
      }

      // Read all icon directories in the variant directory
      const iconDirs = await fs.readdir(variantPath);

      for (const iconDir of iconDirs) {
        const iconPath = path.join(variantPath, iconDir);
        const stat = await fs.stat(iconPath);

        if (!stat.isDirectory()) continue;

        const iconName = iconDir;
        const iconDistDir = path.join(DIST_DIR, iconName, variant);
        await fs.mkdir(iconDistDir, { recursive: true });

        // Read all SVG files in the icon directory
        const files = await fs.readdir(iconPath);
        const svgFiles = files.filter((file) => file.endsWith('.svg'));

        for (const svgFile of svgFiles) {
          const size = path.basename(svgFile, '.svg');
          const svgPath = path.join(iconPath, svgFile);
          const svgContent = await fs.readFile(svgPath, 'utf-8');

          const variantCapitalized = variant.charAt(0).toUpperCase() + variant.slice(1);
          const className = `BuiIcon${iconName.charAt(0).toUpperCase() + iconName.slice(1)}${variantCapitalized}${size.charAt(0).toUpperCase() + size.slice(1)}`;

          // Create the web component
          const componentCode = createIconComponent(iconName, size, svgContent, variant);
          const componentPath = path.join(iconDistDir, `${size}.js`);
          await fs.writeFile(componentPath, componentCode);

          icons.push({ iconName, size, variant, className });

          console.log(`✓ Generated ${iconName}/${variant}/${size}.js`);
        }
      }
    }

    // Create index file
    const indexContent = createIndexFile(icons);
    await fs.writeFile(path.join(DIST_DIR, 'index.js'), indexContent);

    console.log(`\n✓ Built ${icons.length} icon components`);
    console.log(`✓ Generated index.js with ${icons.length} exports`);

    // Generate React wrappers
    generateReactWrappers();

    // Update package.json exports
    await updatePackageExports(icons);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Watch mode
async function watchIcons() {
  console.log('Watching for changes in src/svg...');

  const watcher = chokidar.watch(SRC_DIR, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });

  watcher
    .on('add', (path) => {
      console.log(`File ${path} has been added`);
      buildIcons();
    })
    .on('change', (path) => {
      console.log(`File ${path} has been changed`);
      buildIcons();
    })
    .on('unlink', (path) => {
      console.log(`File ${path} has been removed`);
      buildIcons();
    });
}

// Update package.json exports
async function updatePackageExports(icons) {
  try {
    const packageJsonContent = await fs.readFile(PACKAGE_JSON_PATH, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);

    // Build exports object
    const exports = {
      '.': './dist/index.js',
      './react': {
        types: './react.d.ts',
        default: './react.js',
      },
    };

    // Add exports for each icon variant and size
    icons.forEach(({ iconName, size, variant }) => {
      const exportPath = `./${iconName}/${variant}/${size}.js`;
      const distPath = `./dist/${iconName}/${variant}/${size}.js`;
      exports[exportPath] = distPath;
    });

    packageJson.exports = exports;

    // Write updated package.json
    await fs.writeFile(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
    console.log(`✓ Updated package.json exports with ${icons.length} icon paths`);
  } catch (error) {
    console.error('Failed to update package.json exports:', error);
    // Don't fail the build if package.json update fails
  }
}

// Main execution
const args = process.argv.slice(2);
const isWatchMode = args.includes('--watch');

if (isWatchMode) {
  await buildIcons();
  watchIcons();
} else {
  await buildIcons();
}
