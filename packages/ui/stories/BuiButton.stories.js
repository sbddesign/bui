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
};

const Template = (args) => {
  return Object.entries(args.variants).map(([desc, variant]) =>
    `<div style="margin: 0.5em 0;"><bui-button
      style-type="${variant.styleType}"
      size="${variant.size}"
      content="${variant.content}"
      ?active="${variant.active}"
      icon="${variant.icon}"
      label="${variant.label}"
    ></bui-button> <span style="margin-left: 1em; font-size: 0.9em; color: #888;">${desc}</span></div>`
  ).join('');
};

export const AllStates = Template.bind({});
AllStates.args = {
  variants: {
    'Filled (label)': { styleType: 'filled', size: 'default', content: 'label', active: true, icon: '', label: 'Label' },
    'Filled (icon)': { styleType: 'filled', size: 'default', content: 'icon', active: true, icon: 'cross', label: '' },
    'Filled (label+icon)': { styleType: 'filled', size: 'default', content: 'label+icon', active: true, icon: 'cross', label: 'Label' },
    'Outline (label)': { styleType: 'outline', size: 'default', content: 'label', active: true, icon: '', label: 'Label' },
    'Outline (icon)': { styleType: 'outline', size: 'default', content: 'icon', active: true, icon: 'cross', label: '' },
    'Outline (label+icon)': { styleType: 'outline', size: 'default', content: 'label+icon', active: true, icon: 'cross', label: 'Label' },
    'Free (label)': { styleType: 'free', size: 'default', content: 'label', active: true, icon: '', label: 'Label' },
    'Free (icon)': { styleType: 'free', size: 'default', content: 'icon', active: true, icon: 'cross', label: '' },
    'Free (label+icon)': { styleType: 'free', size: 'default', content: 'label+icon', active: true, icon: 'cross', label: 'Label' },
    'Large (filled)': { styleType: 'filled', size: 'large', content: 'label', active: true, icon: '', label: 'Large' },
    'Small (outline)': { styleType: 'outline', size: 'small', content: 'label', active: true, icon: '', label: 'Small' },
    'Inactive (filled)': { styleType: 'filled', size: 'default', content: 'label', active: false, icon: '', label: 'Inactive' },
  },
}; 