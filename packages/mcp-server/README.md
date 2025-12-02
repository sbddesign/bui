# BUI UI Kit MCP Server

MCP (Model Context Protocol) server that provides information about BUI UI Kit web components.

## Overview

This MCP server allows AI agents to discover and learn about all components in the BUI UI Kit. It provides tools to:
- Get instructions on how to use the UI kit
- List all available components
- Get detailed information about specific components (tag names, properties, attributes, types, defaults, etc.)

## Development

### Generate Component Data

```bash
pnpm generate-data
```

This script extracts component metadata from the UI package TypeScript files and generates `data/components.json`.

### Build

```bash
pnpm build
```

This will generate the component data and compile TypeScript.

## Deployment

### Netlify Edge Functions

The server is configured to run on Netlify Edge Functions. The Edge Function is located at `netlify/edge-functions/mcp-handler/index.ts`.

**Configuration**: See `netlify.toml` for Netlify settings.

**Endpoint**: The MCP server will be available at `/mcp` when deployed.

**Note**: The component data JSON file needs to be accessible to the Edge Function. Ensure `data/components.json` is included in the deployment.

### Docker/Render Alternative

If Netlify Edge Functions are not suitable, you can deploy the stdio-based MCP server using Docker:

1. Build the Docker image
2. Run the container
3. Connect via stdio or HTTP wrapper

## MCP Tools

### `instructions`

Provides instructions on how to use the UI kit and the available tools.

### `list_components`

Returns an array of all available component names.

### `get_component`

Get detailed information about a specific component.

**Parameters**:
- `name` (string, required): The component name (e.g., "Button", "Input")

**Returns**: Component details including:
- Tag name (e.g., `bui-button`)
- All properties/attributes
- Property types and allowed values
- Default values
- Required/optional status

## Usage Example

```javascript
// List all components
{ method: 'tools/call', params: { name: 'list_components', arguments: {} } }

// Get Button component details
{ method: 'tools/call', params: { name: 'get_component', arguments: { name: 'Button' } } }
```
