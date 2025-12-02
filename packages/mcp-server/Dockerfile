FROM node:20-slim

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.15.2

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy workspace packages
COPY packages/mcp-server ./packages/mcp-server
COPY packages/ui ./packages/ui

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate component data
RUN pnpm --filter @sbddesign/bui-mcp-server build

# Set working directory to mcp-server
WORKDIR /app/packages/mcp-server

# Run the MCP server
CMD ["node", "src/index.js"]
