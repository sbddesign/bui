import '../numpad.js';
import '../../icons/dist/angleLeft/lg.js';

export default {
  title: 'BUI/NumPad',
  component: 'bui-numpad',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'A responsive numpad component with number buttons and backspace functionality. Supports responsive behavior with minimum 3 buttons per row.',
      },
    },
  },
};

export const Default = {
  args: {
    disabled: false,
  },
  render: (args) => {
    const numpad = document.createElement('bui-numpad');
    if (args.disabled) numpad.setAttribute('disabled', '');
    
    // Add event listener to demonstrate functionality
    numpad.addEventListener('numpad-click', (event) => {
      console.log('NumPad clicked:', event.detail);
      
      // Show feedback in the story
      const feedback = document.createElement('div');
      feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        z-index: 1000;
      `;
      feedback.textContent = `${event.detail.type}: ${event.detail.value}`;
      document.body.appendChild(feedback);
      
      setTimeout(() => {
        document.body.removeChild(feedback);
      }, 2000);
    });
    
    return numpad;
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const numpad = document.createElement('bui-numpad');
    if (args.disabled) numpad.setAttribute('disabled', '');
    return numpad;
  },
};
