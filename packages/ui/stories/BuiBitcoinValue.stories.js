import '../bitcoin-value.js';

export default {
  title: 'BUI/BitcoinValue',
  component: 'bui-bitcoin-value',
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: { type: 'select' },
      options: ['bip177', 'sats', 'BTC'],
    },
    truncated: { control: 'boolean' },
    amount: { control: 'number' },
    symbolPosition: {
      control: { type: 'select' },
      options: ['left', 'right', undefined],
    },
    satcomma: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large', 'xlarge'],
    },
    showEstimate: { control: 'boolean' },
    textSize: {
      control: { type: 'select' },
      options: ['base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
    },
  },
  args: {
    format: 'bip177',
    truncated: false,
    amount: 123456789, // 1.23456789 BTC
    symbolPosition: undefined,
    satcomma: false,
    size: 'default',
    showEstimate: false,
    textSize: 'base',
  },
  render: (args) => {
    const bitcoinValue = document.createElement('bui-bitcoin-value');
    if (args.format) bitcoinValue.setAttribute('format', args.format);
    if (args.truncated) bitcoinValue.setAttribute('truncated', '');
    if (args.amount !== undefined) bitcoinValue.setAttribute('amount', args.amount.toString());
    if (args.symbolPosition) bitcoinValue.setAttribute('symbol-position', args.symbolPosition);
    if (args.satcomma) bitcoinValue.setAttribute('satcomma', '');
    if (args.size) bitcoinValue.setAttribute('size', args.size);
    if (args.showEstimate) bitcoinValue.setAttribute('show-estimate', '');
    if (args.textSize) bitcoinValue.setAttribute('text-size', args.textSize);
    return bitcoinValue;
  },
};

// BIP177 format (default) - ₿ symbol on the left
export const BIP177 = {
  args: {
    format: 'bip177',
    amount: 123456789,
  },
  render: (args) => {
    const bitcoinValue = document.createElement('bui-bitcoin-value');
    if (args.format) bitcoinValue.setAttribute('format', args.format);
    if (args.amount !== undefined) bitcoinValue.setAttribute('amount', args.amount.toString());
    if (args.truncated) bitcoinValue.setAttribute('truncated', '');
    return bitcoinValue;
  },
};

// Sats format - "sats" on the right
export const Sats = {
  args: {
    format: 'sats',
    amount: 123456789,
  },
  render: (args) => {
    const bitcoinValue = document.createElement('bui-bitcoin-value');
    if (args.format) bitcoinValue.setAttribute('format', args.format);
    if (args.amount !== undefined) bitcoinValue.setAttribute('amount', args.amount.toString());
    if (args.truncated) bitcoinValue.setAttribute('truncated', '');
    return bitcoinValue;
  },
};

// BTC format - "BTC" on the right
export const BTC = {
  args: {
    format: 'BTC',
    amount: 123456789,
  },
  render: (args) => {
    const bitcoinValue = document.createElement('bui-bitcoin-value');
    if (args.format) bitcoinValue.setAttribute('format', args.format);
    if (args.amount !== undefined) bitcoinValue.setAttribute('amount', args.amount.toString());
    if (args.truncated) bitcoinValue.setAttribute('truncated', '');
    return bitcoinValue;
  },
};

// Show estimate symbol
export const WithEstimate = {
  args: {
    showEstimate: true,
    amount: 123456789,
  },
  render: (args) => {
    const bitcoinValue = document.createElement('bui-bitcoin-value');
    if (args.showEstimate) bitcoinValue.setAttribute('show-estimate', '');
    if (args.amount !== undefined) bitcoinValue.setAttribute('amount', args.amount.toString());
    return bitcoinValue;
  },
};

// Text size variants
export const TextSizes = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const sizes = [
      { size: 'base', label: 'Base (16px)' },
      { size: 'lg', label: 'Large (18px)' },
      { size: 'xl', label: 'XL (20px)' },
      { size: '2xl', label: '2XL (24px)' },
      { size: '3xl', label: '3XL (30px)' },
      { size: '4xl', label: '4XL (36px)' },
      { size: '5xl', label: '5XL (48px)' },
      { size: '6xl', label: '6XL (60px)' },
      { size: '7xl', label: '7XL (72px)' },
      { size: '8xl', label: '8XL (96px)' },
      { size: '9xl', label: '9XL (128px)' },
    ];

    sizes.forEach((item) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '1rem';

      const label = document.createElement('span');
      label.textContent = item.label;
      label.style.minWidth = '120px';
      label.style.fontSize = '0.875rem';
      label.style.color = 'var(--text-secondary)';

      const bitcoinValue = document.createElement('bui-bitcoin-value');
      bitcoinValue.textSize = item.size;
      bitcoinValue.amount = 123456789;

      wrapper.appendChild(label);
      wrapper.appendChild(bitcoinValue);
      container.appendChild(wrapper);
    });

    return container;
  },
};

// All formats comparison
export const AllFormats = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const examples = [
      { format: 'bip177', amount: 123456789, label: 'BIP177 (₿ left)' },
      { format: 'sats', amount: 123456789, label: 'Sats (sats right)' },
      { format: 'BTC', amount: 123456789, label: 'BTC (BTC right)' },
    ];

    examples.forEach((example) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '1rem';

      const label = document.createElement('span');
      label.textContent = example.label;
      label.style.minWidth = '150px';
      label.style.fontSize = '0.875rem';
      label.style.color = 'var(--text-secondary)';

      const bitcoinValue = document.createElement('bui-bitcoin-value');
      bitcoinValue.format = example.format;
      bitcoinValue.amount = example.amount;

      wrapper.appendChild(label);
      wrapper.appendChild(bitcoinValue);
      container.appendChild(wrapper);
    });

    return container;
  },
};

// Different amounts in different formats
export const DifferentAmounts = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const amounts = [
      { sats: 1000, label: '1,000 sats' },
      { sats: 100000, label: '100,000 sats' },
      { sats: 1000000, label: '1,000,000 sats' },
      { sats: 100000000, label: '100,000,000 sats' },
    ];

    amounts.forEach((item) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '2rem';

      const label = document.createElement('span');
      label.textContent = item.label;
      label.style.minWidth = '120px';
      label.style.fontSize = '0.875rem';
      label.style.color = 'var(--text-secondary)';

      const bip177 = document.createElement('bui-bitcoin-value');
      bip177.format = 'bip177';
      bip177.amount = item.sats;

      const sats = document.createElement('bui-bitcoin-value');
      sats.format = 'sats';
      sats.amount = item.sats;

      const btc = document.createElement('bui-bitcoin-value');
      btc.format = 'BTC';
      btc.amount = item.sats;

      wrapper.appendChild(label);
      wrapper.appendChild(bip177);
      wrapper.appendChild(sats);
      wrapper.appendChild(btc);
      container.appendChild(wrapper);
    });

    return container;
  },
};

// Truncation examples
export const WithTruncation = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const examples = [
      { sats: 1000000, label: '1,000,000 sats' },
      { sats: 10000000, label: '10,000,000 sats' },
      { sats: 100000000, label: '100,000,000 sats' },
      { sats: 1000000000, label: '1,000,000,000 sats' },
    ];

    examples.forEach((example) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '2rem';

      const label = document.createElement('span');
      label.textContent = example.label;
      label.style.minWidth = '150px';
      label.style.fontSize = '0.875rem';
      label.style.color = 'var(--text-secondary)';

      const withoutTruncation = document.createElement('bui-bitcoin-value');
      withoutTruncation.format = 'bip177';
      withoutTruncation.amount = example.sats;
      withoutTruncation.truncated = false;

      const withTruncation = document.createElement('bui-bitcoin-value');
      withTruncation.format = 'bip177';
      withTruncation.amount = example.sats;
      withTruncation.truncated = true;

      wrapper.appendChild(label);
      wrapper.appendChild(withoutTruncation);
      wrapper.appendChild(withTruncation);
      container.appendChild(wrapper);
    });

    return container;
  },
};

// Symbol position overrides
export const SymbolPositionOverrides = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const examples = [
      { format: 'bip177', amount: 123456789, label: 'BIP177 (default: left)' },
      { format: 'sats', amount: 123456789, label: 'Sats (default: right)' },
      { format: 'BTC', amount: 123456789, label: 'BTC (default: right)' },
    ];

    examples.forEach((example) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '2rem';

      const label = document.createElement('span');
      label.textContent = example.label;
      label.style.minWidth = '150px';
      label.style.fontSize = '0.875rem';
      label.style.color = 'var(--text-secondary)';

      const defaultPos = document.createElement('bui-bitcoin-value');
      defaultPos.format = example.format;
      defaultPos.amount = example.amount;

      const overrideLeft = document.createElement('bui-bitcoin-value');
      overrideLeft.format = example.format;
      overrideLeft.amount = example.amount;
      overrideLeft.symbolPosition = 'left';

      const overrideRight = document.createElement('bui-bitcoin-value');
      overrideRight.format = example.format;
      overrideRight.amount = example.amount;
      overrideRight.symbolPosition = 'right';

      wrapper.appendChild(label);
      wrapper.appendChild(defaultPos);
      wrapper.appendChild(overrideLeft);
      wrapper.appendChild(overrideRight);
      container.appendChild(wrapper);
    });

    return container;
  },
};

// Satcomma examples for BTC format
export const SatcommaExamples = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const examples = [
      { sats: 12345678, label: '12,345,678 sats' },
      { sats: 123456789, label: '123,456,789 sats' },
      { sats: 1234567890, label: '1,234,567,890 sats' },
    ];

    examples.forEach((example) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '2rem';

      const label = document.createElement('span');
      label.textContent = example.label;
      label.style.minWidth = '150px';
      label.style.fontSize = '0.875rem';
      label.style.color = 'var(--text-secondary)';

      const withoutSatcomma = document.createElement('bui-bitcoin-value');
      withoutSatcomma.format = 'BTC';
      withoutSatcomma.amount = example.sats;
      withoutSatcomma.satcomma = false;

      const withSatcomma = document.createElement('bui-bitcoin-value');
      withSatcomma.format = 'BTC';
      withSatcomma.amount = example.sats;
      withSatcomma.satcomma = true;

      wrapper.appendChild(label);
      wrapper.appendChild(withoutSatcomma);
      wrapper.appendChild(withSatcomma);
      container.appendChild(wrapper);
    });

    return container;
  },
};

// Interactive example
export const Interactive = {
  args: {
    format: 'bip177',
    amount: 123456789,
    truncated: false,
    symbolPosition: undefined,
    satcomma: false,
    size: 'default',
    showEstimate: false,
    textSize: 'base',
  },
  render: (args) => {
    const bitcoinValue = document.createElement('bui-bitcoin-value');
    if (args.format) bitcoinValue.setAttribute('format', args.format);
    if (args.amount !== undefined) bitcoinValue.setAttribute('amount', args.amount.toString());
    if (args.truncated) bitcoinValue.setAttribute('truncated', '');
    if (args.symbolPosition) bitcoinValue.setAttribute('symbol-position', args.symbolPosition);
    if (args.satcomma) bitcoinValue.setAttribute('satcomma', '');
    if (args.size) bitcoinValue.setAttribute('size', args.size);
    if (args.showEstimate) bitcoinValue.setAttribute('show-estimate', '');
    if (args.textSize) bitcoinValue.setAttribute('text-size', args.textSize);
    return bitcoinValue;
  },
};
