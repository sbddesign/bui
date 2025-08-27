import React from 'react';
import {createComponent} from '@lit/react';
import {BuiButton} from './dist/button.js';
import {BuiMessage} from './dist/message.js';

export const BuiButtonReact = createComponent({
  tagName: 'bui-button',
  elementClass: BuiButton,
  react: React,
  // Map common DOM events if needed (React prop -> DOM event)
  // Example: 'onclick' would map to standard 'click'
  events: {
    onclick: 'click',
  },
});

export const BuiMessageReact = createComponent({
  tagName: 'bui-message',
  elementClass: BuiMessage,
  react: React,
  events: {
    onclick: 'click',
  },
});


