import * as React from 'react';
import { type EventName } from '@lit/react';
import { BuiButton } from './dist/button.js';
import { BuiMessage } from './dist/message.js';

export declare const BuiButtonReact: React.ComponentType<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onclick?: (e: Event) => void;
  }
>;

export declare const BuiMessageReact: React.ComponentType<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    onclick?: (e: Event) => void;
  }
>;
export {}
