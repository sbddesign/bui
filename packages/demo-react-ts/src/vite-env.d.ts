/// <reference types="vite/client" />

// TypeScript declarations for BUI web components
declare namespace JSX {
  interface IntrinsicElements {
    'bui-button': {
      'style-type'?: 'filled' | 'outline' | 'free';
      size?: 'default' | 'small' | 'large';
      label?: string;
      content?: 'label' | 'icon' | 'label+icon' | 'icon+label';
      disabled?: boolean;
      wide?: boolean;
      cluster?: 'top' | 'bottom' | 'left' | 'right' | 'middle-horizontal' | 'middle-vertical';
    };
  }
}
