import '../numpad.js';
import '../../icons/dist/angleLeft/outline/lg.js';

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
  render: (args) => {
    const numpad = document.createElement('bui-numpad');
    if (args.disabled) numpad.setAttribute('disabled', '');
    return numpad;
  },
  parameters: {
    docs: {
      description: {
        component:
          'A responsive numpad component with number buttons and backspace functionality. Events bubble up naturally from individual buttons - listen for "numpad-click" events on the numpad or individual buttons.',
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
      console.log('NumPad button clicked:', event.detail);

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
      feedback.textContent = `${event.detail.content}: ${event.detail.number}`;
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

export const EventHandling = {
  args: {
    disabled: false,
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 1rem;
    `;

    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Event Handling Demo';
    title.style.cssText = 'margin: 0 0 1rem 0; font-family: sans-serif;';
    container.appendChild(title);

    // Add description
    const description = document.createElement('p');
    description.textContent =
      'Click any button to see the event details. Events bubble up naturally from individual buttons.';
    description.style.cssText = 'margin: 0 0 1rem 0; font-family: sans-serif; color: #666;';
    container.appendChild(description);

    // Add numpad
    const numpad = document.createElement('bui-numpad');
    if (args.disabled) numpad.setAttribute('disabled', '');

    // Add event listener
    numpad.addEventListener('numpad-click', (event) => {
      console.log('NumPad button clicked:', event.detail);

      // Show feedback
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
      feedback.textContent = `${event.detail.content}: ${event.detail.number}`;
      document.body.appendChild(feedback);

      setTimeout(() => {
        document.body.removeChild(feedback);
      }, 2000);
    });

    container.appendChild(numpad);

    return container;
  },
};
