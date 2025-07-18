import '../button.js';

export default {
  title: 'BUI/Button',
  component: 'bui-button',
  tags: ['autodocs'],
  argTypes: {
    styleType: { control: { type: 'select' }, options: ['filled', 'outline', 'free'] },
    size: { control: { type: 'select' }, options: ['default', 'small', 'large'] },
    content: { control: { type: 'select' }, options: ['label', 'icon', 'label+icon', 'icon+label'] },
    active: { control: 'boolean' },
    icon: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    label: 'Button',
    active: true,
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

export const IconOnly = {
  args: {
    styleType: 'filled',
    content: 'icon',
    icon: 'cross',
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

export const Inactive = {
  args: {
    styleType: 'filled',
    active: false,
    label: 'Inactive Button',
  },
};