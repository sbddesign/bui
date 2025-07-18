# bui

Bitcoin UI Kit monorepo - Work In Progress

This project is built upon the [Bitcoin UI Kit](https://www.bitcoinuikit.com/). It implements these figma components as UI library built with WebComponents.

## Packages

### tokens

The `tokens` package includes colors, sizes, and other values as W3C compatible design tokens. There is also a build script which converts the design tokens into CSS variables.

To build variables, run `pnpm build:tokens`.

### ui

The `ui` package includes web components representing items in the Bitcoin UI Kit. This includes basic components such as buttons as well as more bitcoin-specific constructions like a seed word backup.

The `ui` lib relies upon the CSS variables from `tokens`. It uses [Lit](https://lit.dev/) for the web components.


### demo-react

`demo-react` demonstrates usage of the `ui` components and `tokens` inside a basic React app.

### demo-svelte

`demo-svelte` demonstrates usage of the `ui` components and `tokens` inside a basic Svelte app, showing cross-framework compatibility of the web components.

### demo-flutter

`demo-flutter` demonstrates a native Flutter implementation of the Bitcoin UI Kit components. This shows how the design system can be adapted for mobile and desktop applications using Flutter's Material Design components with custom styling.