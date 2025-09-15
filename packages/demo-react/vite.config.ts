import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // No aliases needed; rely on PNPM workspace resolution for local packages
  optimizeDeps: {
    include: ['lit']
  }
})
