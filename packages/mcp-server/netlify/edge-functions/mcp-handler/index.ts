// Netlify Edge Function for MCP Server
// This implements MCP over HTTP

import type { Context } from 'https://edge.netlify.com';

// Component data will be embedded at build time
// For now, we'll fetch it from a static file or embed it

async function loadComponentData() {
  // Embedded component data
  return {
  "components": [
    {
      "name": "AmountOptionTile",
      "className": "BuiAmountOptionTile",
      "tagName": "bui-amount-option-tile",
      "properties": {
        "emoji": {
          "type": "string",
          "attribute": "emoji",
          "reflect": true,
          "required": false,
          "defaultValue": "🔥"
        },
        "message": {
          "type": "string",
          "attribute": "message",
          "reflect": true,
          "required": false,
          "defaultValue": "Incredible"
        },
        "showEmoji": {
          "type": "boolean",
          "attribute": "show-emoji",
          "reflect": true,
          "required": false,
          "defaultValue": true
        },
        "showMessage": {
          "type": "boolean",
          "attribute": "show-message",
          "reflect": true,
          "required": false,
          "defaultValue": true
        },
        "showSecondaryCurrency": {
          "type": "boolean",
          "attribute": "show-secondary-currency",
          "reflect": true,
          "required": false,
          "defaultValue": true
        },
        "bitcoinFirst": {
          "type": "boolean",
          "attribute": "bitcoin-first",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "custom": {
          "type": "boolean",
          "attribute": "custom",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "amountDefined": {
          "type": "boolean",
          "attribute": "amount-defined",
          "reflect": true,
          "required": false,
          "defaultValue": true
        },
        "selected": {
          "type": "boolean",
          "attribute": "selected",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "primaryAmount": {
          "type": "number",
          "attribute": "primary-amount",
          "reflect": true,
          "required": false,
          "defaultValue": 1
        },
        "primarySymbol": {
          "type": "string",
          "attribute": "primary-symbol",
          "reflect": true,
          "required": false,
          "defaultValue": "$"
        },
        "secondaryAmount": {
          "type": "number",
          "attribute": "secondary-amount",
          "reflect": true,
          "required": false,
          "defaultValue": 1000
        },
        "secondarySymbol": {
          "type": "string",
          "attribute": "secondary-symbol",
          "reflect": true,
          "required": false,
          "defaultValue": "₿"
        },
        "showEstimate": {
          "type": "boolean",
          "attribute": "show-estimate",
          "reflect": true,
          "required": false,
          "defaultValue": true
        },
        "primaryTextSize": {
          "type": "string",
          "attribute": "primary-text-size",
          "reflect": true,
          "required": false,
          "defaultValue": "6xl"
        },
        "secondaryTextSize": {
          "type": "string",
          "attribute": "secondary-text-size",
          "reflect": true,
          "required": false,
          "defaultValue": "2xl"
        },
        "detail": {
          "type": "string",
          "attribute": "detail",
          "reflect": false,
          "required": true
        }
      }
    },
    {
      "name": "Avatar",
      "className": "BuiAvatar",
      "tagName": "bui-avatar",
      "properties": {
        "imageUrl": {
          "type": "string",
          "attribute": "image-url",
          "reflect": false,
          "required": false
        },
        "imageUrl2x": {
          "type": "string",
          "attribute": "image-url-2x",
          "reflect": false,
          "required": false
        },
        "text": {
          "type": "string",
          "attribute": "text",
          "reflect": false,
          "required": false
        },
        "showInitial": {
          "type": "boolean",
          "attribute": "show-initial",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "converter": {
          "type": "string",
          "attribute": "converter",
          "reflect": false,
          "required": true
        },
        "size": {
          "type": "string",
          "attribute": "size",
          "reflect": true,
          "required": false,
          "allowedValues": [
            "small",
            "medium",
            "large"
          ],
          "defaultValue": "medium"
        }
      }
    },
    {
      "name": "BitcoinQrDisplay",
      "className": "BuiBitcoinQrDisplay",
      "tagName": "bui-bitcoin-qr-display",
      "properties": {
        "address": {
          "type": "string",
          "attribute": "address",
          "reflect": false,
          "required": false,
          "defaultValue": ""
        },
        "lightning": {
          "type": "string",
          "attribute": "lightning",
          "reflect": false,
          "required": false,
          "defaultValue": ""
        },
        "option": {
          "type": "string",
          "attribute": "option",
          "reflect": true,
          "required": false,
          "allowedValues": [
            "unified",
            "lightning",
            "onchain"
          ],
          "defaultValue": "unified"
        },
        "selector": {
          "type": "string",
          "attribute": "selector",
          "reflect": true,
          "required": false,
          "allowedValues": [
            "dots",
            "toggle"
          ],
          "defaultValue": "dots"
        },
        "size": {
          "type": "number",
          "attribute": "size",
          "reflect": false,
          "required": false,
          "defaultValue": 332
        },
        "showImage": {
          "type": "boolean",
          "attribute": "showImage",
          "reflect": true,
          "required": false,
          "defaultValue": true
        },
        "dotType": {
          "type": "string",
          "attribute": "dotType",
          "reflect": true,
          "required": false,
          "defaultValue": "dot"
        },
        "dotColor": {
          "type": "string",
          "attribute": "dotColor",
          "reflect": true,
          "required": false,
          "defaultValue": "#000000"
        },
        "unifiedImage": {
          "type": "string",
          "attribute": "unifiedImage",
          "reflect": false,
          "required": false,
          "defaultValue": ""
        },
        "lightningImage": {
          "type": "string",
          "attribute": "lightningImage",
          "reflect": false,
          "required": false,
          "defaultValue": ""
        },
        "onchainImage": {
          "type": "string",
          "attribute": "onchainImage",
          "reflect": false,
          "required": false,
          "defaultValue": ""
        },
        "copyOnTap": {
          "type": "boolean",
          "attribute": "copyOnTap",
          "reflect": true,
          "required": false,
          "defaultValue": true
        },
        "placeholder": {
          "type": "boolean",
          "attribute": "placeholder",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "error": {
          "type": "boolean",
          "attribute": "error",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "errorMessage": {
          "type": "string",
          "attribute": "errorMessage",
          "reflect": false,
          "required": false,
          "defaultValue": "Sorry, an error occurred. Try again later."
        },
        "complete": {
          "type": "boolean",
          "attribute": "complete",
          "reflect": true,
          "required": false,
          "defaultValue": false
        }
      }
    },
    {
      "name": "BitcoinValue",
      "className": "BuiBitcoinValue",
      "tagName": "bui-bitcoin-value",
      "properties": {
        "format": {
          "type": "string",
          "attribute": "format",
          "reflect": true,
          "required": false,
          "allowedValues": [
            "sats",
            "BTC",
            "bip177"
          ],
          "defaultValue": "bip177"
        },
        "truncated": {
          "type": "boolean",
          "attribute": "truncated",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "amount": {
          "type": "number",
          "attribute": "amount",
          "reflect": true,
          "required": false,
          "defaultValue": 0
        },
        "symbolPosition": {
          "type": "string",
          "attribute": "symbol-position",
          "reflect": true,
          "required": false,
          "defaultValue": "undefined"
        },
        "satcomma": {
          "type": "boolean",
          "attribute": "satcomma",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "size": {
          "type": "string",
          "attribute": "size",
          "reflect": true,
          "required": false,
          "allowedValues": [
            "base",
            "lg",
            "xl",
            "2xl",
            "3xl",
            "4xl",
            "5xl",
            "6xl",
            "7xl",
            "8xl",
            "9xl"
          ],
          "defaultValue": "default"
        },
        "showEstimate": {
          "type": "boolean",
          "attribute": "show-estimate",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "textSize": {
          "type": "string",
          "attribute": "text-size",
          "reflect": true,
          "required": false,
          "defaultValue": "base"
        }
      }
    },
    {
      "name": "Button",
      "className": "BuiButton",
      "tagName": "bui-button",
      "properties": {
        "content": {
          "type": "string",
          "attribute": "content",
          "reflect": false,
          "required": false,
          "allowedValues": [
            "label",
            "icon",
            "label+icon",
            "icon+label"
          ],
          "defaultValue": "label"
        },
        "styleType": {
          "type": "string",
          "attribute": "style-type",
          "reflect": false,
          "required": false,
          "defaultValue": "filled"
        },
        "size": {
          "type": "string",
          "attribute": "size",
          "reflect": false,
          "required": false,
          "allowedValues": [
            "default",
            "small",
            "large"
          ],
          "defaultValue": "default"
        },
        "disabled": {
          "type": "boolean",
          "attribute": "disabled",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "label": {
          "type": "string",
          "attribute": "label",
          "reflect": false,
          "required": false,
          "defaultValue": "Label"
        },
        "cluster": {
          "type": "string",
          "attribute": "cluster",
          "reflect": false,
          "required": false
        },
        "wide": {
          "type": "boolean",
          "attribute": "wide",
          "reflect": true,
          "required": false,
          "defaultValue": false
        }
      }
    },
    {
      "name": "ButtonCluster",
      "className": "BuiButtonCluster",
      "tagName": "bui-button-cluster",
      "properties": {
        "direction": {
          "type": "string",
          "attribute": "direction",
          "reflect": false,
          "required": false,
          "allowedValues": [
            "horizontal",
            "vertical"
          ],
          "defaultValue": "horizontal"
        }
      }
    },
    {
      "name": "Input",
      "className": "BuiInput",
      "tagName": "bui-input",
      "properties": {
        "mood": {
          "type": "string",
          "attribute": "mood",
          "reflect": true,
          "required": false,
          "allowedValues": [
            "neutral",
            "caution",
            "danger",
            "success"
          ],
          "defaultValue": "neutral"
        },
        "size": {
          "type": "string",
          "attribute": "size",
          "reflect": true,
          "required": false,
          "allowedValues": [
            "large",
            "small"
          ],
          "defaultValue": "large"
        },
        "label": {
          "type": "string",
          "attribute": "label",
          "reflect": true,
          "required": false,
          "defaultValue": "Label"
        },
        "value": {
          "type": "string",
          "attribute": "value",
          "reflect": true,
          "required": false,
          "defaultValue": ""
        },
        "placeholder": {
          "type": "string",
          "attribute": "placeholder",
          "reflect": true,
          "required": false,
          "defaultValue": ""
        },
        "showLabel": {
          "type": "boolean",
          "attribute": "show-label",
          "reflect": true,
          "required": false,
          "defaultValue": true
        },
        "showIconLeft": {
          "type": "boolean",
          "attribute": "show-icon-left",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "showIconRight": {
          "type": "boolean",
          "attribute": "show-icon-right",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "iconRightAction": {
          "type": "string",
          "attribute": "icon-right-action",
          "reflect": false,
          "required": false,
          "defaultValue": ""
        }
      }
    },
    {
      "name": "Message",
      "className": "BuiMessage",
      "tagName": "bui-message",
      "properties": {
        "text": {
          "type": "string",
          "attribute": "text",
          "reflect": false,
          "required": false,
          "defaultValue": "For this small payment, you could save on fees by sending to a Lightning wallet."
        },
        "mood": {
          "type": "string",
          "attribute": "mood",
          "reflect": false,
          "required": false,
          "allowedValues": [
            "neutral",
            "success",
            "caution",
            "danger"
          ],
          "defaultValue": "neutral"
        },
        "showIcon": {
          "type": "boolean",
          "attribute": "show-icon",
          "reflect": true,
          "required": false,
          "defaultValue": true
        },
        "icon": {
          "type": "string",
          "attribute": "icon",
          "reflect": false,
          "required": false,
          "defaultValue": ""
        }
      }
    },
    {
      "name": "MoneyValue",
      "className": "BuiMoneyValue",
      "tagName": "bui-money-value",
      "properties": {
        "symbolPosition": {
          "type": "string",
          "attribute": "symbol-position",
          "reflect": true,
          "required": false,
          "defaultValue": "left"
        },
        "symbol": {
          "type": "string",
          "attribute": "symbol",
          "reflect": true,
          "required": false,
          "allowedValues": [
            "left",
            "right"
          ],
          "defaultValue": "₿"
        },
        "amount": {
          "type": "number",
          "attribute": "amount",
          "reflect": true,
          "required": false,
          "defaultValue": 0
        },
        "truncation": {
          "type": "boolean",
          "attribute": "truncation",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "size": {
          "type": "string",
          "attribute": "size",
          "reflect": true,
          "required": false,
          "allowedValues": [
            "base",
            "lg",
            "xl",
            "2xl",
            "3xl",
            "4xl",
            "5xl",
            "6xl",
            "7xl",
            "8xl",
            "9xl"
          ],
          "defaultValue": "default"
        },
        "satcomma": {
          "type": "boolean",
          "attribute": "satcomma",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "showEstimate": {
          "type": "boolean",
          "attribute": "show-estimate",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "textSize": {
          "type": "string",
          "attribute": "text-size",
          "reflect": true,
          "required": false,
          "defaultValue": "base"
        }
      }
    },
    {
      "name": "NumPad",
      "className": "BuiNumPad",
      "tagName": "bui-numpad",
      "properties": {
        "disabled": {
          "type": "boolean",
          "attribute": "disabled",
          "reflect": true,
          "required": false,
          "defaultValue": false
        }
      }
    },
    {
      "name": "NumPadButton",
      "className": "BuiNumPadButton",
      "tagName": "bui-numpad-button",
      "properties": {
        "number": {
          "type": "string",
          "attribute": "number",
          "reflect": false,
          "required": false,
          "defaultValue": 1
        },
        "content": {
          "type": "string",
          "attribute": "content",
          "reflect": false,
          "required": false,
          "defaultValue": "number"
        },
        "disabled": {
          "type": "boolean",
          "attribute": "disabled",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "ariaLabel": {
          "type": "string",
          "attribute": "aria-label",
          "reflect": true,
          "required": false,
          "defaultValue": "null"
        }
      }
    },
    {
      "name": "OptionDot",
      "className": "BuiOptionDot",
      "tagName": "bui-option-dot",
      "properties": {
        "active": {
          "type": "boolean",
          "attribute": "active",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "converter": {
          "type": "string",
          "attribute": "converter",
          "reflect": false,
          "required": true
        }
      }
    },
    {
      "name": "Toggle",
      "className": "BuiToggle",
      "tagName": "bui-toggle",
      "properties": {
        "active": {
          "type": "boolean",
          "attribute": "active",
          "reflect": true,
          "required": false,
          "defaultValue": false
        },
        "size": {
          "type": "string",
          "attribute": "size",
          "reflect": false,
          "required": false,
          "allowedValues": [
            "big",
            "small"
          ],
          "defaultValue": "big"
        },
        "disabled": {
          "type": "boolean",
          "attribute": "disabled",
          "reflect": true,
          "required": false,
          "defaultValue": false
        }
      }
    }
  ],
  "generatedAt": "2025-12-02T19:49:43.634Z"
};
};
};
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // Handle CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // MCP over HTTP endpoint
  if (url.pathname === '/mcp' && request.method === 'POST') {
    try {
      const body = await request.json();
      const { method, params } = body;

      let result: any;

      if (method === 'tools/list') {
        result = {
          tools: [
            {
              name: 'instructions',
              description:
                'Get instructions on how to use this UI kit. This tool teaches the agent about the BUI UI Kit and how to use the other tools to discover and use components.',
              inputSchema: {
                type: 'object',
                properties: {},
              },
            },
            {
              name: 'list_components',
              description:
                'List all available components in the BUI UI Kit. Returns an array of component names.',
              inputSchema: {
                type: 'object',
                properties: {},
              },
            },
            {
              name: 'get_component',
              description:
                'Get detailed information about a specific component, including its tag name, properties, attributes, types, default values, and whether properties are required.',
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
      } else if (method === 'tools/call') {
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
        } else if (name === 'list_components') {
          const data = await loadComponentData();
          result = {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  data.components.map((c: any) => c.name),
                  null,
                  2
                ),
              },
            ],
          };
        } else if (name === 'get_component') {
          if (!args || typeof args.name !== 'string') {
            throw new Error('Component name is required');
          }

          const data = await loadComponentData();
          const component = data.components.find(
            (c: any) => c.name.toLowerCase() === args.name.toLowerCase()
          );

          if (!component) {
            result = {
              content: [
                {
                  type: 'text',
                  text: `Component "${args.name}" not found. Available components: ${data.components.map((c: any) => c.name).join(', ')}`,
                },
              ],
              isError: true,
            };
          } else {
            // Format component information
            const propertiesInfo = Object.entries(component.properties).map(
              ([propName, prop]: [string, any]) => {
                let info = `- **${propName}** (attribute: \`${prop.attribute}\`)`;
                info += `\n  - Type: ${prop.type}`;
                if (prop.allowedValues) {
                  info += `\n  - Allowed values: ${prop.allowedValues.map((v: string) => `\`${v}\``).join(', ')}`;
                }
                if (prop.defaultValue !== undefined) {
                  info += `\n  - Default: \`${JSON.stringify(prop.defaultValue)}\``;
                }
                info += `\n  - Required: ${prop.required ? 'Yes' : 'No'}`;
                if (prop.reflect) {
                  info += `\n  - Reflects to attribute: Yes`;
                }
                return info;
              }
            );

            const componentInfo = `# ${component.name}

**Tag Name**: \`<${component.tagName}>\`

## Properties

${propertiesInfo.join('\n\n')}

## Usage Example

\`\`\`html
<${component.tagName}${Object.entries(component.properties)
                .filter(([_, p]: [string, any]) => p.defaultValue !== undefined && p.defaultValue !== false && p.defaultValue !== '')
                .slice(0, 2)
                .map(([name, prop]: [string, any]) => {
                  if (prop.type === 'boolean' && prop.defaultValue === true) {
                    return ` ${prop.attribute}`;
                  }
                  return ` ${prop.attribute}="${prop.defaultValue}"`;
                })
                .join('')}></${component.tagName}>
\`\`\`

## Full Property Details (JSON)

\`\`\`json
${JSON.stringify(
              {
                tagName: component.tagName,
                properties: component.properties,
              },
              null,
              2
            )}
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
        } else {
          throw new Error(`Unknown tool: ${name}`);
        }
      } else {
        throw new Error(`Unknown method: ${method}`);
      }

      return new Response(JSON.stringify({ result }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error: any) {
      return new Response(
        JSON.stringify({
          error: {
            code: -32603,
            message: error.message || 'Internal error',
          },
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  }

  return new Response('Not Found', { status: 404 });
};
