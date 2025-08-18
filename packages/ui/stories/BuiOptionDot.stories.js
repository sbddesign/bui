import '../option-dot.js';

export default {
  title: 'BUI/OptionDot',
  component: 'bui-option-dot',
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
  },
  args: {
    active: false,
  },
};

export const Default = {
  args: {
    active: false,
  },
};

export const Active = {
  args: {
    active: true,
  },
};

export const Interactive = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '1rem';
    container.style.padding = '1rem';
    container.style.backgroundColor = 'var(--background)';
    container.style.borderRadius = '0.5rem';
    
    const label = document.createElement('div');
    label.textContent = 'Click dots to change active state:';
    label.style.fontWeight = '500';
    label.style.marginBottom = '0.5rem';
    
    const dotsContainer = document.createElement('div');
    dotsContainer.style.display = 'flex';
    dotsContainer.style.gap = '0.5rem';
    dotsContainer.style.alignItems = 'center';
    
    // Create interactive dots
    for (let i = 0; i < 4; i++) {
      const dot = document.createElement('bui-option-dot');
      dot.setAttribute('active', i === 0 ? 'true' : 'false');
      dot.style.cursor = 'pointer';
      dot.title = `Option ${i + 1}`;
      
      // Add click handler
      dot.addEventListener('click', () => {
        // Remove active from all dots
        dotsContainer.querySelectorAll('bui-option-dot').forEach(d => {
          d.setAttribute('active', 'false');
        });
        // Set clicked dot as active
        dot.setAttribute('active', 'true');
      });
      
      dotsContainer.appendChild(dot);
    }
    
    container.appendChild(label);
    container.appendChild(dotsContainer);
    
    return container;
  },
};
