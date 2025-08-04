import '../input.js';
import '../../icons/dist/search/lg.js';
import '../../icons/dist/scan/lg.js';
import '../../icons/dist/crossCircle/lg.js';
import '../../icons/dist/checkCircle/lg.js';
import '../../icons/dist/warning/lg.js';

export default {
  title: 'BUI/Input',
  component: 'bui-input',
  tags: ['autodocs'],
  argTypes: {
    mood: { 
      control: { type: 'select' }, 
      options: ['neutral', 'caution', 'danger', 'success'] 
    },
    size: { 
      control: { type: 'select' }, 
      options: ['large', 'small'] 
    },
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    showLabel: { control: 'boolean' },
    showIconLeft: { control: 'boolean' },
    showIconRight: { control: 'boolean' },
    iconRightAction: { control: 'text' },
  },
  args: {
    mood: 'neutral',
    size: 'large',
    label: 'Label',
    value: '',
    placeholder: 'Enter text...',
    showLabel: true,
    showIconLeft: false,
    showIconRight: false,
    iconRightAction: '',
  },
};

// Basic input
export const Default = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
  render: (args) => {
    const input = document.createElement('bui-input');
    input.mood = args.mood;
    input.size = args.size;
    input.label = args.label;
    input.value = args.value;
    input.placeholder = args.placeholder;
    input.showLabel = args.showLabel;
    input.showIconLeft = args.showIconLeft;
    input.showIconRight = args.showIconRight;
    input.iconRightAction = args.iconRightAction;
    return input;
  },
};

// All moods
export const AllMoods = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '2rem';
    
    const moods = [
      { mood: 'neutral', label: 'Neutral Input', message: 'This is a neutral message' },
      { mood: 'caution', label: 'Caution Input', message: 'This is a caution message' },
      { mood: 'danger', label: 'Danger Input', message: 'This is a danger message' },
      { mood: 'success', label: 'Success Input', message: 'This is a success message' },
    ];
    
    moods.forEach(item => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.gap = '1rem';
      
      const label = document.createElement('h3');
      label.textContent = item.mood.charAt(0).toUpperCase() + item.mood.slice(1);
      label.style.margin = '0';
      label.style.fontSize = '1.125rem';
      label.style.color = 'var(--text-secondary)';
      
      const input = document.createElement('bui-input');
      input.mood = item.mood;
      input.label = item.label;
      input.placeholder = `Enter ${item.mood} text...`;
      
      const message = document.createElement('span');
      message.textContent = item.message;
      message.setAttribute('slot', 'message');
      input.appendChild(message);
      
      wrapper.appendChild(label);
      wrapper.appendChild(input);
      container.appendChild(wrapper);
    });
    
    return container;
  },
};

// All sizes
export const AllSizes = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '2rem';
    
    const sizes = [
      { size: 'large', label: 'Large Input' },
      { size: 'small', label: 'Small Input' },
    ];
    
    sizes.forEach(item => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.gap = '1rem';
      
      const label = document.createElement('h3');
      label.textContent = item.size.charAt(0).toUpperCase() + item.size.slice(1);
      label.style.margin = '0';
      label.style.fontSize = '1.125rem';
      label.style.color = 'var(--text-secondary)';
      
      const input = document.createElement('bui-input');
      input.size = item.size;
      input.label = item.label;
      input.placeholder = `Enter ${item.size} text...`;
      
      wrapper.appendChild(label);
      wrapper.appendChild(input);
      container.appendChild(wrapper);
    });
    
    return container;
  },
};

// With icons
export const WithIcons = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '2rem';
    
    const examples = [
      { 
        label: 'Search Input', 
        placeholder: 'Search...',
        showIconLeft: true,
        showIconRight: false,
        iconLeft: 'search-lg'
      },
      { 
        label: 'Scan Input', 
        placeholder: 'Scan QR code...',
        showIconLeft: true,
        showIconRight: true,
        iconLeft: 'scan-lg',
        iconRight: 'crossCircle-lg',
        iconRightAction: 'clear'
      },
      { 
        label: 'Success Input', 
        placeholder: 'Enter valid data...',
        mood: 'success',
        showIconLeft: false,
        showIconRight: true,
        iconRight: 'checkCircle-lg'
      },
    ];
    
    examples.forEach(example => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.gap = '1rem';
      
      const label = document.createElement('h3');
      label.textContent = example.label;
      label.style.margin = '0';
      label.style.fontSize = '1.125rem';
      label.style.color = 'var(--text-secondary)';
      
      const input = document.createElement('bui-input');
      input.label = example.label;
      input.placeholder = example.placeholder;
      input.mood = example.mood || 'neutral';
      input.showIconLeft = example.showIconLeft;
      input.showIconRight = example.showIconRight;
      input.iconRightAction = example.iconRightAction || '';
      
      if (example.showIconLeft && example.iconLeft) {
        const iconLeft = document.createElement(`bui-${example.iconLeft}`);
        iconLeft.setAttribute('slot', 'icon-left');
        input.appendChild(iconLeft);
      }
      
      if (example.showIconRight && example.iconRight) {
        const iconRight = document.createElement(`bui-${example.iconRight}`);
        iconRight.setAttribute('slot', 'icon-right');
        input.appendChild(iconRight);
      }
      
      wrapper.appendChild(label);
      wrapper.appendChild(input);
      container.appendChild(wrapper);
    });
    
    return container;
  },
};

// With messages
export const WithMessages = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '2rem';
    
    const examples = [
      { 
        mood: 'neutral',
        label: 'Neutral Input',
        message: 'This is a helpful message with neutral styling.',
        placeholder: 'Enter text...'
      },
      { 
        mood: 'caution',
        label: 'Caution Input',
        message: 'Please be careful with this input field.',
        placeholder: 'Enter carefully...'
      },
      { 
        mood: 'danger',
        label: 'Danger Input',
        message: 'This field contains an error that needs to be fixed.',
        placeholder: 'Fix the error...'
      },
      { 
        mood: 'success',
        label: 'Success Input',
        message: 'Great! This input is working correctly.',
        placeholder: 'Enter valid data...'
      },
    ];
    
    examples.forEach(example => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.gap = '1rem';
      
      const label = document.createElement('h3');
      label.textContent = example.mood.charAt(0).toUpperCase() + example.mood.slice(1);
      label.style.margin = '0';
      label.style.fontSize = '1.125rem';
      label.style.color = 'var(--text-secondary)';
      
      const input = document.createElement('bui-input');
      input.mood = example.mood;
      input.label = example.label;
      input.placeholder = example.placeholder;
      
      const message = document.createElement('span');
      message.textContent = example.message;
      message.setAttribute('slot', 'message');
      input.appendChild(message);
      
      wrapper.appendChild(label);
      wrapper.appendChild(input);
      container.appendChild(wrapper);
    });
    
    return container;
  },
};

// Complex message content
export const ComplexMessages = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '2rem';
    
    const examples = [
      { 
        mood: 'neutral',
        label: 'Input with Bullet List',
        placeholder: 'Enter text...',
        messageType: 'list'
      },
      { 
        mood: 'caution',
        label: 'Input with Link',
        placeholder: 'Enter text...',
        messageType: 'link'
      },
      { 
        mood: 'danger',
        label: 'Input with Icon',
        placeholder: 'Enter text...',
        messageType: 'icon'
      },
      { 
        mood: 'success',
        label: 'Input with Mixed Content',
        placeholder: 'Enter text...',
        messageType: 'mixed'
      },
    ];
    
    examples.forEach(example => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.gap = '1rem';
      
      const label = document.createElement('h3');
      label.textContent = example.label;
      label.style.margin = '0';
      label.style.fontSize = '1.125rem';
      label.style.color = 'var(--text-secondary)';
      
      const input = document.createElement('bui-input');
      input.mood = example.mood;
      input.label = example.label;
      input.placeholder = example.placeholder;
      
      // Create different types of message content
      const message = document.createElement('div');
      message.setAttribute('slot', 'message');
      
      switch (example.messageType) {
        case 'list':
          message.innerHTML = `
            <ul style="margin: 0; padding-left: 1rem;">
              <li style="margin-bottom: 0.35rem;">First requirement</li>
              <li style="margin-bottom: 0.35rem;">Second requirement</li>
              <li>Third requirement</li>
            </ul>
          `;
          break;
        case 'link':
          message.innerHTML = `
            <span>Please read our </span>
            <a href="#" style="color: inherit; text-decoration: underline;">terms of service</a>
            <span> before continuing.</span>
          `;
          break;
        case 'icon':
          const icon = document.createElement('bui-warning-lg');
          icon.style.width = '24px';
          icon.style.height = '24px';
          icon.style.marginLeft = '8px';
          icon.style.position = 'relative';
          icon.style.top = '6px';
          
          message.innerHTML = 'This field requires attention.';
          message.appendChild(icon);
          break;
        case 'mixed':
          message.innerHTML = `
            <div><strong>Success!</strong><br /><br /></div>
            <div>
                <a href="#" style="color: inherit; text-decoration: underline;">View details</a> or <a href="#" style="color: inherit; text-decoration: underline;">continue</a>.
            </div>
          `;
          break;
      }
      
      input.appendChild(message);
      
      wrapper.appendChild(label);
      wrapper.appendChild(input);
      container.appendChild(wrapper);
    });
    
    return container;
  },
};

// Interactive example
export const Interactive = {
  args: {
    mood: 'neutral',
    size: 'large',
    label: 'Interactive Input',
    value: '',
    placeholder: 'Type something...',
    showLabel: true,
    showIconLeft: true,
    showIconRight: true,
    iconRightAction: 'clear',
  },
  render: (args) => {
    const input = document.createElement('bui-input');
    input.mood = args.mood;
    input.size = args.size;
    input.label = args.label;
    input.value = args.value;
    input.placeholder = args.placeholder;
    input.showLabel = args.showLabel;
    input.showIconLeft = args.showIconLeft;
    input.showIconRight = args.showIconRight;
    input.iconRightAction = args.iconRightAction;
    
    // Add icons if needed
    if (args.showIconLeft) {
      const iconLeft = document.createElement('bui-search-lg');
      iconLeft.setAttribute('slot', 'icon-left');
      input.appendChild(iconLeft);
    }
    
    if (args.showIconRight) {
      const iconRight = document.createElement('bui-cross-circle-lg');
      iconRight.setAttribute('slot', 'icon-right');
      input.appendChild(iconRight);
    }
    
    // Add message
    const message = document.createElement('span');
    message.textContent = 'This is an interactive example';
    message.setAttribute('slot', 'message');
    input.appendChild(message);
    
    // Add event listeners
    input.addEventListener('input', (e) => {
      console.log('Input value changed:', e.detail.value);
    });
    
    input.addEventListener('icon-right-click', (e) => {
      console.log('Icon right clicked:', e.detail.action);
      if (e.detail.action === 'clear') {
        input.value = '';
      }
    });
    
    return input;
  },
}; 