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
