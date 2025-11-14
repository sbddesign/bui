import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // No aliases needed; rely on PNPM workspace resolution for local packages
  optimizeDeps: {
    include: ['lit'],
  },
});
