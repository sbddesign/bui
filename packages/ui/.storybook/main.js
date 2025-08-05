

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "staticDirs": ["../public"],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/web-components-vite",
    "options": {}
  },
  "viteFinal": async (config) => {
    // Ensure CSS files are handled properly
    if (config.css) {
      config.css.postcss = config.css.postcss || {};
    }
    
    // Handle WASM files properly
    config.assetsInclude = config.assetsInclude || [];
    config.assetsInclude.push('**/*.wasm');
    
    // Add WASM plugin support
    config.plugins = config.plugins || [];
    config.plugins.push({
      name: 'wasm-content-type-plugin',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.endsWith('.wasm')) {
            res.setHeader('Content-Type', 'application/wasm');
          }
          next();
        });
      },
    });
    
    return config;
  }
};
export default config;