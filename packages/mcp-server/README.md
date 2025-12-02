# BUI MCP Server

This package exposes the BUI web component catalog through a Model Context Protocol (MCP) server. It pre-generates structured metadata for every component in `packages/ui` and serves that data over a JSON-RPC endpoint that can run on Netlify Edge Functions.

## Scripts

- `pnpm --filter @sbddesign/bui-mcp generate:data` – rebuilds `generated/components.json` from the latest UI sources
- `pnpm --filter @sbddesign/bui-mcp build` – generates the metadata and compiles the Netlify-ready handler in `dist/`

`pnpm build:all` in the repo root runs this package's build so the data file is always up to date alongside the other packages.

## Deploying to Netlify Edge

1. Run `pnpm build:all` to refresh the generated metadata and compiled handler.
2. Point Netlify at the repo root and keep the provided `netlify.toml` in this folder, or copy its settings into the root `netlify.toml`.
3. The compiled Edge function lives at `packages/mcp-server/dist/bui-mcp.js` and responds on `/mcp/*` per the config.
