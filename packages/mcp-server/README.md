# @sbddesign/bui-mcp-server

MCP (Model Context Protocol) server for the Bitcoin UI Kit. This server allows AI agents to discover and learn about BUI components.

## Overview

This package provides an MCP server that can be deployed to Netlify Edge Functions. It exposes three tools:

- **instructions**: Teaches the agent about the UI kit and how to use the tools
- **list_components**: Lists all available components in the UI kit
- **get_component**: Gets detailed information about a specific component

## Deployment

### Netlify

1. Connect this package to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `public`
4. Deploy!

The MCP endpoint will be available at `https://your-site.netlify.app/mcp`

### Local Development

```bash
# Install dependencies
pnpm install

# Generate component data
pnpm run generate-data

# Run locally with Netlify CLI
pnpm run dev
```

## MCP Protocol

This server implements the [Model Context Protocol](https://modelcontextprotocol.io/) specification.

### Endpoint

```
POST /mcp
Content-Type: application/json
```

### Initialize

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "clientInfo": {
      "name": "my-client",
      "version": "1.0.0"
    }
  }
}
```

### List Tools

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list",
  "params": {}
}
```

### Call a Tool

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "get_component",
    "arguments": {
      "name": "Button"
    }
  }
}
```

## Data Generation

Component data is pre-generated from the UI package source files. The generation script parses TypeScript component files and extracts:

- Component name and tag name
- Properties with types, defaults, and allowed values
- Slots
- Events
- Example code snippets

To regenerate the data:

```bash
pnpm run generate-data
```

This is automatically run during `pnpm build:all` in the root workspace.
