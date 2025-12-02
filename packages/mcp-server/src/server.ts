import { findComponent, getDatasetMetadata, listComponents } from './data.js';
import type {
  ComponentMeta,
  JsonRpcErrorResponse,
  JsonRpcRequest,
  JsonRpcResponse,
  ToolDefinition,
  ToolResult,
} from './types.js';

const SERVER_INFO = {
  name: 'bui-mcp-server',
  version: '0.0.1',
};

const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    name: 'instructions',
    description: 'Explain how to explore and embed BUI web components.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
      additionalProperties: false,
    },
  },
  {
    name: 'list_components',
    description: 'List every available BUI web component with its tag name.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
      additionalProperties: false,
    },
  },
  {
    name: 'get_component',
    description: 'Get tag, attributes, defaults, and sample usage for a component.',
    inputSchema: {
      type: 'object',
      properties: {
        identifier: {
          type: 'string',
          description: 'Display name (e.g. "Button") or tag (e.g. "bui-button").',
        },
      },
      required: ['identifier'],
      additionalProperties: false,
    },
  },
];

const toolHandlers: Record<
  string,
  (args: Record<string, unknown>) => Promise<ToolResult> | ToolResult
> = {
  instructions: () => {
    const catalog = getDatasetMetadata();
    const text = [
      'This server exposes the BUI web components catalog.',
      'Use list_components to discover components, then call get_component with the display name or tag (for example: "Button" or "bui-button").',
      'Each component response includes tag names, supported attributes with types/defaults, and a starter HTML snippet you can copy into any web project.',
      `Dataset contains ${catalog.totalComponents} components generated on ${catalog.generatedAt}.`,
    ].join(' ');
    return { content: [{ type: 'text', text }] };
  },
  list_components: () => {
    const components = listComponents().map((component) => ({
      name: component.name,
      tagName: component.tagName,
      description: component.description,
      attributes: component.attributes.map((attr) => ({
        property: attr.property,
        attribute: attr.attribute,
        type: attr.type,
      })),
    }));
    return {
      content: [
        {
          type: 'text',
          text: `${components.length} components available. Check the JSON payload for structured data.`,
        },
        {
          type: 'json',
          json: {
            generatedAt: getDatasetMetadata().generatedAt,
            components,
          },
        },
      ],
    };
  },
  get_component: (args) => {
    const identifier = extractIdentifier(args);
    const component = identifier ? findComponent(identifier) : undefined;
    if (!identifier || !component) {
      throw new ToolUsageError(`Component not found for identifier "${identifier ?? ''}".`);
    }

    const sampleUsage = buildSampleUsage(component);

    return {
      content: [
        {
          type: 'text',
          text: `${component.name} uses the <${component.tagName}> tag. See JSON for full attribute reference and sample usage.`,
        },
        {
          type: 'json',
          json: {
            component,
            sampleUsage,
          },
        },
      ],
    };
  },
};

class ToolUsageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ToolUsageError';
  }
}

function extractIdentifier(args: Record<string, unknown>): string | undefined {
  const keys: Array<'identifier' | 'name' | 'tag' | 'component'> = [
    'identifier',
    'name',
    'tag',
    'component',
  ];
  for (const key of keys) {
    const value = args[key];
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed) {
        return trimmed;
      }
    }
  }
  return undefined;
}

function buildSampleUsage(component: ComponentMeta): string {
  const attributeParts: string[] = [];

  for (const attribute of component.attributes) {
    const attrName = attribute.attribute;
    if (attribute.type === 'boolean') {
      if (attribute.default === true) {
        attributeParts.push(attrName);
      }
      continue;
    }

    if (attribute.default === undefined || attribute.default === null) {
      continue;
    }

    attributeParts.push(`${attrName}="${String(attribute.default)}"`);
  }

  const attrs = attributeParts.length ? ` ${attributeParts.join(' ')}` : '';
  return `<${component.tagName}${attrs}></${component.tagName}>`;
}

function createErrorResponse(
  id: number | string | null,
  code: number,
  message: string,
  data?: unknown
): JsonRpcErrorResponse {
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message,
      ...(data === undefined ? {} : { data }),
    },
  };
}

export async function handleJsonRpcRequest(request: JsonRpcRequest): Promise<JsonRpcResponse> {
  const id = request.id ?? null;

  if (request.jsonrpc !== '2.0' || typeof request.method !== 'string') {
    return createErrorResponse(id, -32600, 'Invalid request.');
  }

  switch (request.method) {
    case 'ping':
      return { jsonrpc: '2.0', id, result: { now: new Date().toISOString() } };
    case 'initialize':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '0.1.0',
          serverInfo: SERVER_INFO,
          capabilities: {
            tools: {},
          },
        },
      };
    case 'tools/list':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          tools: TOOL_DEFINITIONS,
        },
      };
    case 'tools/call':
      return handleToolsCall(id, request.params);
    default:
      return createErrorResponse(id, -32601, `Method ${request.method} not supported.`);
  }
}

async function handleToolsCall(
  id: number | string | null,
  params: unknown
): Promise<JsonRpcResponse> {
  if (
    !params ||
    typeof params !== 'object' ||
    Array.isArray(params) ||
    typeof (params as Record<string, unknown>).name !== 'string'
  ) {
    return createErrorResponse(id, -32602, 'tools/call requires a tool name.');
  }

  const { name, arguments: args = {} } = params as {
    name: string;
    arguments?: Record<string, unknown>;
  };
  const handler = toolHandlers[name];
  if (!handler) {
    return createErrorResponse(id, -32601, `Unknown tool: ${name}`);
  }

  try {
    const result = await handler(args ?? {});
    return {
      jsonrpc: '2.0',
      id,
      result,
    };
  } catch (error) {
    if (error instanceof ToolUsageError) {
      return createErrorResponse(id, -32002, error.message);
    }
    console.error('Tool execution failed', error);
    return createErrorResponse(id, -32603, 'Tool execution failed.', {
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

export function buildBatchResponse(
  payload: JsonRpcRequest | JsonRpcRequest[]
): Promise<JsonRpcResponse | JsonRpcResponse[]> {
  if (Array.isArray(payload)) {
    return Promise.all(payload.map((request) => handleJsonRpcRequest(request)));
  }
  return handleJsonRpcRequest(payload);
}
