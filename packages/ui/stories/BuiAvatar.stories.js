import '../avatar.js';

// Helper function to create avatar with container
const createAvatarWithContainer = (args, containerSize = '64px') => {
  const container = document.createElement('div');
  container.style.width = containerSize;
  container.style.height = containerSize;
  
  const avatar = document.createElement('bui-avatar');
  if (args.imageUrl) avatar.setAttribute('image-url', args.imageUrl);
  if (args.imageUrl2x) avatar.setAttribute('image-url-2x', args.imageUrl2x);
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
    if (config.imageUrl2x) avatar.setAttribute('image-url-2x', config.imageUrl2x);
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
    imageUrl2x: {
      control: 'text',
      description: 'URL of the 2x resolution image for high-DPI displays'
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

export const TextWithoutInitial = {
  args: {
    text: 'Bob',
    showInitial: false,
    size: 'medium'
  },
  render: (args) => createAvatarWithContainer(args)
};

export const WithImage = {
  args: {
    imageUrl: './assets/avatars/Cat.png',
    imageUrl2x: './assets/avatars/Cat@2x.png',
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

export const WithImages = {
  render: () => createAvatarGrid([
    { imageUrl: './assets/avatars/Dog.png', imageUrl2x: './assets/avatars/Dog@2x.png', size: 'small', containerSize: '48px' },
    { imageUrl: './assets/avatars/Robot.png', imageUrl2x: './assets/avatars/Robot@2x.png', size: 'medium', containerSize: '64px' },
    { imageUrl: './assets/avatars/Dinosaur.png', imageUrl2x: './assets/avatars/Dinosaur@2x.png', size: 'large', containerSize: '80px' }
  ])
};

export const MixedContent = {
  render: () => createAvatarGrid([
    { text: 'Bitcoin', showInitial: true, size: 'medium' },
    { imageUrl: './assets/avatars/Bird.png', imageUrl2x: './assets/avatars/Bird@2x.png', size: 'medium' },
    { text: 'Ethereum', showInitial: true, size: 'medium' },
    { text: 'Litecoin', showInitial: true, size: 'medium' }
  ])
};

export const AllAvatarImages = {
  render: () => createAvatarGrid([
    { imageUrl: './assets/avatars/Cat.png', imageUrl2x: './assets/avatars/Cat@2x.png', size: 'medium', containerSize: '64px' },
    { imageUrl: './assets/avatars/Dog.png', imageUrl2x: './assets/avatars/Dog@2x.png', size: 'medium', containerSize: '64px' },
    { imageUrl: './assets/avatars/Bird.png', imageUrl2x: './assets/avatars/Bird@2x.png', size: 'medium', containerSize: '64px' },
    { imageUrl: './assets/avatars/Robot.png', imageUrl2x: './assets/avatars/Robot@2x.png', size: 'medium', containerSize: '64px' },
    { imageUrl: './assets/avatars/Dinosaur.png', imageUrl2x: './assets/avatars/Dinosaur@2x.png', size: 'medium', containerSize: '64px' },
    { imageUrl: './assets/avatars/Alligator.png', imageUrl2x: './assets/avatars/Alligator@2x.png', size: 'medium', containerSize: '64px' }
  ])
};
