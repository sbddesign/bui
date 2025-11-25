// Import all small icons
import '../../icons/dist/angleDown/sm.js';
import '../../icons/dist/angleLeft/sm.js';
import '../../icons/dist/angleRight/sm.js';
import '../../icons/dist/angleUp/sm.js';
import '../../icons/dist/arrowDown/sm.js';
import '../../icons/dist/arrowLeft/sm.js';
import '../../icons/dist/arrowRight/sm.js';
import '../../icons/dist/arrowUp/sm.js';
import '../../icons/dist/cycle/sm.js';
import '../../icons/dist/scan/sm.js';
import '../../icons/dist/search/sm.js';

// Import all medium icons
import '../../icons/dist/angleDown/md.js';
import '../../icons/dist/angleLeft/md.js';
import '../../icons/dist/angleRight/md.js';
import '../../icons/dist/angleUp/md.js';
import '../../icons/dist/arrowDown/md.js';
import '../../icons/dist/arrowLeft/md.js';
import '../../icons/dist/arrowRight/md.js';
import '../../icons/dist/arrowUp/md.js';
import '../../icons/dist/bitcoin/md.js';
import '../../icons/dist/checkCircle/md.js';
import '../../icons/dist/crossCircle/md.js';
import '../../icons/dist/cycle/md.js';
import '../../icons/dist/lightning/md.js';
import '../../icons/dist/scan/md.js';
import '../../icons/dist/search/md.js';

// Import all large icons
import '../../icons/dist/angleDown/lg.js';
import '../../icons/dist/angleLeft/lg.js';
import '../../icons/dist/angleRight/lg.js';
import '../../icons/dist/angleUp/lg.js';
import '../../icons/dist/arrowDown/lg.js';
import '../../icons/dist/arrowLeft/lg.js';
import '../../icons/dist/arrowRight/lg.js';
import '../../icons/dist/arrowUp/lg.js';
import '../../icons/dist/bitcoin/lg.js';
import '../../icons/dist/checkCircle/lg.js';
import '../../icons/dist/clipboard/lg.js';
import '../../icons/dist/crossCircle/lg.js';
import '../../icons/dist/cycle/lg.js';
import '../../icons/dist/lightning/lg.js';
import '../../icons/dist/scan/lg.js';
import '../../icons/dist/search/lg.js';
import '../../icons/dist/warning/lg.js';

export default {
  title: 'BUI/Icons',
  tags: ['autodocs'],
};

// Icon definitions organized by size
const iconGroups = {
  sm: [
    'angleDown',
    'angleLeft',
    'angleRight',
    'angleUp',
    'arrowDown',
    'arrowLeft',
    'arrowRight',
    'arrowUp',
    'cycle',
    'scan',
    'search',
  ],
  md: [
    'angleDown',
    'angleLeft',
    'angleRight',
    'angleUp',
    'arrowDown',
    'arrowLeft',
    'arrowRight',
    'arrowUp',
    'bitcoin',
    'checkCircle',
    'crossCircle',
    'cycle',
    'lightning',
    'scan',
    'search',
  ],
  lg: [
    'angleDown',
    'angleLeft',
    'angleRight',
    'angleUp',
    'arrowDown',
    'arrowLeft',
    'arrowRight',
    'arrowUp',
    'bitcoin',
    'checkCircle',
    'clipboard',
    'crossCircle',
    'cycle',
    'lightning',
    'scan',
    'search',
    'warning',
  ],
};

// Convert camelCase to kebab-case
function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function createIconGrid(icons, size) {
  const container = document.createElement('div');
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';
  container.style.gap = '24px';
  container.style.padding = '24px';

  icons.forEach((iconName) => {
    const iconItem = document.createElement('div');
    iconItem.style.display = 'flex';
    iconItem.style.flexDirection = 'column';
    iconItem.style.alignItems = 'center';
    iconItem.style.gap = '8px';
    iconItem.style.padding = '16px';
    iconItem.style.border = '1px solid var(--border-subtle, #e0e0e0)';
    iconItem.style.borderRadius = '8px';
    iconItem.style.backgroundColor = 'var(--background-subtle, #f5f5f5)';

    const kebabName = camelToKebab(iconName);
    const icon = document.createElement(`bui-${kebabName}-${size}`);
    icon.style.width = '48px';
    icon.style.height = '48px';
    icon.style.color = 'var(--text-primary, #000)';

    const label = document.createElement('div');
    label.textContent = `${iconName} (${size})`;
    label.style.fontSize = '12px';
    label.style.color = 'var(--text-secondary, #666)';
    label.style.textAlign = 'center';
    label.style.wordBreak = 'break-word';

    iconItem.appendChild(icon);
    iconItem.appendChild(label);
    container.appendChild(iconItem);
  });

  return container;
}

export const SmallIcons = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '32px';

    const title = document.createElement('h2');
    title.textContent = 'Small Icons (sm)';
    title.style.margin = '0';
    title.style.fontSize = '24px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--text-primary, #000)';

    wrapper.appendChild(title);
    wrapper.appendChild(createIconGrid(iconGroups.sm, 'sm'));

    return wrapper;
  },
};

export const MediumIcons = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '32px';

    const title = document.createElement('h2');
    title.textContent = 'Medium Icons (md)';
    title.style.margin = '0';
    title.style.fontSize = '24px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--text-primary, #000)';

    wrapper.appendChild(title);
    wrapper.appendChild(createIconGrid(iconGroups.md, 'md'));

    return wrapper;
  },
};

export const LargeIcons = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '32px';

    const title = document.createElement('h2');
    title.textContent = 'Large Icons (lg)';
    title.style.margin = '0';
    title.style.fontSize = '24px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--text-primary, #000)';

    wrapper.appendChild(title);
    wrapper.appendChild(createIconGrid(iconGroups.lg, 'lg'));

    return wrapper;
  },
};

export const AllIcons = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '48px';

    const mainTitle = document.createElement('h1');
    mainTitle.textContent = 'Icon Library';
    mainTitle.style.margin = '0';
    mainTitle.style.fontSize = '32px';
    mainTitle.style.fontWeight = '700';
    mainTitle.style.color = 'var(--text-primary, #000)';
    mainTitle.style.marginBottom = '16px';

    wrapper.appendChild(mainTitle);

    // Small icons section
    const smallSection = document.createElement('div');
    smallSection.style.display = 'flex';
    smallSection.style.flexDirection = 'column';
    smallSection.style.gap = '32px';
    const smallTitle = document.createElement('h2');
    smallTitle.textContent = 'Small Icons (sm)';
    smallTitle.style.margin = '0';
    smallTitle.style.fontSize = '24px';
    smallTitle.style.fontWeight = '600';
    smallTitle.style.color = 'var(--text-primary, #000)';
    smallSection.appendChild(smallTitle);
    smallSection.appendChild(createIconGrid(iconGroups.sm, 'sm'));
    wrapper.appendChild(smallSection);

    // Medium icons section
    const mediumSection = document.createElement('div');
    mediumSection.style.display = 'flex';
    mediumSection.style.flexDirection = 'column';
    mediumSection.style.gap = '32px';
    const mediumTitle = document.createElement('h2');
    mediumTitle.textContent = 'Medium Icons (md)';
    mediumTitle.style.margin = '0';
    mediumTitle.style.fontSize = '24px';
    mediumTitle.style.fontWeight = '600';
    mediumTitle.style.color = 'var(--text-primary, #000)';
    mediumSection.appendChild(mediumTitle);
    mediumSection.appendChild(createIconGrid(iconGroups.md, 'md'));
    wrapper.appendChild(mediumSection);

    // Large icons section
    const largeSection = document.createElement('div');
    largeSection.style.display = 'flex';
    largeSection.style.flexDirection = 'column';
    largeSection.style.gap = '32px';
    const largeTitle = document.createElement('h2');
    largeTitle.textContent = 'Large Icons (lg)';
    largeTitle.style.margin = '0';
    largeTitle.style.fontSize = '24px';
    largeTitle.style.fontWeight = '600';
    largeTitle.style.color = 'var(--text-primary, #000)';
    largeSection.appendChild(largeTitle);
    largeSection.appendChild(createIconGrid(iconGroups.lg, 'lg'));
    wrapper.appendChild(largeSection);

    return wrapper;
  },
};
