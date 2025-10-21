/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
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
