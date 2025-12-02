import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load component data
const COMPONENTS_DATA_PATH = join(__dirname, '../data/components.json');
let componentsData = [];

try {
  const data = readFileSync(COMPONENTS_DATA_PATH, 'utf-8');
  componentsData = JSON.parse(data);
} catch (error) {
  console.error('Failed to load components data:', error);
  componentsData = [];
}

// Create MCP server
const server = new Server(
  {
    name: 'bui-ui-kit-mcp-server',
    version: '0.0.1',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Instructions tool - teaches the agent about the UI kit
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'instructions',
        description:
          'Get instructions on how to use this UI kit and its MCP tools. This teaches the agent that this is a UI kit and how to use the tools to discover and use components.',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      {
        name: 'list_components',
        description:
          'List all available components in the UI kit. Returns an array of component names.',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      {
        name: 'get_component',
        description:
          'Get detailed information about a specific component, including its tag name, properties, attributes, types, default values, and valid values.',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description:
                'The name of the component (e.g., "Button", "Input", "BitcoinQrDisplay")',
            },
          },
          required: ['name'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'instructions': {
        return {
          content: [
            {
              type: 'text',
              text: `# BUI UI Kit - Component Information

This is a UI kit based on web components. All components are custom HTML elements that can be used in any web framework or vanilla HTML.

## How to Use These Tools

1. **list_components**: Use this tool first to get a list of all available components. It returns component names like "Button", "Input", "BitcoinQrDisplay", etc.

2. **get_component**: After finding a component you want to use, call this tool with the component name to get detailed information including:
   - The HTML tag name (e.g., "bui-button", "bui-input")
   - All properties/attributes the component supports
   - Property types (String, Boolean, Number)
   - Default values (if any)
   - Valid values for properties that have restricted options
   - Whether properties are required or optional

3. **Assembling Components**: Once you have component details from get_component, you can assemble the component using the tag name and attributes. For example:
   - Basic: \`<bui-button></bui-button>\`
   - With attributes: \`<bui-button style-type="outline" size="small"></bui-button>\`
   - With properties: \`<bui-button styleType="outline" size="small"></bui-button>\`

## Component Structure

Each component has:
- A **tag name** (kebab-case, e.g., "bui-button")
- **Properties** that can be set as HTML attributes (kebab-case) or JavaScript properties (camelCase)
- **Types** for each property (String, Boolean, Number)
- **Default values** when applicable
- **Valid values** for properties with restricted options (e.g., styleType: ["filled", "outline", "free"])

## Example Workflow

1. Call \`list_components\` to see all available components
2. Call \`get_component\` with name="Button" to get Button details
3. Use the returned tag name and properties to construct: \`<bui-button style-type="filled" size="default" label="Click me"></bui-button>\`

Start by calling list_components to see what's available!`,
            },
          ],
        };
      }

      case 'list_components': {
        const componentNames = componentsData.map((c) => c.name);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(componentNames, null, 2),
            },
          ],
        };
      }

      case 'get_component': {
        const componentName = args?.name;
        if (!componentName) {
          return {
            content: [
              {
                type: 'text',
                text: 'Error: Component name is required',
              },
            ],
            isError: true,
          };
        }

        const component = componentsData.find(
          (c) => c.name.toLowerCase() === componentName.toLowerCase()
        );

        if (!component) {
          return {
            content: [
              {
                type: 'text',
                text: `Error: Component "${componentName}" not found. Use list_components to see available components.`,
              },
            ],
            isError: true,
          };
        }

        // Format component information
        const info = {
          name: component.name,
          className: component.className,
          tagName: component.tagName,
          properties: component.properties.map((prop) => ({
            name: prop.name,
            attribute: prop.attribute,
            type: prop.type,
            required: prop.required,
            defaultValue: prop.defaultValue,
            validValues: prop.validValues,
            reflect: prop.reflect,
          })),
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(info, null, 2),
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: 'text',
              text: `Unknown tool: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('BUI UI Kit MCP server running on stdio');
}

main().catch(console.error);
