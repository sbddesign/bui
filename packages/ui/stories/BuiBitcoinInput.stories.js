import '../bitcoin-input.js';
import '../../icons/dist/search/lg.js';
import '../../icons/dist/scan/lg.js';

export default {
  title: 'BUI/Bitcoin Input',
  component: 'bui-bitcoin-input',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    size: { 
      control: { type: 'select' }, 
      options: ['large', 'small'] 
    },
    showLabel: { control: 'boolean' },
    showIconLeft: { control: 'boolean' },
    showIconRight: { control: 'boolean' },
    iconRightAction: { control: 'text' },
    enableNodePubkey: { control: 'boolean' },
    enableRgbInvoice: { control: 'boolean' },
    enableNostrPubkey: { control: 'boolean' },
    unrecognizedMessage: { control: 'text' },
    unsupportedMessage: { control: 'text' },
  },
  args: {
    value: '',
    placeholder: 'Enter bitcoin address, invoice, or payment info...',
    label: 'Bitcoin Payment',
    size: 'large',
    showLabel: true,
    showIconLeft: false,
    showIconRight: false,
    iconRightAction: '',
    enableNodePubkey: false,
    enableRgbInvoice: false,
    enableNostrPubkey: false,
    unrecognizedMessage: 'Format not recognized. Please enter a valid bitcoin address, invoice, or payment info.',
    unsupportedMessage: 'This format is recognized but not currently supported.',
  },
};

// Basic bitcoin input
export const Default = {
  args: {
    label: 'Bitcoin Payment Address',
    placeholder: 'Enter bitcoin address or payment info...',
  },
  render: (args) => {
    const input = document.createElement('bui-bitcoin-input');
    input.value = args.value;
    input.placeholder = args.placeholder;
    input.label = args.label;
    input.size = args.size;
    input.showLabel = args.showLabel;
    input.showIconLeft = args.showIconLeft;
    input.showIconRight = args.showIconRight;
    input.iconRightAction = args.iconRightAction;
    input.enableNodePubkey = args.enableNodePubkey;
    input.enableRgbInvoice = args.enableRgbInvoice;
    input.enableNostrPubkey = args.enableNostrPubkey;
    input.unrecognizedMessage = args.unrecognizedMessage;
    input.unsupportedMessage = args.unsupportedMessage;
    return input;
  },
};

// Test cases with different inputs
export const TestCases = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '2rem';
    container.style.maxWidth = '600px';
    
    const testCases = [
      {
        label: 'Invalid Input Test',
        value: 'hello world',
        description: 'Should show danger mood and error message'
      },
      {
        label: 'Bitcoin Address Test',
        value: 'BC1QYLH3U67J673H6Y6ALV70M0PL2YZ53TZHVXGG7U',
        description: 'Should show success mood for valid bitcoin address'
      },
      {
        label: 'Lightning Offer Test',
        value: 'lno1qgs0v8hw8d368q9yw7sx8tejk2aujlyll8cp7tzzyh5h8xyppqqqqqqgqvqcdgq2qenxzatrv46pvggrv64u366d5c0rr2xjc3fq6vw2hh6ce3f9p7z4v4ee0u7avfynjw9q',
        description: 'Should show success mood for valid lightning offer'
      },
      {
        label: 'Lightning Address Test',
        value: 'ben@opreturnbot.com',
        description: 'Should show success mood for valid lightning address'
      },
      {
        label: 'BIP-21 URI Test',
        value: 'bitcoin:BC1QYLH3U67J673H6Y6ALV70M0PL2YZ53TZHVXGG7U?amount=0.00001&label=test&message=Test%20payment',
        description: 'Should show success mood for valid BIP-21 URI'
      }
    ];
    
    testCases.forEach(testCase => {
      const wrapper = document.createElement('div');
      wrapper.style.marginBottom = '1rem';
      
      const title = document.createElement('h3');
      title.textContent = testCase.label;
      title.style.margin = '0 0 0.5rem 0';
      title.style.fontSize = '1rem';
      title.style.fontWeight = 'bold';
      
      const description = document.createElement('p');
      description.textContent = testCase.description;
      description.style.margin = '0 0 1rem 0';
      description.style.fontSize = '0.875rem';
      description.style.color = '#666';
      
      const input = document.createElement('bui-bitcoin-input');
      input.label = testCase.label;
      input.value = testCase.value;
      input.showLabel = true;
      
      wrapper.appendChild(title);
      wrapper.appendChild(description);
      wrapper.appendChild(input);
      container.appendChild(wrapper);
    });
    
    return container;
  },
};

// With optional features enabled
export const WithOptionalFeatures = {
  args: {
    enableNodePubkey: true,
    enableRgbInvoice: true,
    enableNostrPubkey: true,
    label: 'Extended Bitcoin Input',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '2rem';
    container.style.maxWidth = '600px';
    
    const input = document.createElement('bui-bitcoin-input');
    input.value = args.value;
    input.placeholder = args.placeholder;
    input.label = args.label;
    input.size = args.size;
    input.showLabel = args.showLabel;
    input.showIconLeft = args.showIconLeft;
    input.showIconRight = args.showIconRight;
    input.iconRightAction = args.iconRightAction;
    input.enableNodePubkey = args.enableNodePubkey;
    input.enableRgbInvoice = args.enableRgbInvoice;
    input.enableNostrPubkey = args.enableNostrPubkey;
    input.unrecognizedMessage = args.unrecognizedMessage;
    input.unsupportedMessage = args.unsupportedMessage;
    
    const info = document.createElement('p');
    info.textContent = 'This instance has all optional features enabled: Node Pubkey, RGB Invoice, and Nostr Pubkey support.';
    info.style.fontSize = '0.875rem';
    info.style.color = '#666';
    info.style.margin = '0 0 1rem 0';
    
    container.appendChild(info);
    container.appendChild(input);
    
    return container;
  },
};

// With icons
export const WithIcons = {
  args: {
    showIconLeft: true,
    showIconRight: true,
    iconRightAction: 'scan',
  },
  render: (args) => {
    const input = document.createElement('bui-bitcoin-input');
    input.value = args.value;
    input.placeholder = args.placeholder;
    input.label = args.label;
    input.size = args.size;
    input.showLabel = args.showLabel;
    input.showIconLeft = args.showIconLeft;
    input.showIconRight = args.showIconRight;
    input.iconRightAction = args.iconRightAction;
    input.enableNodePubkey = args.enableNodePubkey;
    input.enableRgbInvoice = args.enableRgbInvoice;
    input.enableNostrPubkey = args.enableNostrPubkey;
    input.unrecognizedMessage = args.unrecognizedMessage;
    input.unsupportedMessage = args.unsupportedMessage;
    
    // Add search icon on the left
    const searchIcon = document.createElement('bui-icon-search-lg');
    searchIcon.slot = 'icon-left';
    input.appendChild(searchIcon);
    
    // Add scan icon on the right
    const scanIcon = document.createElement('bui-icon-scan-lg');
    scanIcon.slot = 'icon-right';
    input.appendChild(scanIcon);
    
    // Add event listener for scan button
    input.addEventListener('icon-right-click', (e) => {
      alert('Scan QR code clicked!');
    });
    
    return input;
  },
};

// Interactive demo
export const InteractiveDemo = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '2rem';
    container.style.maxWidth = '600px';
    
    const title = document.createElement('h3');
    title.textContent = 'Interactive Bitcoin Input Demo';
    title.style.margin = '0 0 1rem 0';
    
    const instructions = document.createElement('div');
    instructions.innerHTML = `
      <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #666;">
        Try pasting these test values to see the validation in action:
      </p>
      <ul style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #666; padding-left: 1.5rem;">
        <li><strong>Valid Bitcoin Address:</strong> BC1QYLH3U67J673H6Y6ALV70M0PL2YZ53TZHVXGG7U</li>
        <li><strong>Valid Lightning Offer:</strong> lno1qgs0v8hw8d368q9yw7sx8tejk2aujlyll8cp7tzzyh5h8xyppqqqqqqgqvqcdgq2qenxzatrv46pvggrv64u366d5c0rr2xjc3fq6vw2hh6ce3f9p7z4v4ee0u7avfynjw9q</li>
        <li><strong>Valid Lightning Address:</strong> ben@opreturnbot.com</li>
        <li><strong>Invalid Input:</strong> hello world</li>
      </ul>
    `;
    
    const input = document.createElement('bui-bitcoin-input');
    input.label = 'Bitcoin Payment Input';
    input.placeholder = 'Paste a bitcoin address, invoice, or payment info...';
    input.showLabel = true;
    
    const output = document.createElement('div');
    output.style.padding = '1rem';
    output.style.backgroundColor = '#f5f5f5';
    output.style.borderRadius = '8px';
    output.style.fontSize = '0.875rem';
    output.innerHTML = '<strong>Status:</strong> Waiting for input...';
    
    input.addEventListener('bitcoin-input', (e) => {
      const { value, mood, isValid } = e.detail;
      output.innerHTML = `
        <strong>Status:</strong> ${isValid ? 'Valid' : 'Invalid'}<br>
        <strong>Mood:</strong> ${mood}<br>
        <strong>Value:</strong> ${value || '(empty)'}
      `;
    });
    
    container.appendChild(title);
    container.appendChild(instructions);
    container.appendChild(input);
    container.appendChild(output);
    
    return container;
  },
};