import '../button-cluster.js';
import '../button.js';
import '../../icons/dist/arrowLeft/outline/lg.js';
import '../../icons/dist/arrowRight/outline/lg.js';
import '../../icons/dist/search/outline/lg.js';
import '../../icons/dist/checkCircle/outline/lg.js';

export default {
  title: 'BUI/Button Cluster',
  component: 'bui-button-cluster',
  tags: ['autodocs'],
  argTypes: {
    direction: { control: { type: 'select' }, options: ['horizontal', 'vertical'] },
  },
  args: {
    direction: 'horizontal',
  },
};

export const Horizontal = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => {
    const cluster = document.createElement('bui-button-cluster');
    cluster.setAttribute('direction', args.direction);

    // Create buttons with different styles
    const button1 = document.createElement('bui-button');
    button1.setAttribute('style-type', 'filled');
    button1.setAttribute('content', 'label+icon');
    button1.setAttribute('label', 'Back');
    button1.setAttribute('cluster', 'left');
    const icon1 = document.createElement('bui-arrow-left-outline-lg');
    icon1.setAttribute('slot', 'icon');
    button1.appendChild(icon1);

    const button2 = document.createElement('bui-button');
    button2.setAttribute('style-type', 'filled');
    button2.setAttribute('content', 'label');
    button2.setAttribute('label', 'Save');
    button2.setAttribute('cluster', 'middle-horizontal');

    const button3 = document.createElement('bui-button');
    button3.setAttribute('style-type', 'filled');
    button3.setAttribute('content', 'label+icon');
    button3.setAttribute('label', 'Next');
    button3.setAttribute('cluster', 'right');
    const icon3 = document.createElement('bui-arrow-right-outline-lg');
    icon3.setAttribute('slot', 'icon');
    button3.appendChild(icon3);

    cluster.appendChild(button1);
    cluster.appendChild(button2);
    cluster.appendChild(button3);

    return cluster;
  },
};

export const Vertical = {
  args: {
    direction: 'vertical',
  },
  render: (args) => {
    const cluster = document.createElement('bui-button-cluster');
    cluster.setAttribute('direction', args.direction);

    // Create buttons with different styles
    const button1 = document.createElement('bui-button');
    button1.setAttribute('style-type', 'outline');
    button1.setAttribute('content', 'label+icon');
    button1.setAttribute('label', 'Option 1');
    button1.setAttribute('cluster', 'top');
    button1.setAttribute('wide', 'true');
    const icon1 = document.createElement('bui-search-outline-lg');
    icon1.setAttribute('slot', 'icon');
    button1.appendChild(icon1);

    const button2 = document.createElement('bui-button');
    button2.setAttribute('style-type', 'outline');
    button2.setAttribute('content', 'label');
    button2.setAttribute('label', 'Option 2');
    button2.setAttribute('cluster', 'middle-vertical');
    button2.setAttribute('wide', 'true');

    const button3 = document.createElement('bui-button');
    button3.setAttribute('style-type', 'outline');
    button3.setAttribute('content', 'label+icon');
    button3.setAttribute('label', 'Option 3');
    button3.setAttribute('cluster', 'bottom');
    button3.setAttribute('wide', 'true');
    const icon3 = document.createElement('bui-check-circle-outline-lg');
    icon3.setAttribute('slot', 'icon');
    button3.appendChild(icon3);

    cluster.appendChild(button1);
    cluster.appendChild(button2);
    cluster.appendChild(button3);

    return cluster;
  },
};

export const MixedStyles = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => {
    const cluster = document.createElement('bui-button-cluster');
    cluster.setAttribute('direction', args.direction);

    // Create buttons with different styles and sizes
    const button1 = document.createElement('bui-button');
    button1.setAttribute('style-type', 'filled');
    button1.setAttribute('content', 'icon');
    button1.setAttribute('size', 'large');
    button1.setAttribute('cluster', 'left');
    const icon1 = document.createElement('bui-arrow-left-outline-lg');
    icon1.setAttribute('slot', 'icon');
    button1.appendChild(icon1);

    const button2 = document.createElement('bui-button');
    button2.setAttribute('style-type', 'outline');
    button2.setAttribute('content', 'label');
    button2.setAttribute('label', 'Center');
    button2.setAttribute('size', 'large');
    button2.setAttribute('cluster', 'middle-horizontal');

    const button3 = document.createElement('bui-button');
    button3.setAttribute('style-type', 'filled');
    button3.setAttribute('content', 'icon');
    button3.setAttribute('size', 'large');
    button3.setAttribute('cluster', 'right');
    const icon3 = document.createElement('bui-arrow-right-outline-lg');
    icon3.setAttribute('slot', 'icon');
    button3.appendChild(icon3);

    cluster.appendChild(button1);
    cluster.appendChild(button2);
    cluster.appendChild(button3);

    return cluster;
  },
};

export const SingleButton = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => {
    const cluster = document.createElement('bui-button-cluster');
    cluster.setAttribute('direction', args.direction);

    const button = document.createElement('bui-button');
    button.setAttribute('style-type', 'filled');
    button.setAttribute('content', 'label+icon');
    button.setAttribute('label', 'Single Button');
    const icon = document.createElement('bui-check-circle-outline-lg');
    icon.setAttribute('slot', 'icon');
    button.appendChild(icon);

    cluster.appendChild(button);

    return cluster;
  },
};

export const TwoButtons = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => {
    const cluster = document.createElement('bui-button-cluster');
    cluster.setAttribute('direction', args.direction);

    const button1 = document.createElement('bui-button');
    button1.setAttribute('style-type', 'filled');
    button1.setAttribute('content', 'label');
    button1.setAttribute('label', 'Cancel');
    button1.setAttribute('cluster', 'left');

    const button2 = document.createElement('bui-button');
    button2.setAttribute('style-type', 'filled');
    button2.setAttribute('content', 'label');
    button2.setAttribute('label', 'Confirm');
    button2.setAttribute('cluster', 'right');

    cluster.appendChild(button1);
    cluster.appendChild(button2);

    return cluster;
  },
};

export const LargeCluster = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => {
    const cluster = document.createElement('bui-button-cluster');
    cluster.setAttribute('direction', args.direction);

    const buttons = [
      { label: 'First', icon: 'bui-arrow-left-outline-lg', cluster: 'left' },
      { label: 'Second', icon: null, cluster: 'middle-horizontal' },
      { label: 'Third', icon: null, cluster: 'middle-horizontal' },
      { label: 'Fourth', icon: null, cluster: 'middle-horizontal' },
      { label: 'Last', icon: 'bui-arrow-right-outline-lg', cluster: 'right' },
    ];

    buttons.forEach((btn, index) => {
      const button = document.createElement('bui-button');
      button.setAttribute('style-type', 'filled');
      button.setAttribute('content', btn.icon ? 'label+icon' : 'label');
      button.setAttribute('label', btn.label);
      button.setAttribute('cluster', btn.cluster);

      if (btn.icon) {
        const icon = document.createElement(btn.icon);
        icon.setAttribute('slot', 'icon');
        button.appendChild(icon);
      }

      cluster.appendChild(button);
    });

    return cluster;
  },
};

export const VerticalLarge = {
  args: {
    direction: 'vertical',
  },
  render: (args) => {
    const cluster = document.createElement('bui-button-cluster');
    cluster.setAttribute('direction', args.direction);

    const buttons = [
      { label: 'Top', icon: 'bui-arrow-up-outline-lg', cluster: 'top' },
      { label: 'Middle 1', icon: null, cluster: 'middle-vertical' },
      { label: 'Middle 2', icon: null, cluster: 'middle-vertical' },
      { label: 'Middle 3', icon: null, cluster: 'middle-vertical' },
      { label: 'Bottom', icon: 'bui-arrow-down-outline-lg', cluster: 'bottom' },
    ];

    buttons.forEach((btn, index) => {
      const button = document.createElement('bui-button');
      button.setAttribute('style-type', 'outline');
      button.setAttribute('content', btn.icon ? 'label+icon' : 'label');
      button.setAttribute('label', btn.label);
      button.setAttribute('cluster', btn.cluster);
      button.setAttribute('wide', 'true');

      if (btn.icon) {
        const icon = document.createElement(btn.icon);
        icon.setAttribute('slot', 'icon');
        button.appendChild(icon);
      }

      cluster.appendChild(button);
    });

    return cluster;
  },
};
