# @sbddesign/bui-demo-svelte

A Svelte demo application showcasing the BUI design system components.

## Features

- Modern Svelte 5 with Vite
- Integration with BUI web components
- Inter font family
- Responsive design
- Bitcoin Wallet landing page demo

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Component Usage

This demo shows how to use BUI web components in a Svelte application:

```svelte
<script>
  import '@sbddesign/bui-ui/tokens.css';
  import '@sbddesign/bui-ui/button.js';
</script>

<!-- Use the button component -->
<bui-button 
  style-type="filled" 
  size="large" 
  label="Get Started"
></bui-button>
```

## Notes

- Web components work seamlessly with Svelte 5
- CSS variables from the tokens package are imported for styling
- Inter font is loaded for consistent typography
- Svelte's `:global()` selector is used to style web components
