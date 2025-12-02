import { buildBatchResponse } from './server.js';
import type { JsonRpcRequest } from './types.js';

const jsonHeaders = {
  'content-type': 'application/json',
  'access-control-allow-origin': '*',
  'access-control-allow-headers': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: jsonHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: jsonHeaders,
    });
  }

  try {
    const payload = (await request.json()) as JsonRpcRequest | JsonRpcRequest[];
    const response = await buildBatchResponse(payload);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        error: { code: -32700, message: 'Failed to parse request payload.', data: { message } },
      }),
      {
        status: 400,
        headers: jsonHeaders,
      }
    );
  }
}

export const config = {
  path: '/mcp/*',
};
