export interface ComponentAttribute {
  property: string;
  attribute: string;
  type: string;
  reflects: boolean;
  required: boolean;
  default?: string | number | boolean | null;
  values?: string[];
  notes?: string;
}

export interface ComponentMeta {
  name: string;
  tagName: string;
  className: string;
  source: string;
  description: string;
  attributes: ComponentAttribute[];
  events: string[];
}

export interface ComponentDataset {
  generatedAt: string;
  components: ComponentMeta[];
}

export type ToolContent =
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'json';
      json: unknown;
    };

export interface ToolResult {
  content: ToolContent[];
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
    additionalProperties?: boolean;
  };
}

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: number | string | null;
  method: string;
  params?: unknown;
}

export interface JsonRpcSuccess {
  jsonrpc: '2.0';
  id: number | string | null;
  result: unknown;
}

export interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

export interface JsonRpcErrorResponse {
  jsonrpc: '2.0';
  id: number | string | null;
  error: JsonRpcError;
}

export type JsonRpcResponse = JsonRpcSuccess | JsonRpcErrorResponse;
