// HTTP server wrapper for MCP server
// This allows the MCP server to be deployed as a web service
import express from 'express';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let componentData = null;
function loadComponentData() {
    if (!componentData) {
        const dataPath = join(__dirname, '../data/components.json');
        const data = readFileSync(dataPath, 'utf-8');
        componentData = JSON.parse(data);
    }
    return componentData;
}
const app = express();
app.use(express.json());
// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
// MCP endpoint
app.post('/mcp', async (req, res) => {
    try {
        const { method, params } = req.body;
        let result;
        if (method === 'tools/list') {
            result = {
                tools: [
                    {
                        name: 'instructions',
                        description: 'Get instructions on how to use this UI kit. This tool teaches the agent about the BUI UI Kit and how to use the other tools to discover and use components.',
                        inputSchema: {
                            type: 'object',
                            properties: {},
                        },
                    },
                    {
                        name: 'list_components',
                        description: 'List all available components in the BUI UI Kit. Returns an array of component names.',
                        inputSchema: {
                            type: 'object',
                            properties: {},
                        },
                    },
                    {
                        name: 'get_component',
                        description: 'Get detailed information about a specific component, including its tag name, properties, attributes, types, default values, and whether properties are required.',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'The name of the component (e.g., "Button", "Input", "Toggle")',
                                },
                            },
                            required: ['name'],
                        },
                    },
                ],
            };
        }
        else if (method === 'tools/call') {
            const { name, arguments: args } = params;
            if (name === 'instructions') {
                result = {
                    content: [
                        {
                            type: 'text',
                            text: `# BUI UI Kit MCP Server

This MCP server provides information about the BUI (Bitcoin UI Kit) web components library. The UI kit is built with Lit web components and can be used in any framework or vanilla HTML.

## How to Use This Server

1. **Discover Components**: Use the \`list_components\` tool to see all available components.

2. **Get Component Details**: Use the \`get_component\` tool with a component name to get detailed information including:
   - The HTML tag name (e.g., \`bui-button\`)
   - All properties/attributes the component accepts
   - Property types and allowed values
   - Default values
   - Whether properties are required

3. **Assemble Components**: Use the information from \`get_component\` to create HTML elements. For example:
   - Tag name: \`bui-button\`
   - Properties: \`{styleType: ["filled", "outline", "free"], size: ["default", "small", "large"], ...}\`
   - Example usage: \`<bui-button style-type="outline" size="large">Label</bui-button>\`

## Component Properties

Properties can be set as HTML attributes. If a property name uses camelCase (e.g., \`styleType\`), it will have a kebab-case attribute name (e.g., \`style-type\`). Boolean properties can be set as boolean attributes (e.g., \`disabled\`).

## Example Workflow

1. Call \`list_components\` to see: ["Button", "Input", "Toggle", ...]
2. Call \`get_component\` with name="Button" to get details
3. Use the tag name and properties to create: \`<bui-button style-type="filled" size="default">Click me</bui-button>\``,
                        },
                    ],
                };
            }
            else if (name === 'list_components') {
                const data = loadComponentData();
                result = {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(data.components.map((c) => c.name), null, 2),
                        },
                    ],
                };
            }
            else if (name === 'get_component') {
                if (!args || typeof args.name !== 'string') {
                    throw new Error('Component name is required');
                }
                const data = loadComponentData();
                const component = data.components.find((c) => c.name.toLowerCase() === args.name.toLowerCase());
                if (!component) {
                    result = {
                        content: [
                            {
                                type: 'text',
                                text: `Component "${args.name}" not found. Available components: ${data.components.map((c) => c.name).join(', ')}`,
                            },
                        ],
                        isError: true,
                    };
                }
                else {
                    // Format component information
                    const propertiesInfo = Object.entries(component.properties).map(([propName, prop]) => {
                        let info = `- **${propName}** (attribute: \`${prop.attribute}\`)`;
                        info += `\n  - Type: ${prop.type}`;
                        if (prop.allowedValues) {
                            info += `\n  - Allowed values: ${prop.allowedValues.map((v) => `\`${v}\``).join(', ')}`;
                        }
                        if (prop.defaultValue !== undefined) {
                            info += `\n  - Default: \`${JSON.stringify(prop.defaultValue)}\``;
                        }
                        info += `\n  - Required: ${prop.required ? 'Yes' : 'No'}`;
                        if (prop.reflect) {
                            info += `\n  - Reflects to attribute: Yes`;
                        }
                        return info;
                    });
                    const componentInfo = `# ${component.name}

**Tag Name**: \`<${component.tagName}>\`

## Properties

${propertiesInfo.join('\n\n')}

## Usage Example

\`\`\`html
<${component.tagName}${Object.entries(component.properties)
                        .filter(([_, p]) => p.defaultValue !== undefined && p.defaultValue !== false && p.defaultValue !== '')
                        .slice(0, 2)
                        .map(([name, prop]) => {
                        if (prop.type === 'boolean' && prop.defaultValue === true) {
                            return ` ${prop.attribute}`;
                        }
                        return ` ${prop.attribute}="${prop.defaultValue}"`;
                    })
                        .join('')}></${component.tagName}>
\`\`\`

## Full Property Details (JSON)

\`\`\`json
${JSON.stringify({
                        tagName: component.tagName,
                        properties: component.properties,
                    }, null, 2)}
\`\`\``;
                    result = {
                        content: [
                            {
                                type: 'text',
                                text: componentInfo,
                            },
                        ],
                    };
                }
            }
            else {
                throw new Error(`Unknown tool: ${name}`);
            }
        }
        else {
            throw new Error(`Unknown method: ${method}`);
        }
        res.json({ result });
    }
    catch (error) {
        res.status(500).json({
            error: {
                code: -32603,
                message: error.message || 'Internal error',
            },
        });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`BUI MCP Server running on port ${PORT}`);
});
