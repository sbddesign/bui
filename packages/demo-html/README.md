# demo-html

Simple HTML + JavaScript demo for `@sbddesign/bui-ui` web components.

## Scripts

- `pnpm --filter @sbddesign/bui-demo-html dev` — start the demo locally
- `pnpm --filter @sbddesign/bui-demo-html build` — build for production
- `pnpm --filter @sbddesign/bui-demo-html preview` — preview the production build

## Notes

- Tokens are imported with `import '@sbddesign/bui-ui/tokens.css'`.
- Components are registered by importing `@sbddesign/bui-ui` which re-exports `dist/*` and defines custom elements.
- Ensure the `<html>` element sets theme and mode attributes, e.g.:

```html
<html data-theme="bitcoindesign" data-mode="light">
```

This mirrors the React and Svelte demos without any framework.


