import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@sbddesign/bui-ui': '../../ui',
      '@sbddesign/bui-tokens': '../../tokens'
    }
  },
  optimizeDeps: {
    include: ['lit']
  }
})
