import '../bitcoin-qr-display.js';

// Load bitcoin-qr component
const script = document.createElement('script');
script.type = 'module';
script.src = 'https://unpkg.com/bitcoin-qr@1.4.1/dist/bitcoin-qr/bitcoin-qr.esm.js';
document.head.appendChild(script);

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
  },
  args: {
    address: 'BC1QYLH3U67J673H6Y6ALV70M0PL2YZ53TZHVXGG7U',
    lightning: 'lnbc10u1pn9eh8vpp5k7q2dz6c4w0d3p0d8n2k3z6a7n8r7c9e9e0t8s8y5j6lm3vwm3dqzsdz5xysxxmmnwssx7un9de6xzetjv4kxzcm9d5c8g6t5de5k2mr0d5c8g6t5de5k2mr0da5gzqzjccqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyysgqc8u6w',
    option: 'unified',
    selector: 'dots',
    size: 332,
  },
};

export const Default = {
  args: {
    option: 'unified',
    selector: 'dots',
  },
};

export const ToggleSelector = {
  args: {
    option: 'unified',
    selector: 'toggle',
  },
};

export const LightningOnly = {
  args: {
    option: 'lightning',
    selector: 'dots',
  },
};

export const OnchainOnly = {
  args: {
    option: 'onchain',
    selector: 'dots',
  },
};
