import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_PATH = join(__dirname, '../data/components.json');
const EDGE_FUNCTION_PATH = join(__dirname, '../netlify/edge-functions/mcp-handler/index.ts');

// Read the Edge Function
let edgeFunctionCode = readFileSync(EDGE_FUNCTION_PATH, 'utf-8');

// Read component data
const componentData = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));

// Replace the loadComponentData function to use embedded data
const embeddedDataCode = `async function loadComponentData() {
  // Embedded component data
  return ${JSON.stringify(componentData, null, 2)};
}`;

// Replace the loadComponentData function
edgeFunctionCode = edgeFunctionCode.replace(
  /async function loadComponentData\(\) \{[\s\S]*?\n\}/,
  embeddedDataCode
);

// Remove the COMPONENT_DATA_URL constant if it exists
edgeFunctionCode = edgeFunctionCode.replace(/const COMPONENT_DATA_URL = .*;\n/, '');

writeFileSync(EDGE_FUNCTION_PATH, edgeFunctionCode);
console.log('Updated Edge Function with embedded component data');
