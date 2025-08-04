import '../bitcoin-value.js';

export default {
  title: 'BUI/BitcoinValue',
  component: 'bui-bitcoin-value',
  tags: ['autodocs'],
  argTypes: {
    format: { 
      control: { type: 'select' }, 
      options: ['bip177', 'sats', 'BTC'] 
    },
    truncated: { control: 'boolean' },
    amount: { control: 'number' },
    symbolPosition: { 
      control: { type: 'select' }, 
      options: ['left', 'right', undefined] 
    },
  },
  args: {
    format: 'bip177',
    truncated: false,
    amount: 123456789, // 1.23456789 BTC
    symbolPosition: undefined,
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
    bitcoinValue.setAttribute('format', args.format);
    bitcoinValue.amount = args.amount;
    bitcoinValue.truncated = args.truncated;
    return bitcoinValue;
  },
};

// Sats format - "sats" on the right
export const Sats = {
  args: {
    format: 'sats',
    amount: 123456789,
    symbolPosition: "left"
  },
  render: (args) => {
    const bitcoinValue = document.createElement('bui-bitcoin-value');
    bitcoinValue.setAttribute('format', args.format);
    bitcoinValue.amount = args.amount;
    bitcoinValue.truncated = args.truncated;
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
    bitcoinValue.setAttribute('format', args.format);
    bitcoinValue.amount = args.amount;
    bitcoinValue.truncated = args.truncated;
    return bitcoinValue;
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
    
    examples.forEach(example => {
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
      bitcoinValue.setAttribute('format', example.format);
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
    
    amounts.forEach(item => {
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
      bip177.setAttribute('format', 'bip177');
      bip177.amount = item.sats;
      
      const sats = document.createElement('bui-bitcoin-value');
      sats.setAttribute('format', 'sats');
      sats.amount = item.sats;
      
      const btc = document.createElement('bui-bitcoin-value');
      btc.setAttribute('format', 'BTC');
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
    
    examples.forEach(example => {
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
      withoutTruncation.setAttribute('format', 'bip177');
      withoutTruncation.amount = example.sats;
      withoutTruncation.truncated = false;
      
      const withTruncation = document.createElement('bui-bitcoin-value');
      withTruncation.setAttribute('format', 'bip177');
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
    
    examples.forEach(example => {
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
      defaultPos.setAttribute('format', example.format);
      defaultPos.amount = example.amount;
      
      const overrideLeft = document.createElement('bui-bitcoin-value');
      overrideLeft.setAttribute('format', example.format);
      overrideLeft.amount = example.amount;
      overrideLeft.setAttribute('symbol-position', 'left');
      
      const overrideRight = document.createElement('bui-bitcoin-value');
      overrideRight.setAttribute('format', example.format);
      overrideRight.amount = example.amount;
      overrideRight.setAttribute('symbol-position', 'right');
      
      wrapper.appendChild(label);
      wrapper.appendChild(defaultPos);
      wrapper.appendChild(overrideLeft);
      wrapper.appendChild(overrideRight);
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
  },
  render: (args) => {
    const bitcoinValue = document.createElement('bui-bitcoin-value');
    bitcoinValue.setAttribute('format', args.format);
    bitcoinValue.amount = args.amount;
    bitcoinValue.truncated = args.truncated;
    if (args.symbolPosition) {
      bitcoinValue.setAttribute('symbol-position', args.symbolPosition);
    }
    return bitcoinValue;
  },
}; 