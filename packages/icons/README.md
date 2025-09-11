# @sbddesign/bui-icons

Icon web components for the BUI Design System. This package automatically generates web components from SVG files in the `src/svg` directory.

## Usage

### Import and use in web components

```javascript
import { BuiIconArrowLeftLg } from '@sbddesign/bui-icons';

// The component is automatically registered as <bui-arrow-left-lg>
// You can use it directly in your templates:

render() {
  return html`
    <bui-arrow-left-lg></bui-arrow-left-lg>
  `;
}
```

### Direct import of specific icons

```javascript
import arrowLeftLg from '@sbddesign/bui-icons/arrowLeft/lg';

// This imports the BuiIconArrowLeftLg class
// The component is automatically registered as <bui-arrow-left-lg>
```

### Using in templates

```javascript
import { LitElement, html } from 'lit';
import '@sbddesign/bui-icons/arrowLeft/lg.js';

export class MyComponent extends LitElement {
  render() {
    return html`
      <div>
        <bui-arrow-left-lg style="width: 24px; height: 24px; color: blue;"></bui-arrow-left-lg>
      </div>
    `;
  }
}
```

## Available Icons

The following icons are available with sizes `sm`, `md`, and `lg` (where applicable):

- `arrowDown` - Arrow pointing down
- `arrowLeft` - Arrow pointing left  
- `arrowRight` - Arrow pointing right
- `arrowUp` - Arrow pointing up
- `checkCircle` - Checkmark in circle (lg, md only)
- `clipboard` - Clipboard icon (lg only)
- `crossCircle` - X in circle (lg, md only)
- `scan` - Scan/QR code icon
- `search` - Search/magnifying glass icon
- `warning` - Warning triangle (lg only)

## Icon Naming Convention

Icons are named using the pattern: `bui-{iconName}-{size}`

Examples:
- `bui-arrow-left-lg` - Large left arrow
- `bui-check-circle-md` - Medium check circle
- `bui-search-sm` - Small search icon

## Styling

Icons inherit the `currentColor` from their parent element, so you can style them with CSS:

```css
bui-arrow-left-lg {
  color: blue;
  width: 24px;
  height: 24px;
}
```

## Development

### Building

```bash
pnpm build
```

### Watch mode

```bash
pnpm dev
```

### Adding new icons

1. Add SVG files to `src/svg/{iconName}/{size}.svg`
2. Run the build script to generate the web components
3. The new icons will be automatically available for import

## File Structure

```
src/svg/
├── arrowLeft/
│   ├── sm.svg
│   ├── md.svg
│   └── lg.svg
├── checkCircle/
│   ├── md.svg
│   └── lg.svg
└── ...

dist/
├── arrowLeft/
│   ├── sm.js
│   ├── md.js
│   └── lg.js
├── checkCircle/
│   ├── md.js
│   └── lg.js
└── index.js
``` 