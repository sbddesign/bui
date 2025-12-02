/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    {
      name: '@storybook/addon-mcp',
      options: {
        toolsets: {
          dev: true, // Tools for story URL retrieval and UI building instructions (default: true)
          docs: true, // Tools for component manifest and documentation (default: true, requires experimental feature)
        },
        experimentalFormat: 'markdown', // Output format: 'markdown' (default) or 'xml'
      },
    },
  ],
  features: {
    experimentalComponentsManifest: true,
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  staticDirs: ['../stories/assets'],
  viteFinal: async (config) => {
    // Ensure CSS files are handled properly
    if (config.css) {
      config.css.postcss = config.css.postcss || {};
    }
    return config;
  },
};
export default config;
