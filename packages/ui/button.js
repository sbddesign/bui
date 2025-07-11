import { LitElement, html, css } from 'lit';

// Import CSS variables from tokens
const tokenStyles = css`
  @import url('../tokens/dist/variables.css');
`;

export class BuiButton extends LitElement {
  static properties = {
    content: { type: String }, // 'label', 'icon', 'label+icon', etc.
    styleType: { type: String, attribute: 'style-type' }, // 'filled', 'outline', 'free'
    size: { type: String }, // 'default', 'small', 'large'
    active: { type: Boolean },
    icon: { type: String }, // e.g. 'cross'
    label: { type: String },
  };

  static styles = [
    tokenStyles,
    css`
      :host {
        display: inline-block;
      }
      button {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5em;
        font-weight: 500;
        transition: background 0.2s, color 0.2s, border 0.2s;
      }
      /* Size variants */
      button.default { font-size: 1rem; padding: 0.5em 1.25em; }
      button.small { font-size: 0.85rem; padding: 0.25em 0.75em; }
      button.large { font-size: 1.15rem; padding: 0.75em 1.5em; }
      /* Style variants */
      button.filled {
        background: var(--color-orange);
        color: #fff;
        border: none;
      }
      button.outline {
        background: transparent;
        color: var(--color-orange);
        border: 2px solid var(--color-orange);
      }
      button.free {
        background: none;
        color: var(--color-orange);
        border: none;
      }
      button[disabled], button.inactive {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    `
  ];

  constructor() {
    super();
    this.content = 'label';
    this.styleType = 'filled';
    this.size = 'default';
    this.active = true;
    this.icon = '';
    this.label = 'Label';
  }

  renderIcon() {
    if (this.icon === 'cross') {
      // Simple SVG cross icon
      return html`<span class="icon" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16"><line x1="4" y1="4" x2="12" y2="12" stroke="currentColor" stroke-width="2"/><line x1="12" y1="4" x2="4" y2="12" stroke="currentColor" stroke-width="2"/></svg></span>`;
    }
    return null;
  }

  render() {
    const classes = [this.size, this.styleType, this.active ? '' : 'inactive'].join(' ');
    return html`
      <button class="${classes}" ?disabled="${!this.active}">
        ${['icon', 'label+icon', 'icon+label'].includes(this.content) ? this.renderIcon() : ''}
        ${['label', 'label+icon', 'icon+label'].includes(this.content) ? html`<span>${this.label}</span>` : ''}
        ${this.content === 'icon+label' ? this.renderIcon() : ''}
      </button>
    `;
  }
}

customElements.define('bui-button', BuiButton); 