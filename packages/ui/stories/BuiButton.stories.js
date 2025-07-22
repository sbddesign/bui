import '../button.js';
import '../../icons/dist/arrowRight/lg.js';
import '../../icons/dist/arrowLeft/lg.js';

export default {
  title: 'BUI/Button',
  component: 'bui-button',
  tags: ['autodocs'],
  argTypes: {
    styleType: { control: { type: 'select' }, options: ['filled', 'outline', 'free'] },
    size: { control: { type: 'select' }, options: ['default', 'small', 'large'] },
    content: { control: { type: 'select' }, options: ['label', 'icon', 'label+icon', 'icon+label'] },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    label: 'Button',
    disabled: false,
    size: 'default',
    content: 'label',
    icon: 'cross'
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Filled = {
  args: {
    styleType: 'filled',
    label: 'Filled Button',
  },
};

export const Outline = {
  args: {
    styleType: 'outline',
    label: 'Outline Button',
  },
};

export const Free = {
  args: {
    styleType: 'free',
    label: 'Free Button',
  },
};

export const WithIcon = {
  args: {
    styleType: 'filled',
    content: 'label+icon',
    label: 'Button with Icon',
    icon: 'cross',
  },
};

export const WithSlotIcon = {
  args: {
    styleType: 'filled',
    content: 'label+icon',
    label: 'Back',
  },
  render: (args) => {
    const button = document.createElement('bui-button');
    button.setAttribute('style-type', args.styleType);
    button.setAttribute('content', args.content);
    button.setAttribute('label', args.label);
    button.setAttribute('size', args.size);
    if (args.disabled) button.setAttribute('disabled', '');
    
    const icon = document.createElement('bui-arrow-left-lg');
    icon.setAttribute('slot', 'icon');
    
    button.appendChild(icon);
    return button;
  },
};

export const IconOnly = {
  args: {
    styleType: 'filled',
    content: 'icon',
    icon: 'cross',
  },
};

export const IconOnlyWithSlot = {
  args: {
    styleType: 'filled',
    content: 'icon',
    size: 'small',
  },
  render: (args) => {
    const button = document.createElement('bui-button');
    button.setAttribute('style-type', args.styleType);
    button.setAttribute('content', args.content);
    button.setAttribute('size', args.size);
    if (args.disabled) button.setAttribute('disabled', '');
    
    const icon = document.createElement('bui-arrow-right-lg');
    icon.setAttribute('slot', 'icon');
    
    button.appendChild(icon);
    return button;
  },
};

export const Large = {
  args: {
    styleType: 'filled',
    size: 'large',
    label: 'Large Button',
  },
};

export const Small = {
  args: {
    styleType: 'outline',
    size: 'small',
    label: 'Small Button',
  },
};

export const IconLabelWithSlot = {
  args: {
    styleType: 'outline',
    content: 'icon+label',
    label: 'Next',
    size: 'default',
  },
  render: (args) => {
    const button = document.createElement('bui-button');
    button.setAttribute('style-type', args.styleType);
    button.setAttribute('content', args.content);
    button.setAttribute('label', args.label);
    button.setAttribute('size', args.size);
    if (args.disabled) button.setAttribute('disabled', '');
    
    const icon = document.createElement('bui-arrow-right-lg');
    icon.setAttribute('slot', 'icon');
    
    button.appendChild(icon);
    return button;
  },
};

export const Disabled = {
  args: {
    styleType: 'filled',
    disabled: true,
    label: 'Disabled Button',
  },
};

export const DisabledOutline = {
  args: {
    styleType: 'outline',
    disabled: true,
    label: 'Disabled Outline Button',
  },
};

export const DisabledFree = {
  args: {
    styleType: 'free',
    disabled: true,
    label: 'Disabled Free Button',
  },
};

export const AllStylesWithSlotIcon = {
  args: {
    content: 'label+icon',
    label: 'Back',
    size: 'default',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '1rem';
    container.style.flexWrap = 'wrap';
    
    const styles = ['filled', 'outline', 'free'];
    
    styles.forEach(styleType => {
      const button = document.createElement('bui-button');
      button.setAttribute('style-type', styleType);
      button.setAttribute('content', args.content);
      button.setAttribute('label', args.label);
      button.setAttribute('size', args.size);
      
      const icon = document.createElement('bui-arrow-left-lg');
      icon.setAttribute('slot', 'icon');
      
      button.appendChild(icon);
      container.appendChild(button);
    });
    
    return container;
  },
};

export const AllSizesWithSlotIcon = {
  args: {
    styleType: 'filled',
    content: 'label+icon',
    label: 'Back',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '1rem';
    container.style.flexWrap = 'wrap';
    container.style.alignItems = 'center';
    
    const sizes = ['small', 'default', 'large'];
    
    sizes.forEach(size => {
      const button = document.createElement('bui-button');
      button.setAttribute('style-type', args.styleType);
      button.setAttribute('content', args.content);
      button.setAttribute('label', args.label);
      button.setAttribute('size', size);
      
      const icon = document.createElement('bui-arrow-right-lg');
      icon.setAttribute('slot', 'icon');
      
      button.appendChild(icon);
      container.appendChild(button);
    });
    
    return container;
  },
};