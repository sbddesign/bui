import '../avatar.js';

export default {
  title: 'BUI/Avatar',
  component: 'bui-avatar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A circular avatar component that can display either an image or a text-based gradient with optional initial letter.'
      }
    }
  },
  argTypes: {
    imageUrl: {
      control: 'text',
      description: 'URL of the image to display in the avatar'
    },
    text: {
      control: 'text',
      description: 'Text string used to generate gradient colors and optional initial letter'
    },
    showInitial: {
      control: 'boolean',
      description: 'Whether to show the first character of the text (only when no image is provided)'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the avatar'
    }
  },
  args: {
    text: 'Bitcoin',
    showInitial: true,
    size: 'medium'
  }
};

export const Default = {
  args: {
    text: 'Bitcoin',
    showInitial: true,
    size: 'medium'
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '64px';
    container.style.height = '64px';
    
    const avatar = document.createElement('bui-avatar');
    avatar.setAttribute('text', args.text || '');
    avatar.setAttribute('size', args.size || 'medium');
    if (args.showInitial) avatar.setAttribute('show-initial', '');
    if (args.imageUrl) avatar.setAttribute('image-url', args.imageUrl);
    
    container.appendChild(avatar);
    return container;
  }
};

export const WithImage = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    size: 'medium'
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '64px';
    container.style.height = '64px';
    
    const avatar = document.createElement('bui-avatar');
    avatar.setAttribute('image-url', args.imageUrl);
    avatar.setAttribute('size', args.size || 'medium');
    
    container.appendChild(avatar);
    return container;
  }
};

export const TextOnly = {
  args: {
    text: 'Alice',
    showInitial: true,
    size: 'medium'
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '64px';
    container.style.height = '64px';
    
    const avatar = document.createElement('bui-avatar');
    avatar.setAttribute('text', args.text || '');
    avatar.setAttribute('size', args.size || 'medium');
    if (args.showInitial) avatar.setAttribute('show-initial', '');
    
    container.appendChild(avatar);
    return container;
  }
};

export const TextWithoutInitial = {
  args: {
    text: 'Bob',
    showInitial: false,
    size: 'medium'
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.width = '64px';
    container.style.height = '64px';
    
    const avatar = document.createElement('bui-avatar');
    avatar.setAttribute('text', args.text || '');
    avatar.setAttribute('size', args.size || 'medium');
    if (args.showInitial) avatar.setAttribute('show-initial', '');
    
    container.appendChild(avatar);
    return container;
  }
};

export const DifferentNames = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '1rem';
    container.style.alignItems = 'center';
    container.style.flexWrap = 'wrap';
    
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
    
    names.forEach(name => {
      const wrapper = document.createElement('div');
      wrapper.style.width = '48px';
      wrapper.style.height = '48px';
      
      const avatar = document.createElement('bui-avatar');
      avatar.setAttribute('text', name);
      avatar.setAttribute('show-initial', '');
      avatar.setAttribute('size', 'small');
      
      wrapper.appendChild(avatar);
      container.appendChild(wrapper);
    });
    
    return container;
  }
};

export const DifferentSizes = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '1rem';
    container.style.alignItems = 'center';
    
    const sizes = [
      { size: 'small', containerSize: '48px' },
      { size: 'medium', containerSize: '64px' },
      { size: 'large', containerSize: '80px' }
    ];
    
    sizes.forEach(({ size, containerSize }) => {
      const wrapper = document.createElement('div');
      wrapper.style.width = containerSize;
      wrapper.style.height = containerSize;
      
      const avatar = document.createElement('bui-avatar');
      avatar.setAttribute('text', size.charAt(0).toUpperCase() + size.slice(1));
      avatar.setAttribute('show-initial', '');
      avatar.setAttribute('size', size);
      
      wrapper.appendChild(avatar);
      container.appendChild(wrapper);
    });
    
    return container;
  }
};

export const ResponsiveSizing = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(100px, 1fr))';
    container.style.gap = '1rem';
    container.style.maxWidth = '500px';
    
    const sizes = [
      { size: '50px', text: '50px' },
      { size: '75px', text: '75px' },
      { size: '100px', text: '100px' },
      { size: '150px', text: '150px' }
    ];
    
    sizes.forEach(({ size, text }) => {
      const wrapper = document.createElement('div');
      wrapper.style.width = size;
      wrapper.style.height = size;
      
      const avatar = document.createElement('bui-avatar');
      avatar.setAttribute('text', text);
      avatar.setAttribute('show-initial', '');
      
      wrapper.appendChild(avatar);
      container.appendChild(wrapper);
    });
    
    return container;
  }
};

export const WithImages = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '1rem';
    container.style.alignItems = 'center';
    container.style.flexWrap = 'wrap';
    
    const images = [
      { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', size: 'small', containerSize: '48px' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', size: 'medium', containerSize: '64px' },
      { url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', size: 'large', containerSize: '80px' }
    ];
    
    images.forEach(({ url, size, containerSize }) => {
      const wrapper = document.createElement('div');
      wrapper.style.width = containerSize;
      wrapper.style.height = containerSize;
      
      const avatar = document.createElement('bui-avatar');
      avatar.setAttribute('image-url', url);
      avatar.setAttribute('size', size);
      
      wrapper.appendChild(avatar);
      container.appendChild(wrapper);
    });
    
    return container;
  }
};

export const MixedContent = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '1rem';
    container.style.alignItems = 'center';
    container.style.flexWrap = 'wrap';
    
    const items = [
      { type: 'text', text: 'Bitcoin', showInitial: true },
      { type: 'image', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { type: 'text', text: 'Ethereum', showInitial: true },
      { type: 'text', text: 'Litecoin', showInitial: true }
    ];
    
    items.forEach(item => {
      const wrapper = document.createElement('div');
      wrapper.style.width = '64px';
      wrapper.style.height = '64px';
      
      const avatar = document.createElement('bui-avatar');
      avatar.setAttribute('size', 'medium');
      
      if (item.type === 'image') {
        avatar.setAttribute('image-url', item.imageUrl);
      } else {
        avatar.setAttribute('text', item.text);
        if (item.showInitial) {
          avatar.setAttribute('show-initial', '');
        }
      }
      
      wrapper.appendChild(avatar);
      container.appendChild(wrapper);
    });
    
    return container;
  }
};
