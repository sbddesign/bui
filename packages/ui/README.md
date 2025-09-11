# @sbddesign/bui-ui

This package provides Web Components for the Bitcoin UI Kit, built with [Lit](https://lit.dev/).

## Usage

- Components are implemented as Lit-based Web Components.
- Design tokens (colors, sizes, etc.) are imported as CSS variables from the `@sbddesign/bui-tokens` package.
- Components use the Inter font family for consistent typography.
- To use the components, ensure you also include the CSS variables from `../tokens/lib/tailwindcss/tailwind-theme.css` in your project.

## Font Setup

The components use the Inter font family. You can include it in your project using:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
```

Or via CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
```

## Example

```js
import '@sbddesign/bui-ui/button.js';
```

## Development

- Components live in this package.
- Tokens are managed in the `tokens` package and built to CSS for consumption here. 