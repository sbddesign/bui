# BUI UI Kit MCP Server

MCP (Model Context Protocol) server that provides information about BUI UI Kit components.

## Overview

This MCP server allows AI agents to discover and learn about all components in the BUI UI Kit. It provides tools to:

- Get instructions on how to use the UI kit
- List all available components
- Get detailed information about specific components (tag names, properties, attributes, types, default values, valid values)

## Setup

The component data is automatically generated during the build process. Run:

```bash
pnpm build:all
```

This will generate `data/components.json` with metadata extracted from all component TypeScript files.

## MCP Tools

### `instructions`

Provides instructions on how to use this UI kit and its tools. This teaches the agent about the UI kit structure and how to discover and use components.

### `list_components`

Returns a list of all available component names (e.g., "Button", "Input", "BitcoinQrDisplay").

### `get_component`

Get detailed information about a specific component. Requires a `name` parameter.

**Parameters:**
- `name` (string, required): The component name (e.g., "Button", "Input")

**Returns:**
- Component name and class name
- HTML tag name (e.g., "bui-button")
- All properties with:
  - Property name and HTML attribute name
  - Type (String, Boolean, Number)
  - Required/optional status
  - Default value (if any)
  - Valid values (if restricted to specific options)
  - Whether the property reflects to attributes

## Deployment

This MCP server is designed to run as a Docker container and can be deployed on Render.

### Docker

Build the Docker image:

```bash
docker build -t bui-mcp-server .
```

Run the container:

```bash
docker run -it bui-mcp-server
```

### Render

The `render.yaml` file contains configuration for deploying to Render. The service will:
1. Install dependencies
2. Generate component data
3. Start the MCP server

## Local Development

To run the MCP server locally:

```bash
cd packages/mcp-server
pnpm install
pnpm build  # Generate component data
pnpm start  # Start the MCP server
```

The server communicates via stdio, so it's typically used with MCP clients that support stdio transport.

## Data Generation

Component metadata is extracted from TypeScript source files in the `packages/ui` directory. The generation script:

1. Parses component class definitions
2. Extracts static properties
3. Finds default values from constructors
4. Discovers valid values from const arrays used for validation
5. Extracts tag names from `customElements.define` calls

The generated data is stored in `data/components.json`.
