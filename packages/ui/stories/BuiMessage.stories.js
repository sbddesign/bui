import '../message.js';
import { html } from 'lit';

export default {
  title: 'BUI/Message',
  component: 'bui-message',
  tags: ['autodocs'],
  argTypes: {
    mood: { control: { type: 'select' }, options: ['neutral', 'success', 'caution', 'danger'] },
    text: { control: 'text' },
    showIcon: { control: 'boolean' },
  },
  args: {
    text: 'For this small payment, you could save on fees by sending to a Lightning wallet.',
    mood: 'neutral',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        component: 'A message component that displays information with different mood states. Supports neutral, success, caution, and danger moods with appropriate colors and icons.',
      },
    },
  },
};

// Basic message examples
export const Neutral = {
  args: {
    mood: 'neutral',
    text: 'This is a neutral message with general information.',
  },
};

export const Success = {
  args: {
    mood: 'success',
    text: 'Your transaction was completed successfully!',
  },
};

export const Caution = {
  args: {
    mood: 'caution',
    text: 'Please review your transaction details before confirming.',
  },
};

export const Danger = {
  args: {
    mood: 'danger',
    text: 'Warning: This action cannot be undone.',
  },
};

export const WithoutIcon = {
  args: {
    mood: 'neutral',
    text: 'This message is displayed without an icon.',
    showIcon: false,
  },
};

// Interactive example
export const Interactive = {
  args: {
    mood: 'neutral',
    text: 'This message demonstrates the different mood states.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to change the mood and see how the message adapts with different colors and icons.',
      },
    },
  },
};

// Mood comparison
export const MoodComparison = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <bui-message mood="neutral" text="This is a neutral message with general information."></bui-message>
      <bui-message mood="success" text="Your transaction was completed successfully!"></bui-message>
      <bui-message mood="caution" text="Please review your transaction details before confirming."></bui-message>
      <bui-message mood="danger" text="Warning: This action cannot be undone."></bui-message>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all four mood states: neutral, success, caution, and danger.',
      },
    },
  },
};

// Theme demonstration
export const ThemeAware = {
  render: () => html`
    <div style="padding: 20px;">
      <h3 style="margin: 0 0 20px 0;">Theme-Aware Messages</h3>
      <p style="margin: 0 0 20px 0; font-size: 14px;">
        These messages automatically adapt to the current theme and mode. 
        The colors will change based on the selected theme (Bitcoin Design vs Conduit) and mode (light vs dark).
      </p>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <bui-message mood="neutral" text="This message adapts to the current theme."></bui-message>
        <bui-message mood="success" text="Success messages use theme-appropriate colors."></bui-message>
        <bui-message mood="caution" text="Caution messages maintain proper contrast."></bui-message>
        <bui-message mood="danger" text="Danger messages are clearly visible in all themes."></bui-message>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'The message component automatically adapts to the current theme (Bitcoin Design vs Conduit) and mode (light vs dark). Each mood uses appropriate colors for the selected theme.',
      },
    },
  },
}; 