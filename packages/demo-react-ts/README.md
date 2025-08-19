# BUI React TypeScript Demo

This package demonstrates the usage of BUI TypeScript components in a React TypeScript environment.

## What This Demo Shows

1. **TypeScript Integration**: How to use BUI components with full TypeScript support
2. **Type Safety**: Runtime validation of component properties
3. **Web Component Usage**: How to use web components in React with TypeScript

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Type check
pnpm type-check

# Build
pnpm build
```

## TypeScript Features

### Button Component Types
```typescript
type ButtonStyleType = 'filled' | 'outline' | 'free';
type ButtonSize = 'default' | 'small' | 'large';
```

### Runtime Validation
The button component includes runtime validation that warns about invalid property values:

```typescript
// This will trigger a console warning
button.styleType = 'invalid'; // ❌ Invalid value
button.size = 'huge';         // ❌ Invalid value

// These are valid
button.styleType = 'filled';  // ✅ Valid
button.size = 'large';        // ✅ Valid
```

## Demo Files

- **`demo.html`**: Simple HTML demo showing the TypeScript button component
- **`src/App.tsx`**: React TypeScript app demonstrating the component
- **`src/main.tsx`**: React entry point with TypeScript

## Testing TypeScript Validation

1. Open the `demo.html` file in a browser
2. Open the browser console
3. Click "Test TypeScript Validation"
4. Watch for console warnings about invalid values

## TypeScript Configuration

The package includes:
- `tsconfig.json`: TypeScript configuration for React
- `tsconfig.node.json`: TypeScript configuration for Node.js tools
- ESLint configuration for TypeScript

## Dependencies

- React 19 with TypeScript
- Vite with TypeScript support
- BUI UI package (workspace dependency)
- Full TypeScript tooling

## Notes

- The React app currently uses `@ts-ignore` for web component JSX types
- The HTML demo provides a cleaner way to test the TypeScript functionality
- Focus is on demonstrating the TypeScript button component, not complex React patterns
