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
