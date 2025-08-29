import { LitElement, html, css } from 'lit';

type BooleanString = 'true' | 'false';

export class BuiOptionDot extends LitElement {
  static properties = {
    active: {
      type: Boolean,
      reflect: true,
      attribute: 'active',
      converter: {
        fromAttribute: (value: string | null): boolean => value === 'true' || value === '',
        toAttribute: (value: boolean): BooleanString => (value ? 'true' : 'false'),
      },
    },
  };

  declare active: boolean;

  static styles = [
    css`
      :host {
        display: inline-block;
        width: var(--size-2);
        height: var(--size-2);
        cursor: pointer;
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
    `,
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

if (!customElements.get('bui-option-dot')) {
  customElements.define('bui-option-dot', BuiOptionDot);
}


