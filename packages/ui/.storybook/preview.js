import '../../tokens/lib/tailwindcss/tailwind-theme.css';
import '../tokens.css';

/** @type { import('@storybook/web-components-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' }
        ],
        dynamicTitle: true,
      },
    },
    designSystem: {
      description: 'Design system theme',
      defaultValue: 'bitcoindesign',
      toolbar: {
        title: 'Design System',
        icon: 'paintbrush',
        items: [
          { value: 'bitcoindesign', title: 'Bitcoin Design' },
          { value: 'conduit', title: 'Conduit' },
          { value: 'nuclearcandy', title: 'Nuclear Candy' }
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('data-theme', context.globals.designSystem || 'bitcoindesign');
      wrapper.setAttribute('data-mode', context.globals.theme || 'light');
      wrapper.style.padding = '24px';
      wrapper.style.backgroundColor = 'var(--background)';
      wrapper.style.color = 'var(--text-primary)';
      
      wrapper.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
          
          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        </style>
      `;
      wrapper.appendChild(Story());
      return wrapper;
    },
  ],
};

export default preview;