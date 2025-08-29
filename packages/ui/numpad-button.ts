import { LitElement, html, css } from 'lit';

type NumPadContent = 'number' | 'icon';

export interface NumPadClickDetail {
  number: string;
  content: NumPadContent;
}

export class BuiNumPadButton extends LitElement {
  static properties = {
    number: { type: String },
    content: { type: String }, // 'number' or 'icon'
    disabled: { type: Boolean, reflect: true },
  };

  declare number: string;
  declare content: NumPadContent;
  declare disabled: boolean;

  static styles = [
    css`
      :host {
        display: block;
        width: 130px;
        height: 130px;
      }
      
      button {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 0;
        background: var(--component-numpad-bg, #ffffff);
        color: var(--text-secondary, #71717b);
        font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 48px;
        font-weight: bold;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease;
        padding: 0;
        position: relative;
      }
      
      button:hover {
        background: var(--component-numpad-hover-bg, #f4f4f5);
      }
      
      button:active {
        background: var(--component-numpad-active-bg, #ffd6a7);
      }
      
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .number {
        font-size: 48px;
        font-weight: bold;
        line-height: 1;
        color: var(--text-secondary, #71717b);
      }
      
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary, #71717b);
      }
      
      .icon ::slotted(*) {
        width: 36px;
        height: 36px;
      }
    `
  ];

  constructor() {
    super();
    this.number = '1';
    this.content = 'number';
    this.disabled = false;
  }

  render() {
    return html`
      <button 
        ?disabled="${this.disabled}"
        @click="${this.handleClick}">
        ${this.content === 'icon' 
          ? html`<div class="icon"><slot name="icon"></slot></div>`
          : html`<div class="number">${this.number}</div>`
        }
      </button>
    `;
  }

  private handleClick = () => {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent<NumPadClickDetail>('numpad-click', {
        detail: {
          number: this.number,
          content: this.content,
        },
        bubbles: true,
        composed: true,
      }));
    }
  }
}

if (!customElements.get('bui-numpad-button')) {
  customElements.define('bui-numpad-button', BuiNumPadButton);
}


