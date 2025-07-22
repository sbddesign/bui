import { LitElement, html, css } from 'lit';

export class BuiButton extends LitElement {
  static properties = {
    content: { type: String }, // 'label', 'icon', 'label+icon', etc.
    styleType: { type: String, attribute: 'style-type' }, // 'filled', 'outline', 'free'
    size: { type: String }, // 'default', 'small', 'large'
    disabled: { type: Boolean },
    label: { type: String },
  };

  static styles = [
    css`
      :host {
        display: inline-block;
      }
      button {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        border-radius: var(--button-rounding);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5em;
        font-weight: 500;
        transition: background 0.2s, color 0.2s, border 0.2s;
        color: var(--text-primary);
        position: relative;
      }
      /* Size variants */
      button.default { font-size: 1rem; padding: 0.5em 1.25em; }
      button.small { font-size: 0.85rem; padding: 0.25em 0.75em; }
      button.large { font-size: 1.15rem; padding: 0.75em 1.5em; }
      
      /* Filled button styles */
      button.filled {
        background: var(--button-filled-bg);
        color: var(--button-filled-text);
        border: 2px solid var(--button-filled-outline);
      }
      button.filled:hover {
        background: var(--button-filled-hover-bg);
        border-color: var(--button-filled-hover-outline);
      }
      button.filled:active {
        background: var(--button-filled-active-bg);
        border-color: var(--button-filled-active-outline);
      }
      button.filled:disabled {
        background: var(--button-filled-disabled-bg);
        border-color: var(--button-filled-disabled-outline);
        color: var(--button-filled-disabled-text);
        cursor: not-allowed;
      }
      
      /* Outline button styles */
      button.outline {
        background: var(--button-outline-bg);
        color: var(--button-outline-text);
        border: 2px solid var(--button-outline-outline);
      }
      button.outline:hover {
        background: var(--button-outline-hover-bg);
        border-color: var(--button-outline-hover-outline);
        color: var(--button-outline-hover-text);
      }
      button.outline:active {
        background: var(--button-outline-active-bg);
        border-color: var(--button-outline-active-outline);
        color: var(--button-outline-active-text);
      }
      button.outline:disabled {
        border-color: var(--button-outline-disabled-outline);
        color: var(--button-outline-disabled-text);
        cursor: not-allowed;
      }
      
      /* Free button styles */
      button.free {
        background: var(--button-free-bg);
        color: var(--button-free-text);
        border: 2px solid var(--button-free-outline);
      }
      button.free:hover {
        background: var(--button-free-hover-bg);
      }
      button.free:active {
        background: var(--button-free-active-bg);
      }
      button.free:disabled {
        color: var(--button-free-disabled-text);
        cursor: not-allowed;
      }
      
      /* Disabled state for all buttons */
      button:disabled {
        opacity: 1; /* Remove opacity override since we're using specific disabled colors */
      }
      
      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Slot styles for icon content */
      ::slotted([slot="icon"]) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Ensure icons have consistent sizing */
      ::slotted([slot="icon"]) {
        width: 1em;
        height: 1em;
      }
    `
  ];

  constructor() {
    super();
    this.content = 'label';
    this.styleType = 'filled';
    this.size = 'default';
    this.disabled = false;
    this.label = 'Label';
  }

  render() {
    const classes = [this.size, this.styleType].join(' ');
    return html`
      <button class="${classes}" ?disabled="${this.disabled}">
        ${this.content === 'label+icon' ? html`<slot name="icon"></slot>` : ''}
        ${['label', 'label+icon', 'icon+label'].includes(this.content) ? html`<span>${this.label}</span>` : ''}
        ${this.content === 'icon+label' ? html`<slot name="icon"></slot>` : ''}
        ${this.content === 'icon' ? html`<slot name="icon"></slot>` : ''}
      </button>
    `;
  }
}

customElements.define('bui-button', BuiButton); 