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
const dtsDir = path.join(rootDir, 'types', 'defs');

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

function findDefines() {
  const map = [];
  const files = fs.readdirSync(distDir).filter((f) => f.endsWith('.js'));
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

function parsePropsFromDts(content) {
  // Extract props from class instance fields (not static, not methods)
  const classRegex =
    /export\s+declare\s+class\s+(\w+)\s+extends\s+LitElement\s*\{([\s\S]*?)\n\}/g;
  const results = [];
  let classMatch;
  while ((classMatch = classRegex.exec(content)) !== null) {
    const className = classMatch[1];
    const body = classMatch[2];
    const props = [];
    const propRegex = /\n\s{2,}(\w+)\??:\s*([^;]+);/g;
    let propMatch;
    while ((propMatch = propRegex.exec(body)) !== null) {
      const name = propMatch[1];
      const type = propMatch[2].trim();
      // Skip obvious non-props and static property subfields
      if (
        ['validationRules', 'styles', 'type', 'attribute', 'reflect'].includes(
          name
        )
      )
        continue;
      if (type.includes('TemplateResult') || type.startsWith('(')) continue;
      props.push({ name, type });
    }
    if (props.length) results.push({ className, props });
  }
  return results;
}

function loadPropsFromDefs() {
  const classToProps = new Map();
  if (!fs.existsSync(dtsDir)) return classToProps;
  const files = fs.readdirSync(dtsDir).filter((f) => f.endsWith('.d.ts'));
  for (const f of files) {
    const content = read(path.join(dtsDir, f));
    const classes = parsePropsFromDts(content);
    for (const cls of classes) {
      classToProps.set(cls.className, cls.props);
    }
  }
  return classToProps;
}

function mapType(t) {
  if (/\bboolean\b/.test(t)) return 'boolean';
  if (/\bnumber\b/.test(t)) return 'number';
  if (/\bstring\b/.test(t)) return 'string';
  // Fallback to string to be permissive for unions and custom types
  return 'string';
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
  return tag
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

function generate() {
  const defines = findDefines();
  const manifest = loadManifest();
  const classToProps = loadPropsFromDefs();

  const importLines = [
    `import React from 'react';`,
    `import {createComponent} from '@lit/react';`,
  ];
  const dtsImportLines = [`import * as React from 'react';`];

  const wrapperExports = [];
  const dtsExports = [];

  defines.forEach(({ tag, className, srcFile }, idx) => {
    const fileName =
      srcFile && srcFile.endsWith('.js')
        ? srcFile
        : `${tag.replace('bui-', '')}.js`;
    const importPath = `./dist/${fileName}`;
    const nsVar = `__mod_${idx}`;
    const resolvedVar = `__${className}_resolved_${idx}`;
    importLines.push(`import * as ${nsVar} from '${importPath}';`);
    importLines.push(
      `const ${resolvedVar} = (${nsVar} && (${nsVar}.${className} ?? ${nsVar}.default));`
    );
    // No type import required; we emit primitive mapped types for props for portability

    const reactName = `${pascalCase(tag)}React`;
    const events = (manifest.events && manifest.events[tag]) || {
      onClick: 'click',
      onclick: 'click',
    };
    const eventsJs = Object.entries(events)
      .map(([k, v]) => `${k}: '${v}'`)
      .join(', ');

    wrapperExports.push(
      `export const ${reactName} = createComponent({
  tagName: '${tag}',
  elementClass: ${resolvedVar},
  react: React,
  events: { ${eventsJs} },
});`
    );

    const typedEvents = Object.keys(events)
      .map((k) => `${k}?: (e: Event) => void;`)
      .join('\n    ');
    const props = classToProps.get(className) || [];
    const propLines = props
      .map((p) => `${p.name}?: ${mapType(p.type)};`)
      .join('\n    ');
    const propBlock = propLines ? `\n    ${propLines}\n  ` : '';
    dtsExports.push(
      `export declare const ${reactName}: React.ComponentType<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    ${typedEvents}${propBlock}
  }
>;`
    );
  });

  const jsOut =
    importLines.join('\n') + '\n\n' + wrapperExports.join('\n\n') + '\n';
  const dtsOut =
    dtsImportLines.join('\n') +
    '\n\n' +
    dtsExports.join('\n\n') +
    '\n' +
    'export {}\n';

  fs.writeFileSync(outJs, jsOut, 'utf8');
  fs.writeFileSync(outDts, dtsOut, 'utf8');
}

generate();
