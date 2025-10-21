import '../money-value.js';

export default {
  title: 'BUI/MoneyValue',
  component: 'bui-money-value',
  tags: ['autodocs'],
  argTypes: {
    symbolPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    symbol: { control: 'text' },
    amount: { control: 'number' },
    truncation: { control: 'boolean' },
    satcomma: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large', 'xlarge'],
    },
    showEstimate: { control: 'boolean' },
    textSize: {
      control: { type: 'select' },
      options: [
        'base',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
        '9xl',
      ],
    },
  },
  args: {
    symbolPosition: 'left',
    symbol: '₿',
    amount: 1234,
    truncation: false,
    satcomma: false,
    size: 'default',
    showEstimate: false,
    textSize: 'base',
  },
};

// Basic usage with default props
export const Default = {
  args: {
    amount: 1234.56,
  },
  render: (args) => {
    const moneyValue = document.createElement('bui-money-value');
    moneyValue.amount = args.amount;
    return moneyValue;
  },
};

// Symbol on the left (default)
export const SymbolLeft = {
  args: {
    symbolPosition: 'left',
    symbol: '₿',
    amount: 1234.56,
  },
  render: (args) => {
    const moneyValue = document.createElement('bui-money-value');
    moneyValue.symbolPosition = args.symbolPosition;
    moneyValue.symbol = args.symbol;
    moneyValue.amount = args.amount;
    return moneyValue;
  },
};

// Symbol on the right
export const SymbolRight = {
  args: {
    symbolPosition: 'right',
    symbol: '₿',
    amount: 1234.56,
  },
  render: (args) => {
    const moneyValue = document.createElement('bui-money-value');
    moneyValue.symbolPosition = args.symbolPosition;
    moneyValue.symbol = args.symbol;
    moneyValue.amount = args.amount;
    return moneyValue;
  },
};

// Show estimate symbol
export const WithEstimate = {
  args: {
    showEstimate: true,
    amount: 1234,
  },
  render: (args) => {
    const moneyValue = document.createElement('bui-money-value');
    moneyValue.showEstimate = args.showEstimate;
    moneyValue.amount = args.amount;
    return moneyValue;
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

      const moneyValue = document.createElement('bui-money-value');
      moneyValue.textSize = item.size;
      moneyValue.amount = 1234;

      wrapper.appendChild(label);
      wrapper.appendChild(moneyValue);
      container.appendChild(wrapper);
    });

    return container;
  },
};

// Different currency symbols
export const DifferentCurrencies = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const currencies = [
      { symbol: '₿', amount: 1234.56, name: 'Bitcoin' },
      { symbol: '$', amount: 1234.56, name: 'US Dollar' },
      { symbol: '€', amount: 1234.56, name: 'Euro' },
      { symbol: '£', amount: 1234.56, name: 'British Pound' },
      { symbol: '¥', amount: 1234.56, name: 'Japanese Yen' },
    ];

    currencies.forEach((currency) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '1rem';

      const label = document.createElement('span');
      label.textContent = `${currency.name}:`;
      label.style.minWidth = '120px';
      label.style.fontSize = '0.875rem';
      label.style.color = 'var(--text-secondary)';

      const moneyValue = document.createElement('bui-money-value');
      moneyValue.symbol = currency.symbol;
      moneyValue.amount = currency.amount;

      wrapper.appendChild(label);
      wrapper.appendChild(moneyValue);
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
      { amount: 1234, label: '1,234' },
      { amount: 12345, label: '12,345' },
      { amount: 123456, label: '123,456' },
      { amount: 1234567, label: '1,234,567' },
      { amount: 12345678, label: '12,345,678' },
      { amount: 1234567890, label: '1,234,567,890' },
    ];

    examples.forEach((example) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '1rem';

      const label = document.createElement('span');
      label.textContent = example.label;
      label.style.minWidth = '200px';
      label.style.fontSize = '0.875rem';
      label.style.color = 'var(--text-secondary)';

      const moneyValue = document.createElement('bui-money-value');
      moneyValue.amount = example.amount;
      moneyValue.truncation = true;

      wrapper.appendChild(label);
      wrapper.appendChild(moneyValue);
      container.appendChild(wrapper);
    });

    return container;
  },
};

// Large amounts with and without truncation
export const LargeAmounts = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const amounts = [
      { amount: 1000000, label: '1,000,000' },
      { amount: 2500000, label: '2,500,000' },
      { amount: 10000000, label: '10,000,000' },
      { amount: 100000000, label: '100,000,000' },
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

      const withoutTruncation = document.createElement('bui-money-value');
      withoutTruncation.amount = item.amount;
      withoutTruncation.truncation = false;

      const withTruncation = document.createElement('bui-money-value');
      withTruncation.amount = item.amount;
      withTruncation.truncation = true;

      wrapper.appendChild(label);
      wrapper.appendChild(withoutTruncation);
      wrapper.appendChild(withTruncation);
      container.appendChild(wrapper);
    });

    return container;
  },
};

// Bitcoin amounts with many decimal places
export const BitcoinAmounts = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const bitcoinAmounts = [
      { amount: 0.00012345, label: 'Small amount' },
      { amount: 0.12345678, label: 'Medium amount' },
      { amount: 1.23456789, label: 'Whole + decimals' },
      { amount: 12.3456789, label: 'Tens + decimals' },
      { amount: 123.45678901, label: 'Hundreds + decimals' },
    ];

    bitcoinAmounts.forEach((item) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '1rem';

      const label = document.createElement('span');
      label.textContent = item.label;
      label.style.minWidth = '120px';
      label.style.fontSize = '0.875rem';
      label.style.color = 'var(--text-secondary)';

      const moneyValue = document.createElement('bui-money-value');
      moneyValue.amount = item.amount;

      wrapper.appendChild(label);
      wrapper.appendChild(moneyValue);
      container.appendChild(wrapper);
    });

    return container;
  },
};

// Satcomma examples
export const SatcommaExamples = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';

    const examples = [
      { amount: 0.12345678, label: '0.12345678' },
      { amount: 1.095672, label: '1.095672' },
      { amount: 1.083, label: '1.083' },
      { amount: 123.456789, label: '123.456789' },
    ];

    examples.forEach((example) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '2rem';

      const label = document.createElement('span');
      label.textContent = example.label;
      label.style.minWidth = '120px';
      label.style.fontSize = '0.875rem';
      label.style.color = 'var(--text-secondary)';

      const withoutSatcomma = document.createElement('bui-money-value');
      withoutSatcomma.symbol = '₿';
      withoutSatcomma.amount = example.amount;
      withoutSatcomma.satcomma = false;

      const withSatcomma = document.createElement('bui-money-value');
      withSatcomma.symbol = 'BTC';
      withSatcomma.symbolPosition = 'right';
      withSatcomma.amount = example.amount;
      withSatcomma.satcomma = true;

      wrapper.appendChild(label);
      wrapper.appendChild(withoutSatcomma);
      wrapper.appendChild(withSatcomma);
      container.appendChild(wrapper);
    });

    return container;
  },
};
