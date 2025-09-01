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
      options: ['base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'] 
    },
    secondaryTextSize: { 
      control: { type: 'select' }, 
      options: ['base', 'lg', 'xl', '2xl'] 
    }
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
    secondaryTextSize: '2xl'
  },
};

// Basic tile with default settings
export const Default = {
  args: {
    primarySymbol: '$',
    secondarySymbol: '₿',
    message: 'Incredible',
    emoji: '🔥',
    selected: false
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
    emoji: '🎉'
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
    emoji: '⚡'
  },
};



// Custom amount tile
export const CustomAmount = {
  args: {
    custom: true,
    amountDefined: false
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
    secondarySymbol: '₿'
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

    // First tile: $10
    const tile1 = document.createElement('bui-amount-option-tile');
    tile1.setAttribute('primary-amount', 10);
    tile1.setAttribute('primary-symbol', '$');
    tile1.setAttribute('secondary-amount', 30000);
    tile1.setAttribute('secondary-symbol', '₿');
    tile1.setAttribute('message', 'Small');
    tile1.setAttribute('emoji', '💎');
    tile1.setAttribute('selected', true);

    // Second tile: $25
    const tile2 = document.createElement('bui-amount-option-tile');
    tile2.setAttribute('primary-amount', 25);
    tile2.setAttribute('primary-symbol', '$');
    tile2.setAttribute('secondary-amount', 80000);
    tile2.setAttribute('secondary-symbol', '₿');
    tile2.setAttribute('message', 'Medium');
    tile2.setAttribute('emoji', '🚀');

    // Third tile: $50
    const tile3 = document.createElement('bui-amount-option-tile');
    tile3.setAttribute('primary-amount', 50);
    tile3.setAttribute('primary-symbol', '$');
    tile3.setAttribute('secondary-amount', 160000);
    tile3.setAttribute('secondary-symbol', '₿');
    tile3.setAttribute('message', 'Large');
    tile3.setAttribute('emoji', '🔥');

    // Fourth tile: Custom (as requested)
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

    // First tile: 0.0001 ₿
    const tile1 = document.createElement('bui-amount-option-tile');
    tile1.setAttribute('bitcoin-first', true);
    tile1.setAttribute('primary-amount', 1000);
    tile1.setAttribute('primary-symbol', '₿');
    tile1.setAttribute('secondary-amount', 3);
    tile1.setAttribute('secondary-symbol', '$');
    tile1.setAttribute('message', 'Tiny');
    tile1.setAttribute('emoji', '💎');
    tile1.setAttribute('selected', false);

    // Second tile: 0.0005 ₿
    const tile2 = document.createElement('bui-amount-option-tile');
    tile2.setAttribute('bitcoin-first', true);
    tile2.setAttribute('primary-amount', 50000);
    tile2.setAttribute('primary-symbol', '₿');
    tile2.setAttribute('secondary-amount', 15);
    tile2.setAttribute('secondary-symbol', '$');
    tile2.setAttribute('message', 'Small');
    tile2.setAttribute('emoji', '🚀');

    // Third tile: 0.001 ₿
    const tile3 = document.createElement('bui-amount-option-tile');
    tile3.setAttribute('bitcoin-first', true);
    tile3.setAttribute('primary-amount', 100000);
    tile3.setAttribute('primary-symbol', '₿');
    tile3.setAttribute('secondary-amount', 30);
    tile3.setAttribute('secondary-symbol', '$');
    tile3.setAttribute('message', 'Medium');
    tile3.setAttribute('emoji', '🔥');

    // Fourth tile: Custom
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


/*

// Different text sizes
export const TextSizeVariants = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      gap: 16px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 12px;
      flex-wrap: wrap;
    `;

    const sizes = ['4xl', '5xl', '6xl', '7xl'];
    
    sizes.forEach((size, index) => {
      const tile = document.createElement('bui-amount-option-tile');
      tile.setAttribute('primary-amount', (10 + index * 20).toString());
      tile.setAttribute('primary-symbol', '$');
      tile.setAttribute('secondary-amount', (0.0003 + index * 0.0005).toFixed(4));
      tile.setAttribute('secondary-symbol', '₿');
      tile.setAttribute('message', `Size ${size}`);
      tile.setAttribute('emoji', ['💎', '🚀', '🔥', '⚡'][index]);
      tile.setAttribute('primary-text-size', size);
      
      container.appendChild(tile);
    });

    return container;
  },
};

// Interactive example with click events
export const InteractiveExample = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 12px;
    `;

    const tilesContainer = document.createElement('div');
    tilesContainer.style.cssText = `
      display: flex;
      gap: 16px;
    `;

    const info = document.createElement('div');
    info.style.cssText = `
      padding: 16px;
      background: white;
      border-radius: 8px;
      font-family: monospace;
      font-size: 14px;
    `;
    info.textContent = 'Click on tiles to see event details...';

    // Create tiles
    const amounts = [10, 25, 50];
    const messages = ['Small', 'Medium', 'Large'];
    const emojis = ['💎', '🚀', '🔥'];

    amounts.forEach((amount, index) => {
      const tile = document.createElement('bui-amount-option-tile');
      tile.setAttribute('primary-amount', amount.toString());
      tile.setAttribute('primary-symbol', '$');
      tile.setAttribute('secondary-amount', (amount * 0.000032).toFixed(6));
      tile.setAttribute('secondary-symbol', '₿');
      tile.setAttribute('message', messages[index]);
      tile.setAttribute('emoji', emojis[index]);
      
      tile.addEventListener('amount-tile-click', (e) => {
        info.textContent = `Clicked: $${e.detail.primaryAmount} (${e.detail.secondaryAmount} ₿) - ${e.detail.message}`;
      });

      tilesContainer.appendChild(tile);
    });

    // Custom tile
    const customTile = document.createElement('bui-amount-option-tile');
    customTile.setAttribute('custom', 'true');
    customTile.setAttribute('amount-defined', 'false');
    customTile.setAttribute('show-secondary-currency', 'false');
    customTile.setAttribute('show-message', 'false');
    customTile.setAttribute('show-emoji', 'false');
    
    customTile.addEventListener('amount-tile-click', (e) => {
      info.textContent = `Clicked: Custom Amount`;
    });

    tilesContainer.appendChild(customTile);

    container.appendChild(tilesContainer);
    container.appendChild(info);

    return container;
  },
};

*/