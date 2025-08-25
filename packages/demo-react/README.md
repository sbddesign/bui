# @bui/demo-react

A React demo application showcasing the BUI design system components.

## Features

- Modern React 19 with Vite
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

# Type check
pnpm type-check

# Build
pnpm build

# Preview production build
pnpm preview
```

## Component Usage

This demo shows how to use BUI web components in a React application:

```jsx
import '@bui/ui/button.js'
import '../../tokens/lib/tailwindcss/tailwind-theme.css'

// Use the button component
<bui-button 
  style-type="filled" 
  size="large" 
  label="Get Started"
></bui-button>
```

## Notes

- The React app currently uses `@ts-ignore` for web component JSX types
- The HTML demo provides a cleaner way to test the TypeScript functionality
- Focus is on demonstrating the TypeScript button component, not complex React patterns
