import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@sbddesign/bui-ui': '../../ui',
      '@sbddesign/bui-tokens': '../../tokens',
    },
  },
  optimizeDeps: {
    include: ['lit'],
  },
});
