# @sbddesign/bui-tokens

Design tokens for the BUI design system, including color palettes, spacing, typography, and other design values.

## Scripts

### `pnpm run build`
Builds CSS variables from design tokens in the `design-tokens/` directory.

### `pnpm run convert:oklch`
Converts OKLCH color values from `lib/tailwindcss/tailwind-theme.css` to hex values and saves them as design tokens in `lib/tailwindcss/tailwind.primitives.json`.

### `pnpm run build:all`
Runs both the main build process and the OKLCH conversion.

## Files

- `design-tokens/` - Source design tokens in JSON format
- `dist/variables.css` - Generated CSS variables (output of build script)
- `lib/tailwindcss/tailwind-theme.css` - Tailwind CSS theme with OKLCH color values
- `lib/tailwindcss/tailwind.primitives.json` - Hex color tokens (output of convert:oklch script)

## Token Structure

The hex tokens are organized as:
```json
{
  "tailwind": {
    "red": {
      "50": {
        "$value": "#fef2f2",
        "$type": "color"
      }
    }
  }
}
```

This allows you to reference colors as `tailwind.red.50` in your design system. 