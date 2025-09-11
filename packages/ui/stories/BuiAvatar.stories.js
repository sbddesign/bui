import '../avatar.js';

// Helper function to create avatar with container
const createAvatarWithContainer = (args, containerSize = '64px') => {
  const container = document.createElement('div');
  container.style.width = containerSize;
  container.style.height = containerSize;
  
  const avatar = document.createElement('bui-avatar');
  if (args.imageUrl) avatar.setAttribute('image-url', args.imageUrl);
  if (args.text) avatar.setAttribute('text', args.text);
  if (args.size) avatar.setAttribute('size', args.size);
  
  // Handle boolean attribute properly
  if (args.showInitial === true) {
    avatar.setAttribute('show-initial', '');
  } else if (args.showInitial === false) {
    avatar.removeAttribute('show-initial');
  }
  
  container.appendChild(avatar);
  return container;
};

// Helper function to create multiple avatars in a flex container
const createAvatarGrid = (avatarConfigs, containerSize = '64px') => {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.gap = '1rem';
  container.style.alignItems = 'center';
  container.style.flexWrap = 'wrap';
  
  avatarConfigs.forEach(config => {
    const wrapper = document.createElement('div');
    wrapper.style.width = config.containerSize || containerSize;
    wrapper.style.height = config.containerSize || containerSize;
    
    const avatar = document.createElement('bui-avatar');
    if (config.imageUrl) avatar.setAttribute('image-url', config.imageUrl);
    if (config.text) avatar.setAttribute('text', config.text);
    if (config.size) avatar.setAttribute('size', config.size);
    
    // Handle boolean attribute properly
    if (config.showInitial === true) {
      avatar.setAttribute('show-initial', '');
    } else if (config.showInitial === false) {
      avatar.removeAttribute('show-initial');
    }
    
    wrapper.appendChild(avatar);
    container.appendChild(wrapper);
  });
  
  return container;
};

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
  render: (args) => createAvatarWithContainer(args)
};

export const WithImage = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    size: 'medium'
  },
  render: (args) => createAvatarWithContainer(args)
};

export const TextOnly = {
  args: {
    text: 'Alice',
    showInitial: true,
    size: 'medium'
  },
  render: (args) => createAvatarWithContainer(args)
};

export const TextWithoutInitial = {
  args: {
    text: 'Bob',
    showInitial: false,
    size: 'medium'
  },
  render: (args) => createAvatarWithContainer(args)
};

export const ShowInitialComparison = {
  render: () => createAvatarGrid([
    { text: 'Alice', showInitial: true, size: 'medium', containerSize: '64px' },
    { text: 'Alice', showInitial: false, size: 'medium', containerSize: '64px' },
    { text: 'Bob', showInitial: true, size: 'medium', containerSize: '64px' },
    { text: 'Bob', showInitial: false, size: 'medium', containerSize: '64px' }
  ])
};

export const DifferentNames = {
  render: () => createAvatarGrid(
    ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'].map(name => ({
      text: name,
      showInitial: true,
      size: 'small',
      containerSize: '48px'
    }))
  )
};

export const DifferentSizes = {
  render: () => createAvatarGrid([
    { text: 'Small', showInitial: true, size: 'small', containerSize: '48px' },
    { text: 'Medium', showInitial: true, size: 'medium', containerSize: '64px' },
    { text: 'Large', showInitial: true, size: 'large', containerSize: '80px' }
  ])
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
  render: () => createAvatarGrid([
    { imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', size: 'small', containerSize: '48px' },
    { imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', size: 'medium', containerSize: '64px' },
    { imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', size: 'large', containerSize: '80px' }
  ])
};

export const MixedContent = {
  render: () => createAvatarGrid([
    { text: 'Bitcoin', showInitial: true, size: 'medium' },
    { imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', size: 'medium' },
    { text: 'Ethereum', showInitial: true, size: 'medium' },
    { text: 'Litecoin', showInitial: true, size: 'medium' }
  ])
};
