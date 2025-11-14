import type * as React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'bui-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'style-type'?: 'filled' | 'outline' | 'free';
        size?: 'default' | 'small' | 'large';
        label?: string;
        content?: 'label' | 'icon' | 'label+icon' | 'icon+label';
        disabled?: boolean;
        wide?: boolean;
        cluster?: 'top' | 'bottom' | 'left' | 'right' | 'middle-horizontal' | 'middle-vertical';
      };
      'bui-message': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        text?: string;
        mood?: 'neutral' | 'success' | 'caution' | 'danger';
        'show-icon'?: boolean;
        icon?: string;
      };
      'bui-avatar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'image-url'?: string;
        'image-url-2x'?: string;
        text?: string;
        'show-initial'?: boolean;
        size?: 'small' | 'medium' | 'large';
      };
    }
  }
}

export {};
