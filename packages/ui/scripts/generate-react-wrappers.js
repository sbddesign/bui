import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const outJs = path.join(rootDir, 'react.js');
const outDts = path.join(rootDir, 'react.d.ts');
const manifestPathJson = path.join(rootDir, 'wrappers.manifest.json');
const manifestPathTs = path.join(rootDir, 'wrappers.manifest.ts');

function read(file) {
  try { return fs.readFileSync(file, 'utf8'); } catch { return ''; }
}

function findDefines() {
  const map = [];
  const files = fs.readdirSync(distDir).filter(f => f.endsWith('.js'));
  for (const f of files) {
    const src = read(path.join(distDir, f));
    const re = /customElements\.define\('(.*?)'\s*,\s*([A-Za-z0-9_]+)\)/g;
    let m;
    while ((m = re.exec(src)) !== null) {
      map.push({ tag: m[1], className: m[2], srcFile: f });
    }
  }
  return map;
}

function loadManifest() {
  // optional; supports JSON only for simplicity
  try {
    if (fs.existsSync(manifestPathJson)) {
      return JSON.parse(read(manifestPathJson));
    }
  } catch {}
  return {};
}

function pascalCase(tag) {
  return tag.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

function generate() {
  const defines = findDefines();
  const manifest = loadManifest();

  const importLines = [
    `import React from 'react';`,
    `import {createComponent} from '@lit/react';`
  ];
  const dtsImportLines = [
    `import * as React from 'react';`,
    `import { type EventName } from '@lit/react';`
  ];

  const wrapperExports = [];
  const dtsExports = [];

  for (const { tag, className } of defines) {
    // Assume class is exported from dist/<tagbase>.js
    const base = tag.replace('bui-', '');
    importLines.push(`import { ${className} } from './dist/${base}.js';`);
    dtsImportLines.push(`import { ${className} } from './dist/${base}.js';`);

    const reactName = `${pascalCase(tag)}React`;
    const events = (manifest.events && manifest.events[tag]) || { onClick: 'click', onclick: 'click' };
    const eventsJs = Object.entries(events).map(([k, v]) => `${k}: '${v}'`).join(', ');

    wrapperExports.push(
`export const ${reactName} = createComponent({
  tagName: '${tag}',
  elementClass: ${className},
  react: React,
  events: { ${eventsJs} },
});`
    );

    const typedEvents = Object.keys(events).map(k => `${k}?: (e: Event) => void;`).join('\n    ');
    dtsExports.push(
`export declare const ${reactName}: React.ComponentType<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    ${typedEvents}
  }
>;`
    );
  }

  const jsOut = importLines.join('\n') + '\n\n' + wrapperExports.join('\n\n') + '\n';
  const dtsOut = dtsImportLines.join('\n') + '\n\n' + dtsExports.join('\n\n') + '\n' + 'export {}\n';

  fs.writeFileSync(outJs, jsOut, 'utf8');
  fs.writeFileSync(outDts, dtsOut, 'utf8');
}

generate();


