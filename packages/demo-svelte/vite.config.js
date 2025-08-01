import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@bui/ui': '../../ui',
      '@bui/tokens': '../../tokens'
    }
  },
  optimizeDeps: {
    include: ['lit']
  }
})
