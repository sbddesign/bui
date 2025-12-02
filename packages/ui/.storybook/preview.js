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
      test: 'todo',
    },

    docs: {
      source: {
        transform: (code, _storyContext) => {
          // Remove decorator wrapper div and style tag
          // The decorator adds: <div data-theme="..." data-mode="..." style="..."><style>...</style>...</div>
          let transformed = code;

          // Remove style tag with font imports (handle multiline)
          transformed = transformed.replace(
            /<style>[\s\S]*?@import url\([^)]+\)[\s\S]*?<\/style>/g,
            ''
          );
          transformed = transformed.replace(/<style>[\s\S]*?font-family[\s\S]*?<\/style>/g, '');

          // Remove the outer wrapper div with data-theme and data-mode attributes
          // Handle both single-line and multi-line formats
          transformed = transformed.replace(/<div[^>]*data-theme="[^"]*"[^>]*>/g, '');
          transformed = transformed.replace(/<div[^>]*data-mode="[^"]*"[^>]*>/g, '');

          // Remove closing wrapper div tags
          transformed = transformed.replace(/<\/div>\s*$/gm, '');

          // Extract just the component element if it's wrapped
          // Look for web component tags (bui-*) and handle nested components properly
          const extractComponent = (html) => {
            const openTagMatch = html.match(/<bui-[^>]*>/);
            if (!openTagMatch) return null;

            const openTag = openTagMatch[0];
            const tagNameMatch = openTag.match(/<bui-([^\s>]+)/);
            if (!tagNameMatch) return null;

            const tagName = tagNameMatch[1];
            const startIndex = openTagMatch.index;
            let depth = 0;
            let i = startIndex + openTag.length;

            // Find the matching closing tag by tracking nested bui-* tags
            while (i < html.length) {
              const remaining = html.substring(i);
              const openMatch = remaining.match(/<bui-[^>]*>/);
              const closeMatch = remaining.match(/<\/bui-[^>]*>/);

              if (!closeMatch) break;

              const openIndex = openMatch ? openMatch.index + i : Infinity;
              const closeIndex = closeMatch.index + i;
              const closeTag = closeMatch[0];
              const closeTagNameMatch = closeTag.match(/<\/bui-([^\s>]+)/);

              if (openIndex < closeIndex) {
                // Found nested opening tag before closing tag
                depth++;
                i = openIndex + openMatch[0].length;
              } else {
                // Found closing tag
                if (closeTagNameMatch && closeTagNameMatch[1] === tagName) {
                  if (depth === 0) {
                    // Found matching closing tag at top level
                    return html.substring(startIndex, closeIndex + closeTag.length);
                  }
                  // This closing tag matches our target but we're still nested
                  depth--;
                } else if (depth > 0) {
                  // This closing tag is for a nested component
                  depth--;
                }
                i = closeIndex + closeTag.length;
              }
            }

            return null;
          };

          const componentMatch = extractComponent(transformed);
          if (componentMatch) {
            transformed = componentMatch;
          }

          // Clean up extra whitespace and newlines
          transformed = transformed.trim();

          // Convert camelCase attributes to kebab-case for web components
          // styleType -> style-type, etc.
          transformed = transformed.replace(/\bstyleType=/g, 'style-type=');

          // Remove empty string values from boolean attributes (e.g., show-initial="" -> show-initial)
          // Only match known boolean attribute names to avoid transforming text attributes like value=""
          const booleanAttributes = [
            'disabled',
            'active',
            'selected',
            'wide',
            'show-icon',
            'show-label',
            'show-icon-left',
            'show-icon-right',
            'show-initial',
            'show-emoji',
            'show-message',
            'show-secondary-currency',
            'show-estimate',
            'show-image',
            'bitcoin-first',
            'custom',
            'amount-defined',
            'truncated',
            'satcomma',
            'truncation',
            'copy-on-tap',
            'error',
            'complete',
          ];
          const booleanAttrPattern = `(${booleanAttributes.join('|')})`;
          transformed = transformed.replace(new RegExp(`${booleanAttrPattern}=""`, 'g'), '$1');

          return transformed;
        },
      },
    },
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
          { value: 'dark', title: 'Dark', icon: 'moon' },
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
          { value: 'nuclearcandy', title: 'Nuclear Candy' },
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
