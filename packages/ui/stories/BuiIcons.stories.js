// Import all small outline icons
import '../../icons/dist/angleDown/outline/sm.js';
import '../../icons/dist/angleLeft/outline/sm.js';
import '../../icons/dist/angleRight/outline/sm.js';
import '../../icons/dist/angleUp/outline/sm.js';
import '../../icons/dist/arrowDown/outline/sm.js';
import '../../icons/dist/arrowLeft/outline/sm.js';
import '../../icons/dist/arrowRight/outline/sm.js';
import '../../icons/dist/arrowUp/outline/sm.js';
import '../../icons/dist/cycle/outline/sm.js';
import '../../icons/dist/scan/outline/sm.js';
import '../../icons/dist/search/outline/sm.js';

// Import all medium outline icons
import '../../icons/dist/angleDown/outline/md.js';
import '../../icons/dist/angleLeft/outline/md.js';
import '../../icons/dist/angleRight/outline/md.js';
import '../../icons/dist/angleUp/outline/md.js';
import '../../icons/dist/arrowDown/outline/md.js';
import '../../icons/dist/arrowLeft/outline/md.js';
import '../../icons/dist/arrowRight/outline/md.js';
import '../../icons/dist/arrowUp/outline/md.js';
import '../../icons/dist/bitcoin/outline/md.js';
import '../../icons/dist/checkCircle/outline/md.js';
import '../../icons/dist/crossCircle/outline/md.js';
import '../../icons/dist/cycle/outline/md.js';
import '../../icons/dist/lightning/outline/md.js';
import '../../icons/dist/scan/outline/md.js';
import '../../icons/dist/search/outline/md.js';

// Import all large outline icons
import '../../icons/dist/angleDown/outline/lg.js';
import '../../icons/dist/angleLeft/outline/lg.js';
import '../../icons/dist/angleRight/outline/lg.js';
import '../../icons/dist/angleUp/outline/lg.js';
import '../../icons/dist/arrowDown/outline/lg.js';
import '../../icons/dist/arrowLeft/outline/lg.js';
import '../../icons/dist/arrowRight/outline/lg.js';
import '../../icons/dist/arrowUp/outline/lg.js';
import '../../icons/dist/bitcoin/outline/lg.js';
import '../../icons/dist/checkCircle/outline/lg.js';
import '../../icons/dist/clipboard/outline/lg.js';
import '../../icons/dist/crossCircle/outline/lg.js';
import '../../icons/dist/cycle/outline/lg.js';
import '../../icons/dist/lightning/outline/lg.js';
import '../../icons/dist/scan/outline/lg.js';
import '../../icons/dist/search/outline/lg.js';
import '../../icons/dist/warning/outline/lg.js';

// Import all small solid icons
import '../../icons/dist/lightning/solid/sm.js';

// Import all medium solid icons
import '../../icons/dist/lightning/solid/md.js';

// Import all large solid icons
import '../../icons/dist/lightning/solid/lg.js';

export default {
  title: 'BUI/Icons',
  tags: ['autodocs'],
};

// Icon definitions organized by size and variant
const iconGroups = {
  outline: {
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
  },
  solid: {
    sm: ['lightning'],
    md: ['lightning'],
    lg: ['lightning'],
  },
};

// Convert camelCase to kebab-case
function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function createIconGrid(icons, size, variant) {
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
    iconItem.style.justifyContent = 'center';
    iconItem.style.gap = '8px';
    iconItem.style.padding = '16px';
    iconItem.style.border = '1px solid var(--system-divider)';
    iconItem.style.borderRadius = '8px';
    iconItem.style.backgroundColor = 'var(--system-placeholder)';

    const kebabName = camelToKebab(iconName);
    const icon = document.createElement(`bui-${kebabName}-${variant}-${size}`);

    // Set icon size based on size variant
    const iconSizes = {
      sm: '12px',
      md: '16px',
      lg: '24px',
    };
    icon.style.width = iconSizes[size];
    icon.style.height = iconSizes[size];
    icon.style.color = 'var(--text-primary)';

    const label = document.createElement('div');
    label.textContent = `${iconName} (${variant}, ${size})`;
    label.style.fontSize = '12px';
    label.style.color = 'var(--text-secondary)';
    label.style.textAlign = 'center';
    label.style.wordBreak = 'break-word';

    iconItem.appendChild(icon);
    iconItem.appendChild(label);
    container.appendChild(iconItem);
  });

  return container;
}

// Outline icons stories
export const OutlineSmallIcons = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '32px';

    const title = document.createElement('h2');
    title.textContent = 'Outline Small Icons (sm)';
    title.style.margin = '0';
    title.style.fontSize = '24px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--text-primary)';

    wrapper.appendChild(title);
    wrapper.appendChild(createIconGrid(iconGroups.outline.sm, 'sm', 'outline'));

    return wrapper;
  },
};

export const OutlineMediumIcons = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '32px';

    const title = document.createElement('h2');
    title.textContent = 'Outline Medium Icons (md)';
    title.style.margin = '0';
    title.style.fontSize = '24px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--text-primary)';

    wrapper.appendChild(title);
    wrapper.appendChild(createIconGrid(iconGroups.outline.md, 'md', 'outline'));

    return wrapper;
  },
};

export const OutlineLargeIcons = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '32px';

    const title = document.createElement('h2');
    title.textContent = 'Outline Large Icons (lg)';
    title.style.margin = '0';
    title.style.fontSize = '24px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--text-primary)';

    wrapper.appendChild(title);
    wrapper.appendChild(createIconGrid(iconGroups.outline.lg, 'lg', 'outline'));

    return wrapper;
  },
};

// Solid icons stories
export const SolidSmallIcons = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '32px';

    const title = document.createElement('h2');
    title.textContent = 'Solid Small Icons (sm)';
    title.style.margin = '0';
    title.style.fontSize = '24px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--text-primary)';

    wrapper.appendChild(title);
    wrapper.appendChild(createIconGrid(iconGroups.solid.sm, 'sm', 'solid'));

    return wrapper;
  },
};

export const SolidMediumIcons = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '32px';

    const title = document.createElement('h2');
    title.textContent = 'Solid Medium Icons (md)';
    title.style.margin = '0';
    title.style.fontSize = '24px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--text-primary)';

    wrapper.appendChild(title);
    wrapper.appendChild(createIconGrid(iconGroups.solid.md, 'md', 'solid'));

    return wrapper;
  },
};

export const SolidLargeIcons = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '32px';

    const title = document.createElement('h2');
    title.textContent = 'Solid Large Icons (lg)';
    title.style.margin = '0';
    title.style.fontSize = '24px';
    title.style.fontWeight = '600';
    title.style.color = 'var(--text-primary)';

    wrapper.appendChild(title);
    wrapper.appendChild(createIconGrid(iconGroups.solid.lg, 'lg', 'solid'));

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
    mainTitle.style.color = 'var(--text-primary)';
    mainTitle.style.marginBottom = '16px';

    wrapper.appendChild(mainTitle);

    // Outline icons section
    const outlineSection = document.createElement('div');
    outlineSection.style.display = 'flex';
    outlineSection.style.flexDirection = 'column';
    outlineSection.style.gap = '48px';

    const outlineTitle = document.createElement('h2');
    outlineTitle.textContent = 'Outline Icons';
    outlineTitle.style.margin = '0';
    outlineTitle.style.fontSize = '28px';
    outlineTitle.style.fontWeight = '700';
    outlineTitle.style.color = 'var(--text-primary)';
    outlineSection.appendChild(outlineTitle);

    // Small outline icons
    const smallOutlineSection = document.createElement('div');
    smallOutlineSection.style.display = 'flex';
    smallOutlineSection.style.flexDirection = 'column';
    smallOutlineSection.style.gap = '32px';
    const smallOutlineTitle = document.createElement('h3');
    smallOutlineTitle.textContent = 'Small Icons (sm)';
    smallOutlineTitle.style.margin = '0';
    smallOutlineTitle.style.fontSize = '24px';
    smallOutlineTitle.style.fontWeight = '600';
    smallOutlineTitle.style.color = 'var(--text-primary)';
    smallOutlineSection.appendChild(smallOutlineTitle);
    smallOutlineSection.appendChild(createIconGrid(iconGroups.outline.sm, 'sm', 'outline'));
    outlineSection.appendChild(smallOutlineSection);

    // Medium outline icons
    const mediumOutlineSection = document.createElement('div');
    mediumOutlineSection.style.display = 'flex';
    mediumOutlineSection.style.flexDirection = 'column';
    mediumOutlineSection.style.gap = '32px';
    const mediumOutlineTitle = document.createElement('h3');
    mediumOutlineTitle.textContent = 'Medium Icons (md)';
    mediumOutlineTitle.style.margin = '0';
    mediumOutlineTitle.style.fontSize = '24px';
    mediumOutlineTitle.style.fontWeight = '600';
    mediumOutlineTitle.style.color = 'var(--text-primary)';
    mediumOutlineSection.appendChild(mediumOutlineTitle);
    mediumOutlineSection.appendChild(createIconGrid(iconGroups.outline.md, 'md', 'outline'));
    outlineSection.appendChild(mediumOutlineSection);

    // Large outline icons
    const largeOutlineSection = document.createElement('div');
    largeOutlineSection.style.display = 'flex';
    largeOutlineSection.style.flexDirection = 'column';
    largeOutlineSection.style.gap = '32px';
    const largeOutlineTitle = document.createElement('h3');
    largeOutlineTitle.textContent = 'Large Icons (lg)';
    largeOutlineTitle.style.margin = '0';
    largeOutlineTitle.style.fontSize = '24px';
    largeOutlineTitle.style.fontWeight = '600';
    largeOutlineTitle.style.color = 'var(--text-primary)';
    largeOutlineSection.appendChild(largeOutlineTitle);
    largeOutlineSection.appendChild(createIconGrid(iconGroups.outline.lg, 'lg', 'outline'));
    outlineSection.appendChild(largeOutlineSection);

    wrapper.appendChild(outlineSection);

    // Solid icons section
    const solidSection = document.createElement('div');
    solidSection.style.display = 'flex';
    solidSection.style.flexDirection = 'column';
    solidSection.style.gap = '48px';

    const solidTitle = document.createElement('h2');
    solidTitle.textContent = 'Solid Icons';
    solidTitle.style.margin = '0';
    solidTitle.style.fontSize = '28px';
    solidTitle.style.fontWeight = '700';
    solidTitle.style.color = 'var(--text-primary)';
    solidSection.appendChild(solidTitle);

    // Small solid icons
    const smallSolidSection = document.createElement('div');
    smallSolidSection.style.display = 'flex';
    smallSolidSection.style.flexDirection = 'column';
    smallSolidSection.style.gap = '32px';
    const smallSolidTitle = document.createElement('h3');
    smallSolidTitle.textContent = 'Small Icons (sm)';
    smallSolidTitle.style.margin = '0';
    smallSolidTitle.style.fontSize = '24px';
    smallSolidTitle.style.fontWeight = '600';
    smallSolidTitle.style.color = 'var(--text-primary)';
    smallSolidSection.appendChild(smallSolidTitle);
    smallSolidSection.appendChild(createIconGrid(iconGroups.solid.sm, 'sm', 'solid'));
    solidSection.appendChild(smallSolidSection);

    // Medium solid icons
    const mediumSolidSection = document.createElement('div');
    mediumSolidSection.style.display = 'flex';
    mediumSolidSection.style.flexDirection = 'column';
    mediumSolidSection.style.gap = '32px';
    const mediumSolidTitle = document.createElement('h3');
    mediumSolidTitle.textContent = 'Medium Icons (md)';
    mediumSolidTitle.style.margin = '0';
    mediumSolidTitle.style.fontSize = '24px';
    mediumSolidTitle.style.fontWeight = '600';
    mediumSolidTitle.style.color = 'var(--text-primary)';
    mediumSolidSection.appendChild(mediumSolidTitle);
    mediumSolidSection.appendChild(createIconGrid(iconGroups.solid.md, 'md', 'solid'));
    solidSection.appendChild(mediumSolidSection);

    // Large solid icons
    const largeSolidSection = document.createElement('div');
    largeSolidSection.style.display = 'flex';
    largeSolidSection.style.flexDirection = 'column';
    largeSolidSection.style.gap = '32px';
    const largeSolidTitle = document.createElement('h3');
    largeSolidTitle.textContent = 'Large Icons (lg)';
    largeSolidTitle.style.margin = '0';
    largeSolidTitle.style.fontSize = '24px';
    largeSolidTitle.style.fontWeight = '600';
    largeSolidTitle.style.color = 'var(--text-primary)';
    largeSolidSection.appendChild(largeSolidTitle);
    largeSolidSection.appendChild(createIconGrid(iconGroups.solid.lg, 'lg', 'solid'));
    solidSection.appendChild(largeSolidSection);

    wrapper.appendChild(solidSection);

    return wrapper;
  },
};
