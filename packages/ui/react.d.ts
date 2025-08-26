export {};
import type * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'bui-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'content'?: string;
        'style-type'?: string;
        'size'?: string;
        'disabled'?: boolean;
        'label'?: string;
        'cluster'?: string;
        'wide'?: boolean;
      };
      'bui-message': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'text'?: string;
        'mood'?: string;
        'show-icon'?: boolean;
        'icon'?: string;
      };
    }
  }
}

export {};
