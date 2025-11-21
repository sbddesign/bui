import '../amount-option-tile.js';

export default {
  title: 'BUI/AmountOptionTile',
  component: 'bui-amount-option-tile',
  tags: ['autodocs'],
  argTypes: {
    emoji: { control: 'text' },
    message: { control: 'text' },
    showEmoji: { control: 'boolean' },
    showMessage: { control: 'boolean' },
    showSecondaryCurrency: { control: 'boolean' },
    bitcoinFirst: { control: 'boolean' },
    custom: { control: 'boolean' },
    amountDefined: { control: 'boolean' },
    selected: { control: 'boolean' },
    primaryAmount: { control: 'number' },
    primarySymbol: { control: 'text' },
    secondaryAmount: { control: 'number' },
    secondarySymbol: { control: 'text' },
    showEstimate: { control: 'boolean' },
    primaryTextSize: {
      control: { type: 'select' },
      options: ['base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
    },
    secondaryTextSize: {
      control: { type: 'select' },
      options: ['base', 'lg', 'xl', '2xl'],
    },
  },
  args: {
    emoji: '🔥',
    message: 'Incredible',
    showEmoji: true,
    showMessage: true,
    showSecondaryCurrency: true,
    bitcoinFirst: false,
    custom: false,
    amountDefined: false,
    selected: false,
    primaryAmount: 30,
    primarySymbol: '$',
    secondaryAmount: 100000,
    secondarySymbol: '₿',
    showEstimate: true,
    primaryTextSize: '6xl',
    secondaryTextSize: '2xl',
  },
};

// Basic tile with default settings
export const Default = {
  args: {
    primarySymbol: '$',
    secondarySymbol: '₿',
    message: 'Incredible',
    emoji: '🔥',
    selected: false,
  },
};

// Bitcoin first (bitcoin amount shown larger)
export const BitcoinFirst = {
  args: {
    bitcoinFirst: true,
    primaryAmount: '10000',
    primarySymbol: '₿',
    secondaryAmount: '30',
    secondarySymbol: '$',
    message: 'Fantabulous',
    emoji: '🎉',
  },
};

// Selected state
export const Selected = {
  args: {
    selected: true,
    primaryAmount: 50,
    primarySymbol: '€',
    secondaryAmount: 20000,
    secondarySymbol: '₿',
    message: 'Amazing',
    emoji: '⚡',
  },
};

// Custom amount tile
export const CustomAmount = {
  args: {
    custom: true,
    amountDefined: false,
  },
};

// Custom amount with defined value
export const CustomAmountWithValue = {
  args: {
    custom: true,
    amountDefined: true,
    primaryAmount: 75000,
    primarySymbol: '₤',
    secondaryAmount: 300000,
    secondarySymbol: '₿',
  },
};

// Row of 4 amount option tiles (as requested)
export const RowOfFourTiles = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      gap: 16px;
      padding: 20px;
      border-radius: 12px;
    `;

    // First tile
    const tile1 = document.createElement('bui-amount-option-tile');
    tile1.setAttribute('primary-amount', 10);
    tile1.setAttribute('primary-symbol', '$');
    tile1.setAttribute('secondary-amount', 30000);
    tile1.setAttribute('secondary-symbol', '₿');
    tile1.setAttribute('message', 'Small');
    tile1.setAttribute('emoji', '💎');
    tile1.setAttribute('selected', true);

    // Second tile
    const tile2 = document.createElement('bui-amount-option-tile');
    tile2.setAttribute('primary-amount', 25);
    tile2.setAttribute('primary-symbol', '$');
    tile2.setAttribute('secondary-amount', 80000);
    tile2.setAttribute('secondary-symbol', '₿');
    tile2.setAttribute('message', 'Medium');
    tile2.setAttribute('emoji', '🚀');

    // Third tile
    const tile3 = document.createElement('bui-amount-option-tile');
    tile3.setAttribute('primary-amount', 50);
    tile3.setAttribute('primary-symbol', '$');
    tile3.setAttribute('secondary-amount', 160000);
    tile3.setAttribute('secondary-symbol', '₿');
    tile3.setAttribute('message', 'Large');
    tile3.setAttribute('emoji', '🔥');

    // Fourth tile
    const tile4 = document.createElement('bui-amount-option-tile');
    tile4.setAttribute('custom', true);
    tile4.setAttribute('amount-defined', false);

    container.appendChild(tile1);
    container.appendChild(tile2);
    container.appendChild(tile3);
    container.appendChild(tile4);

    return container;
  },
};

// Bitcoin first row
export const BitcoinFirstRow = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      gap: 16px;
      padding: 20px;
      border-radius: 12px;
    `;

    // First tile
    const tile1 = document.createElement('bui-amount-option-tile');
    tile1.setAttribute('bitcoin-first', true);
    tile1.setAttribute('primary-amount', 1000);
    tile1.setAttribute('primary-symbol', '₿');
    tile1.setAttribute('secondary-amount', 3);
    tile1.setAttribute('secondary-symbol', '$');
    tile1.setAttribute('message', 'Tiny');
    tile1.setAttribute('emoji', '💎');
    tile1.setAttribute('selected', true);

    // Second tile
    const tile2 = document.createElement('bui-amount-option-tile');
    tile2.setAttribute('bitcoin-first', true);
    tile2.setAttribute('primary-amount', 5000);
    tile2.setAttribute('primary-symbol', '₿');
    tile2.setAttribute('secondary-amount', 15);
    tile2.setAttribute('secondary-symbol', '$');
    tile2.setAttribute('message', 'Small');
    tile2.setAttribute('emoji', '🚀');

    // Third tile
    const tile3 = document.createElement('bui-amount-option-tile');
    tile3.setAttribute('bitcoin-first', true);
    tile3.setAttribute('primary-amount', 30000);
    tile3.setAttribute('primary-symbol', '₿');
    tile3.setAttribute('secondary-amount', 30);
    tile3.setAttribute('secondary-symbol', '$');
    tile3.setAttribute('message', 'Medium');
    tile3.setAttribute('emoji', '🔥');

    // Fourth tile
    const tile4 = document.createElement('bui-amount-option-tile');
    tile4.setAttribute('custom', true);
    tile4.setAttribute('amount-defined', true);
    tile4.setAttribute('bitcoin-first', true);
    tile4.setAttribute('primary-amount', 1337);
    tile4.setAttribute('primary-symbol', '₿');
    tile4.setAttribute('secondary-amount', 3.3);
    tile4.setAttribute('secondary-symbol', '$');

    container.appendChild(tile1);
    container.appendChild(tile2);
    container.appendChild(tile3);
    container.appendChild(tile4);

    return container;
  },
};
