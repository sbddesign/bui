FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./
COPY pnpm-workspace.yaml ../

# Install pnpm
RUN npm install -g pnpm@9.15.2

# Copy workspace root for pnpm workspace
COPY ../../package.json ../../
COPY ../../pnpm-workspace.yaml ../../

# Copy MCP server package
COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate component data
RUN pnpm generate-data

# Build TypeScript
RUN pnpm build

# Expose port
EXPOSE 3000

# Run the HTTP server wrapper
CMD ["node", "dist/http-server.js"]
