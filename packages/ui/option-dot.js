import { LitElement, html, css } from 'lit';

export class BuiOptionDot extends LitElement {
  static properties = {
    active: { 
      type: Boolean, 
      reflect: true, 
      attribute: 'active',
      converter: {
        fromAttribute: (value) => value === 'true' || value === '',
        toAttribute: (value) => value ? 'true' : 'false'
      }
    },
  };

  static styles = [
    css`
      :host {
        display: inline-block;
        width: var(--size-2);
        height: var(--size-2);
      }

      .option-dot {
        width: 100%;
        height: 100%;
        border-radius: var(--size-2);
        position: relative;
        transition: background-color 0.2s ease;
      }

      .option-dot.active {
        background-color: var(--system-interactive);
      }

      .option-dot:not(.active) {
        background-color: var(--text-secondary);
      }

      .option-dot::before {
        content: '';
        position: absolute;
        inset: -2px;
        border: 2px solid;
        border-radius: calc(var(--size-2) + 2px);
        pointer-events: none;
      }

      .option-dot.active::before {
        border-color: var(--system-interactive);
      }

      .option-dot:not(.active)::before {
        border-color: var(--transparent);
      }
    `
  ];

  constructor() {
    super();
    this.active = false;
  }

  render() {
    return html`
      <div class="option-dot ${this.active ? 'active' : ''}"></div>
    `;
  }
}

customElements.define('bui-option-dot', BuiOptionDot);
