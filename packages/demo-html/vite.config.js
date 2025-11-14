import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // No aliases needed; rely on PNPM workspace resolution for local packages
  optimizeDeps: {
    include: ['lit']
  }
})


