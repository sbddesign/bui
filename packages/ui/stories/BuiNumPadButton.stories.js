import '../numpad-button.js';
import '../../icons/dist/arrowLeft/lg.js';
import '../../icons/dist/arrowRight/lg.js';
import '../../icons/dist/arrowUp/lg.js';
import '../../icons/dist/arrowDown/lg.js';
import '../../icons/dist/search/lg.js';
import '../../icons/dist/checkCircle/lg.js';
import '../../icons/dist/crossCircle/lg.js';
import '../../icons/dist/scan/lg.js';
import '../../icons/dist/clipboard/lg.js';
import '../../icons/dist/warning/lg.js';

export default {
  title: 'BUI/NumPad Button',
  component: 'bui-numpad-button',
  tags: ['autodocs'],
  argTypes: {
    number: { control: 'text' },
    content: { control: { type: 'select' }, options: ['number', 'icon'] },
    disabled: { control: 'boolean' },
  },
  args: {
    number: '1',
    content: 'number',
    disabled: false,
  },
};

export const Default = {
  args: {
    number: '1',
    content: 'number',
  },
};

export const NumberButtons = {
  args: {
    content: 'number',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    container.style.gap = '1rem';
    container.style.maxWidth = '450px';
    
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    
    numbers.forEach(number => {
      const button = document.createElement('bui-numpad-button');
      button.setAttribute('number', number);
      button.setAttribute('content', args.content);
      if (args.disabled) button.setAttribute('disabled', '');
      
      container.appendChild(button);
    });
    
    return container;
  },
};

export const WithIcon = {
  args: {
    content: 'icon',
  },
  render: (args) => {
    const button = document.createElement('bui-numpad-button');
    button.setAttribute('content', args.content);
    if (args.disabled) button.setAttribute('disabled', '');
    
    const icon = document.createElement('bui-arrow-left-lg');
    icon.setAttribute('slot', 'icon');
    
    button.appendChild(icon);
    return button;
  },
};

export const IconButtons = {
  args: {
    content: 'icon',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    container.style.gap = '1rem';
    container.style.maxWidth = '450px';
    
    const icons = [
      'bui-arrow-left-lg',
      'bui-arrow-right-lg',
      'bui-arrow-up-lg',
      'bui-arrow-down-lg',
      'bui-search-lg',
      'bui-check-circle-lg',
      'bui-cross-circle-lg',
      'bui-scan-lg',
      'bui-clipboard-lg'
    ];
    
    icons.forEach(iconName => {
      const button = document.createElement('bui-numpad-button');
      button.setAttribute('content', args.content);
      if (args.disabled) button.setAttribute('disabled', '');
      
      const icon = document.createElement(iconName);
      icon.setAttribute('slot', 'icon');
      
      button.appendChild(icon);
      container.appendChild(button);
    });
    
    return container;
  },
};

export const Disabled = {
  args: {
    number: '1',
    content: 'number',
    disabled: true,
  },
};

export const DisabledIcon = {
  args: {
    content: 'icon',
    disabled: true,
  },
  render: (args) => {
    const button = document.createElement('bui-numpad-button');
    button.setAttribute('content', args.content);
    button.setAttribute('disabled', '');
    
    const icon = document.createElement('bui-arrow-left-lg');
    icon.setAttribute('slot', 'icon');
    
    button.appendChild(icon);
    return button;
  },
};

export const AllStates = {
  args: {
    content: 'number',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(4, 1fr)';
    container.style.gap = '1rem';
    container.style.maxWidth = '600px';
    
    // Default state
    const defaultBtn = document.createElement('bui-numpad-button');
    defaultBtn.setAttribute('number', '1');
    defaultBtn.setAttribute('content', args.content);
    container.appendChild(defaultBtn);
    
    // Hover state (simulated with CSS)
    const hoverBtn = document.createElement('bui-numpad-button');
    hoverBtn.setAttribute('number', '2');
    hoverBtn.setAttribute('content', args.content);
    hoverBtn.style.setProperty('--component-numpad-bg', 'var(--component-numpad-hover-bg)');
    container.appendChild(hoverBtn);
    
    // Active state
    const activeBtn = document.createElement('bui-numpad-button');
    activeBtn.setAttribute('number', '3');
    activeBtn.setAttribute('content', args.content);
    activeBtn.style.setProperty('--component-numpad-bg', 'var(--component-numpad-active-bg)');
    container.appendChild(activeBtn);
    
    // Disabled state
    const disabledBtn = document.createElement('bui-numpad-button');
    disabledBtn.setAttribute('number', '4');
    disabledBtn.setAttribute('content', args.content);
    disabledBtn.setAttribute('disabled', '');
    container.appendChild(disabledBtn);
    
    return container;
  },
};

export const FullNumPad = {
  args: {
    content: 'number',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    container.style.gap = '0.5rem';
    container.style.maxWidth = '450px';
    container.style.padding = '1rem';
    container.style.background = 'var(--background)';
    container.style.borderRadius = '12px';
    container.style.border = '1px solid var(--system-divider)';
    
    const layout = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '', '0']
    ];
    
    layout.forEach(row => {
      row.forEach(number => {
        if (number) {
          const button = document.createElement('bui-numpad-button');
          button.setAttribute('number', number);
          button.setAttribute('content', args.content);
          if (args.disabled) button.setAttribute('disabled', '');
          container.appendChild(button);
        } else {
          // Empty space
          const spacer = document.createElement('div');
          spacer.style.width = '130px';
          spacer.style.height = '130px';
          container.appendChild(spacer);
        }
      });
    });
    
    return container;
  },
}; 