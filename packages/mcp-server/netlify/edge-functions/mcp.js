/**
 * MCP Server Edge Function for Bitcoin UI Kit
 *
 * This implements the Model Context Protocol (MCP) specification for serving
 * information about BUI components to AI agents.
 *
 * MCP Protocol: https://modelcontextprotocol.io/
 */

import componentData from '../../data/components.json' with { type: 'json' };

// MCP Protocol version
const PROTOCOL_VERSION = '2024-11-05';
const SERVER_NAME = 'bui-component-server';
const SERVER_VERSION = '0.0.1';

/**
 * Available MCP tools
 */
const TOOLS = [
  {
    name: 'instructions',
    description:
      'Get instructions on how to use the Bitcoin UI Kit. This teaches you about the UI kit and how to use the other tools to discover and use components.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'list_components',
    description:
      'Get a list of all available components in the Bitcoin UI Kit. Returns component names that can be used with get_component to get detailed information.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_component',
    description:
      'Get detailed information about a specific component including its tag name, properties, slots, events, and usage examples.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description:
            'The name of the component to get details for (e.g., "Button", "Input", "BitcoinQrDisplay"). Use list_components to see available names.',
        },
      },
      required: ['name'],
    },
  },
];

/**
 * Handle MCP initialize request
 */
function handleInitialize(params) {
  return {
    protocolVersion: PROTOCOL_VERSION,
    serverInfo: {
      name: SERVER_NAME,
      version: SERVER_VERSION,
    },
    capabilities: {
      tools: {},
    },
  };
}

/**
 * Handle MCP tools/list request
 */
function handleToolsList() {
  return {
    tools: TOOLS,
  };
}

/**
 * Execute the instructions tool
 */
function executeInstructions() {
  const instructions = componentData.instructions;

  return {
    content: [
      {
        type: 'text',
        text: `# Bitcoin UI Kit (BUI) Instructions

## Overview
${instructions.overview}

## Installation
\`\`\`bash
${instructions.installation}
\`\`\`

## Setup
${instructions.setup}

## Font Setup
\`\`\`html
${instructions.fontSetup}
\`\`\`

## CSS Tokens Import
\`\`\`css
${instructions.tokensImport}
\`\`\`

## Component Import
\`\`\`javascript
${instructions.componentImport}
\`\`\`

## How to Use These Tools

1. **list_components**: Call this to see all available components
2. **get_component**: Pass a component name to get its details

Example workflow:
- Call \`list_components\` to see available components like "Button", "Input", etc.
- Call \`get_component\` with \`{ "name": "Button" }\` to get details
- Use the returned \`tagName\` (e.g., "bui-button") to create the HTML element
- Set attributes based on the returned properties
- Use slots to provide custom content

## Assembling Components

From a get_component response, you can assemble a component like this:

Given: \`{ tagName: 'bui-button', properties: [{ name: 'styleType', attribute: 'style-type', options: ['filled', 'outline', 'free'] }, ...] }\`

Create: \`<bui-button style-type="outline">Click me</bui-button>\`

For components with slots (like icons):
\`\`\`html
<bui-button content="label+icon" style-type="filled" label="Continue">
  <bui-arrow-right-outline-lg slot="icon"></bui-arrow-right-outline-lg>
</bui-button>
\`\`\`
`,
      },
    ],
  };
}

/**
 * Execute the list_components tool
 */
function executeListComponents() {
  const components = componentData.components.map((c) => ({
    name: c.name.replace('Bui', ''),
    tagName: c.tagName,
    description: c.description,
  }));

  return {
    content: [
      {
        type: 'text',
        text: `# Available Components\n\n${components
          .map((c) => `- **${c.name}** (\`${c.tagName}\`): ${c.description}`)
          .join('\n')}

## Usage

Call \`get_component\` with any component name above (e.g., "Button", "Input") to get detailed information about properties, slots, and examples.`,
      },
    ],
  };
}

/**
 * Execute the get_component tool
 */
function executeGetComponent(args) {
  const { name } = args;

  if (!name) {
    return {
      content: [
        {
          type: 'text',
          text: 'Error: Component name is required. Use list_components to see available components.',
        },
      ],
      isError: true,
    };
  }

  // Find the component (case-insensitive, with or without Bui prefix)
  const normalizedName = name.toLowerCase().replace('bui', '');
  const component = componentData.components.find((c) => {
    const cName = c.name.toLowerCase().replace('bui', '');
    return cName === normalizedName || c.name.toLowerCase() === name.toLowerCase();
  });

  if (!component) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: Component "${name}" not found. Use list_components to see available components.`,
        },
      ],
      isError: true,
    };
  }

  // Format the component information
  const propsTable =
    component.properties.length > 0
      ? `### Properties

| Property | Attribute | Type | Default | Options | Description |
|----------|-----------|------|---------|---------|-------------|
${component.properties
  .map((p) => {
    const options = p.options ? p.options.map((o) => `\`${o}\``).join(', ') : '-';
    const defaultVal = p.default !== undefined ? `\`${JSON.stringify(p.default)}\`` : '-';
    return `| ${p.name} | ${p.attribute} | ${p.type} | ${defaultVal} | ${options} | ${p.description || '-'} |`;
  })
  .join('\n')}`
      : '### Properties\n\nNo properties.';

  const slotsSection =
    component.slots.length > 0
      ? `### Slots

${component.slots.map((s) => `- **${s.name}**: ${s.description}`).join('\n')}`
      : '';

  const eventsSection =
    component.events.length > 0
      ? `### Events

${component.events.map((e) => `- **${e.name}**: ${e.description}`).join('\n')}`
      : '';

  const examplesSection =
    component.examples.length > 0
      ? `### Examples

${component.examples
  .map(
    (e) => `#### ${e.title}
${e.description}

\`\`\`html
${e.code}
\`\`\``
  )
  .join('\n\n')}`
      : '';

  return {
    content: [
      {
        type: 'text',
        text: `# ${component.name}

**Tag Name:** \`${component.tagName}\`

${component.description}

${propsTable}

${slotsSection}

${eventsSection}

${examplesSection}

## Quick Start

\`\`\`html
<${component.tagName}></${component.tagName}>
\`\`\`

## Import

\`\`\`javascript
import '@sbddesign/bui-ui/${component.tagName.replace('bui-', '')}.js';
\`\`\`
`,
      },
    ],
  };
}

/**
 * Handle MCP tools/call request
 */
function handleToolsCall(params) {
  const { name, arguments: args = {} } = params;

  switch (name) {
    case 'instructions':
      return executeInstructions();
    case 'list_components':
      return executeListComponents();
    case 'get_component':
      return executeGetComponent(args);
    default:
      return {
        content: [
          {
            type: 'text',
            text: `Error: Unknown tool "${name}". Available tools: instructions, list_components, get_component`,
          },
        ],
        isError: true,
      };
  }
}

/**
 * Create a JSON-RPC response
 */
function createResponse(id, result) {
  return {
    jsonrpc: '2.0',
    id,
    result,
  };
}

/**
 * Create a JSON-RPC error response
 */
function createErrorResponse(id, code, message) {
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message,
    },
  };
}

/**
 * Handle incoming MCP requests
 */
function handleMcpRequest(request) {
  const { method, params, id } = request;

  switch (method) {
    case 'initialize':
      return createResponse(id, handleInitialize(params));
    case 'tools/list':
      return createResponse(id, handleToolsList());
    case 'tools/call':
      return createResponse(id, handleToolsCall(params));
    case 'notifications/initialized':
      // This is a notification, no response needed
      return null;
    default:
      return createErrorResponse(id, -32601, `Method not found: ${method}`);
  }
}

/**
 * Netlify Edge Function handler
 */
export default async function handler(request, context) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only accept POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    const body = await request.json();

    // Handle batch requests
    if (Array.isArray(body)) {
      const responses = body.map((req) => handleMcpRequest(req)).filter((res) => res !== null);

      return new Response(JSON.stringify(responses), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Handle single request
    const response = handleMcpRequest(body);

    if (response === null) {
      // Notification, return 204 No Content
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('MCP Server Error:', error);
    return new Response(
      JSON.stringify(createErrorResponse(null, -32700, 'Parse error: ' + error.message)),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

/**
 * Netlify Edge Function config
 */
export const config = {
  path: '/mcp',
};
