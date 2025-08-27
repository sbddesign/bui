import * as React from 'react';
import { BuiButton } from './dist/button.js';
import { BuiMessage } from './dist/message.js';

export declare const BuiButtonReact: React.ComponentType<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    'style-type'?: 'filled' | 'outline' | 'free';
    size?: 'default' | 'small' | 'large';
    label?: string;
    content?: 'label' | 'icon' | 'label+icon' | 'icon+label';
    disabled?: boolean;
    wide?: boolean;
    cluster?: 'top' | 'bottom' | 'left' | 'right' | 'middle-horizontal' | 'middle-vertical';
  }
>;

export declare const BuiMessageReact: React.ComponentType<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    text?: string;
    mood?: 'neutral' | 'success' | 'caution' | 'danger';
    'show-icon'?: boolean;
    icon?: string;
  }
>;

export {};
