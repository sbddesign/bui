#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'src', 'svg');
const DIST_DIR = path.join(__dirname, 'dist');

// Web component template
const createIconComponent = (iconName, size, svgContent) => {
  const className = `BuiIcon${iconName.charAt(0).toUpperCase() + iconName.slice(1)}${size.charAt(0).toUpperCase() + size.slice(1)}`;
  const tagName = `bui-${iconName.replace(/([A-Z])/g, '-$1').toLowerCase()}-${size}`;

  // Extract the inner content of the SVG (everything between <svg> tags)
  const innerContent = svgContent.replace(/<svg[^>]*>([\s\S]*)<\/svg>/i, '$1');

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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

  icons.forEach(({ iconName, size, className }) => {
    const importPath = `./${iconName}/${size}.js`;
    imports.push(`import { ${className} } from '${importPath}';`);
    exports.push(`export { ${className} };`);
  });

  return `${imports.join('\n')}

${exports.join('\n')}

// Export all icons as a map for programmatic access
export const icons = {
${icons.map(({ iconName, size, className }) => `  '${iconName}-${size}': ${className}`).join(',\n')}
};
`;
};

async function buildIcons() {
  try {
    // Ensure dist directory exists
    await fs.mkdir(DIST_DIR, { recursive: true });

    const icons = [];

    // Read all icon directories
    const iconDirs = await fs.readdir(SRC_DIR);

    for (const iconDir of iconDirs) {
      const iconPath = path.join(SRC_DIR, iconDir);
      const stat = await fs.stat(iconPath);

      if (!stat.isDirectory()) continue;

      const iconName = iconDir;
      const iconDistDir = path.join(DIST_DIR, iconName);
      await fs.mkdir(iconDistDir, { recursive: true });

      // Read all SVG files in the icon directory
      const files = await fs.readdir(iconPath);
      const svgFiles = files.filter((file) => file.endsWith('.svg'));

      for (const svgFile of svgFiles) {
        const size = path.basename(svgFile, '.svg');
        const svgPath = path.join(iconPath, svgFile);
        const svgContent = await fs.readFile(svgPath, 'utf-8');

        const className = `BuiIcon${iconName.charAt(0).toUpperCase() + iconName.slice(1)}${size.charAt(0).toUpperCase() + size.slice(1)}`;

        // Create the web component
        const componentCode = createIconComponent(iconName, size, svgContent);
        const componentPath = path.join(iconDistDir, `${size}.js`);
        await fs.writeFile(componentPath, componentCode);

        icons.push({ iconName, size, className });

        console.log(`✓ Generated ${iconName}/${size}.js`);
      }
    }

    // Create index file
    const indexContent = createIndexFile(icons);
    await fs.writeFile(path.join(DIST_DIR, 'index.js'), indexContent);

    console.log(`\n✓ Built ${icons.length} icon components`);
    console.log(`✓ Generated index.js with ${icons.length} exports`);
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

// Main execution
const args = process.argv.slice(2);
const isWatchMode = args.includes('--watch');

if (isWatchMode) {
  await buildIcons();
  watchIcons();
} else {
  await buildIcons();
}
