import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const dtsDir = path.join(rootDir, 'types', 'defs');
const typesDir = path.join(rootDir, 'types');
const outTypesFile = path.join(typesDir, 'react-jsx.d.ts');

function toKebabCase(input) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

function buildClassToTagMap() {
  const map = {};
  const jsFiles = fs.readdirSync(distDir).filter((f) => f.endsWith('.js'));
  for (const file of jsFiles) {
    const content = readFileSafe(path.join(distDir, file));
    const regex = /customElements\.define\('(.*?)'\s*,\s*([A-Za-z0-9_]+)\)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const tag = match[1];
      const className = match[2];
      map[className] = tag;
    }
  }
  return map;
}

function parsePropsFromDts(content) {
  // Extract props from class instance fields (not static, not methods)
  const classRegex = /export\s+declare\s+class\s+(\w+)\s+extends\s+LitElement\s*\{([\s\S]*?)\n\}/g;
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
      if (['validationRules', 'styles', 'type', 'attribute', 'reflect'].includes(name)) continue;
      if (type.includes('TemplateResult') || type.startsWith('(')) continue;
      props.push({ name, type });
    }
    if (props.length) results.push({ className, props });
  }
  return results;
}

function mapType(t) {
  if (/\bboolean\b/.test(t)) return 'boolean';
  if (/\bnumber\b/.test(t)) return 'number';
  if (/\bstring\b/.test(t)) return 'string';
  // Fallback to string to be permissive for unions like ButtonStyleType
  return 'string';
}

function generate() {
  ensureDir(typesDir);
  const classToTag = buildClassToTagMap();
  const dtsFiles = fs.existsSync(dtsDir)
    ? fs.readdirSync(dtsDir).filter((f) => f.endsWith('.d.ts'))
    : [];

  const tagToProps = new Map();

  for (const file of dtsFiles) {
    const content = readFileSafe(path.join(dtsDir, file));
    const classes = parsePropsFromDts(content);
    for (const cls of classes) {
      const tag = classToTag[cls.className];
      if (!tag) continue;
      const props = {};
      for (const p of cls.props) {
        const attr = toKebabCase(p.name);
        props[attr] = mapType(p.type);
      }
      tagToProps.set(tag, props);
    }
  }

  const header = `export {};\nimport type * as React from 'react';\n\n`;
  const open = `declare global {\n  namespace JSX {\n    interface IntrinsicElements {\n`;
  const close = `    }\n  }\n}\n`;

  const parts = [];
  for (const [tag, props] of tagToProps) {
    const propLines = Object.entries(props)
      .map(([key, type]) => `        '${key}'?: ${type};`)
      .join('\n');
    const block = `      '${tag}': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {\n${propLines}\n      };\n`;
    parts.push(block);
  }

  const out = header + open + parts.join('') + close;
  fs.writeFileSync(outTypesFile, out, 'utf8');
}

generate();
