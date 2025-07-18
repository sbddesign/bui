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

// Size comparison
export const SizeComparison = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <div>
        <p style="margin: 0 0 10px 0; font-size: 14px;">Big Size</p>
        <bui-toggle size="big" active="false"></bui-toggle>
      </div>
      <div>
        <p style="margin: 0 0 10px 0; font-size: 14px;">Small Size</p>
        <bui-toggle size="small" active="false"></bui-toggle>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Comparison of big and small toggle sizes.',
      },
    },
  },
};

// State comparison
export const StateComparison = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <div>
        <p style="margin: 0 0 10px 0; font-size: 14px;">Inactive</p>
        <bui-toggle size="big" active="false"></bui-toggle>
      </div>
      <div>
        <p style="margin: 0 0 10px 0; font-size: 14px;">Active</p>
        <bui-toggle size="big" active="true"></bui-toggle>
      </div>
      <div>
        <p style="margin: 0 0 10px 0; font-size: 14px;">Disabled</p>
        <bui-toggle size="big" active="false" disabled="true"></bui-toggle>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different toggle states: inactive, active, and disabled.',
      },
    },
  },
}; 