import '../bitcoin-qr-display.js';

export default {
  title: 'BUI/BitcoinQrDisplay',
  component: 'bui-bitcoin-qr-display',
  tags: ['autodocs'],
  argTypes: {
    address: { control: 'text' },
    lightning: { control: 'text' },
    option: { control: { type: 'select' }, options: ['unified', 'onchain', 'lightning'] },
    selector: { control: { type: 'select' }, options: ['dots', 'toggle'] },
    size: { control: { type: 'number', min: 160, max: 512, step: 4 } },
    showImage: { control: 'boolean' },
    dotType: { control: { type: 'select' }, options: ['rounded', 'square', 'dots', 'classy', 'classy-rounded', 'extra-rounded'] },
    dotColor: { control: 'color' },
    unifiedImage: { control: 'text' },
    lightningImage: { control: 'text' },
    onchainImage: { control: 'text' },
  },
  args: {
    address: 'BC1QYLH3U67J673H6Y6ALV70M0PL2YZ53TZHVXGG7U',
    lightning: 'lnbc10u1pn9eh8vpp5k7q2dz6c4w0d3p0d8n2k3z6a7n8r7c9e9e0t8s8y5j6lm3vwm3dqzsdz5xysxxmmnwssx7un9de6xzetjv4kxzcm9d5c8g6t5de5k2mr0d5c8g6t5de5k2mr0da5gzqzjccqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyysgqc8u6w',
    option: 'unified',
    selector: 'dots',
    size: 332,
    showImage: true,
    dotType: 'dots',
    dotColor: '#000000',
    unifiedImage: '',
    lightningImage: '',
    onchainImage: '',
  },
};

export const OptionDots = {
  args: {
    option: 'unified',
    selector: 'dots',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default behavior with option dots. Shows three clickable dots to switch between unified, on-chain, and lightning QR formats. The active dot is highlighted in orange.'
      }
    }
  }
};

export const ToggleButton = {
  args: {
    option: 'unified',
    selector: 'toggle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Uses a toggle button instead of dots. The button shows the current option text with a cycle icon. Clicking cycles through the available QR formats.'
      }
    }
  }
};

export const LightningOnly = {
  args: {
    address: '',
    lightning: 'lnbc10u1pn9eh8vpp5k7q2dz6c4w0d3p0d8n2k3z6a7n8r7c9e9e0t8s8y5j6lm3vwm3dqzsdz5xysxxmmnwssx7un9de6xzetjv4kxzcm9d5c8g6t5de5k2mr0d5c8g6t5de5k2mr0da5gzqzjccqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyysgqc8u6w',
    option: 'lightning',
    selector: 'dots',
  },
  parameters: {
    docs: {
      description: {
        story: 'When only lightning invoice is provided, no selector is shown. Component automatically renders lightning-only QR code with appropriate helper text.'
      }
    }
  }
};

export const OnchainOnly = {
  args: {
    address: 'BC1QYLH3U67J673H6Y6ALV70M0PL2YZ53TZHVXGG7U',
    lightning: '',
    option: 'onchain',
    selector: 'dots',
  },
  parameters: {
    docs: {
      description: {
        story: 'When only on-chain address is provided, no selector is shown. Component automatically renders on-chain-only QR code with appropriate helper text.'
      }
    }
  }
};

export const NoData = {
  args: {
    address: '',
    lightning: '',
    option: 'unified',
    selector: 'dots',
  },
  parameters: {
    docs: {
      description: {
        story: 'When no data is provided, shows an error message and no selector. This helps developers identify when required data is missing.'
      }
    }
  }
};

export const WithImages = {
  args: {
    option: 'unified',
    selector: 'dots',
    showImage: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'QR codes with icon overlays. Orange Bitcoin icon for unified, black Bitcoin for on-chain, and yellow Lightning for Lightning payments.'
      }
    }
  }
};

export const WithoutImages = {
  args: {
    option: 'unified',
    selector: 'dots',
    showImage: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'QR codes without icon overlays for a cleaner look when images are not desired.'
      }
    }
  }
};

export const OtherStyles = {
  args: {
    option: 'unified',
    selector: 'dots',
    showImage: true,
    dotType: 'rounded',
    dotColor: '#173ea3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates otherQR code dot styles. Use the dotType control to switch between: rounded, square, dots, classy, classy-rounded, and extra-rounded. Use dotColor to change the color.'
      }
    }
  }
};

export const CustomImages = {
  args: {
    address: 'BC1QYLH3U67J673H6Y6ALV70M0PL2YZ53TZHVXGG7U',
    lightning: '',
    option: 'onchain',
    selector: 'dots',
    showImage: true,
    // onchainImage: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>',
    onchainImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDY0IDY0Ij48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiMxNTVERkMiIHJ4PSIzMiIvPjxwYXRoIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI1LjMzMyIgZD0ibTE5LjU4IDQzLjk4NiA2Ljg4LTI3LjYwOG0tOC45NCAyNy4wOTlzOC4wMTYgMS45OTIgMTUuNDk5IDMuODYxYzE1LjMxMSAzLjgxNyAxNi42MjgtMTEuNTY0IDMuNjg3LTE0Ljc5MUM0OC41MTcgMzUuNDkgNTAuOTg3IDIyLjQ5NSAzOS45IDE5LjczbC0xNS45Mi0zLjk3MW0xLjY0NiAxNC4wMjggMTAuODQ5IDIuNzAzbS0uNTE2LTEzLjc0MyAxLjQ3Ni01LjkxNE0yNy45OCA1Mi4zNjZsMS40NzYtNS45MTgiLz48L3N2Zz4='
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates custom image overlays. Use unifiedImage, lightningImage, or onchainImage props to provide custom image URLs for each QR code type. This example shows the Satoshi 2010 image for on-chain QR codes.'
      }
    }
  }
};
