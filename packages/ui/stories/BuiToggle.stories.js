import '../toggle.js';
import { html } from 'lit';

export default {
  title: 'BUI/Toggle',
  component: 'bui-toggle',
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: ['big', 'small'] },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    active: false,
    disabled: false,
    size: 'big',
  },
  parameters: {
    docs: {
      description: {
        component: 'A toggle switch component that can be used to enable/disable features or settings. Supports two sizes and can be disabled.',
      },
    },
  },
};

// Basic toggle examples
export const Default = {
  args: {
    active: false,
    size: 'big',
  },
};

export const Active = {
  args: {
    active: true,
    size: 'big',
  },
};

export const Small = {
  args: {
    active: false,
    size: 'small',
  },
};

export const SmallActive = {
  args: {
    active: true,
    size: 'small',
  },
};

export const Disabled = {
  args: {
    active: false,
    disabled: true,
    size: 'big',
  },
};

export const DisabledActive = {
  args: {
    active: true,
    disabled: true,
    size: 'big',
  },
};

// Interactive example
export const Interactive = {
  args: {
    active: false,
    size: 'big',
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the toggle to see it switch between states. The component emits a "toggle" event when clicked.',
      },
    },
  },
};
