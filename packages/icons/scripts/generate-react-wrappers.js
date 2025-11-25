import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const outJs = path.join(rootDir, 'react.js');
const outDts = path.join(rootDir, 'react.d.ts');

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

function findDefines() {
  const map = [];

  // Recursively scan dist directory for .js files
  function scanDirectory(dir, relativePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        scanDirectory(fullPath, relPath);
      } else if (entry.isFile() && entry.name.endsWith('.js') && entry.name !== 'index.js') {
        const src = read(fullPath);
        const re = /customElements\.define\('(.*?)'\s*,\s*([A-Za-z0-9_]+)\)/g;
        let m;
        while ((m = re.exec(src)) !== null) {
          map.push({
            tag: m[1],
            className: m[2],
            srcFile: relPath,
          });
        }
      }
    }
  }

  scanDirectory(distDir);
  return map;
}

function pascalCase(tag) {
  return tag
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

function generate() {
  const defines = findDefines();

  const importLines = [`import React from 'react';`, `import {createComponent} from '@lit/react';`];
  const dtsImportLines = [`import * as React from 'react';`];

  const wrapperExports = [];
  const dtsExports = [];

  defines.forEach(({ tag, className, srcFile }, idx) => {
    const importPath = `./dist/${srcFile}`;
    const nsVar = `__mod_${idx}`;
    const resolvedVar = `__${className}_resolved_${idx}`;
    importLines.push(`import * as ${nsVar} from '${importPath}';`);
    importLines.push(
      `const ${resolvedVar} = (${nsVar} && (${nsVar}.${className} ?? ${nsVar}.default));`
    );

    const reactName = `${pascalCase(tag)}React`;
    // Icons typically don't have custom events, just standard HTML events
    const eventsJs = `onClick: 'click'`;

    wrapperExports.push(
      `export const ${reactName} = createComponent({
  tagName: '${tag}',
  elementClass: ${resolvedVar},
  react: React,
  events: { ${eventsJs} },
});`
    );

    const typedEvents = `onClick?: (e: Event) => void;`;
    dtsExports.push(
      `export declare const ${reactName}: React.ComponentType<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    ${typedEvents}
  }
>;`
    );
  });

  const jsOut = importLines.join('\n') + '\n\n' + wrapperExports.join('\n\n') + '\n';
  const dtsOut =
    dtsImportLines.join('\n') + '\n\n' + dtsExports.join('\n\n') + '\n' + 'export {}\n';

  fs.writeFileSync(outJs, jsOut, 'utf8');
  fs.writeFileSync(outDts, dtsOut, 'utf8');

  console.log(`✓ Generated react.js with ${defines.length} React wrappers`);
  console.log(`✓ Generated react.d.ts with ${defines.length} type definitions`);
}

export { generate };

// Run if called directly (check if this file is being executed as a script)
const scriptPath = fileURLToPath(import.meta.url);
const mainPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (scriptPath === mainPath) {
  generate();
}
