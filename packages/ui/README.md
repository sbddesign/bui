# @bui/ui

This package provides Web Components for the Bitcoin UI Kit, built with [Lit](https://lit.dev/).

## Usage

- Components are implemented as Lit-based Web Components.
- Design tokens (colors, sizes, etc.) are imported as CSS variables from the `@bui/tokens` package.
- To use the components, ensure you also include the CSS variables from `../tokens/lib/tailwindcss/tailwind-theme.css` in your project.

## Example

```js
import '@bui/ui/button.js';
```

## Development

- Components live in this package.
- Tokens are managed in the `tokens` package and built to CSS for consumption here. 