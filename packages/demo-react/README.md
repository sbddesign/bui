# @sbddesign/bui-demo-react

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

# Build UI wrappers/types first (ensures @sbddesign/bui-ui/react is generated)
pnpm -w build:ui

# Start development server for this demo
pnpm dev

# Type check (after UI build so generated types are available)
pnpm type-check

# Build
pnpm build

# Preview production build
pnpm preview
```

## Component Usage

This demo shows how to use BUI React wrappers (built with `@lit/react`) for BUI web components in a React application:

```jsx
import { BuiButtonReact as BuiButton } from '@sbddesign/bui-ui/react'
import '@sbddesign/bui-ui/tokens.css'

// Use the typed React wrapper
<BuiButton 
  styleType="filled" 
  size="large" 
  label="Get Started"
/>
```

## Notes

- The React app uses typed React wrappers, so no `@ts-ignore` is needed for JSX types.
- The wrappers provide proper TypeScript typings for components (e.g., the button props and events).
- Focus is on demonstrating the components themselves, not complex React patterns.
