import { LitElement, html, css, type PropertyValues } from 'lit';
import { validateProperties, createStringLiteralValidationRule } from './utils/validation.js';

const TOGGLE_SIZES = ['big', 'small'] as const;
type ToggleSize = (typeof TOGGLE_SIZES)[number];

export class BuiToggle extends LitElement {
  static properties = {
    active: { type: Boolean, reflect: true },
    size: { type: String }, // 'big', 'small'
    disabled: { type: Boolean, reflect: true },
  };

  declare active: boolean;
  declare size: ToggleSize;
  declare disabled: boolean;

  private validationRules = [createStringLiteralValidationRule(TOGGLE_SIZES, 'size')];

  static styles = [
    css`
      :host {
        display: inline-block;
      }

      .toggle {
        position: relative;
        cursor: pointer;
        border: none;
        background: none;
        padding: 0;
        transition: all 0.2s ease;
      }

      .toggle:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .toggle-track {
        position: relative;
        border-radius: 18px;
        transition: background-color 0.2s ease;
      }

      .toggle-switch {
        position: absolute;
        background: var(--component-toggle-switch);
        border-radius: 18px;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.25);
        transition: all 0.2s ease;
      }

      /* Big size */
      .toggle.big {
        width: 60px;
        height: 36px;
      }
      .toggle.big .toggle-track {
        width: 100%;
        height: 100%;
      }
      .toggle.big .toggle-switch {
        width: 28px;
        height: 28px;
        top: 4px;
      }
      .toggle.big:not(.active) .toggle-switch {
        left: 4px;
      }
      .toggle.big.active .toggle-switch {
        left: 28px;
      }

      /* Small size */
      .toggle.small {
        width: 45px;
        height: 28px;
      }
      .toggle.small .toggle-track {
        width: 100%;
        height: 100%;
      }
      .toggle.small .toggle-switch {
        width: 20px;
        height: 20px;
        top: 4px;
      }
      .toggle.small:not(.active) .toggle-switch {
        left: 4px;
      }
      .toggle.small.active .toggle-switch {
        left: 21px;
      }

      /* Active state */
      .toggle.active .toggle-track {
        background: var(--component-toggle-active-bg);
      }

      /* Inactive state */
      .toggle:not(.active) .toggle-track {
        background: var(--component-toggle-bg);
      }

      /* Focus styles for accessibility */
      .toggle:focus-visible {
        outline: 2px solid var(--system-interactive);
        outline-offset: 2px;
      }
    `,
  ];

  constructor() {
    super();
    this.active = false;
    this.size = 'big';
    this.disabled = false;
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    validateProperties(this, changed, this.validationRules);
  }

  private onToggle = () => {
    if (!this.disabled) {
      this.active = !this.active;
      this.dispatchEvent(
        new CustomEvent('toggle', {
          detail: { active: this.active },
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  render() {
    const classes = ['toggle', this.size, this.active ? 'active' : ''].filter(Boolean).join(' ');

    return html`
      <button
        class="${classes}"
        ?disabled="${this.disabled}"
        @click="${this.onToggle}"
        role="switch"
        aria-checked="${this.active}"
        aria-label="Toggle ${this.active ? 'on' : 'off'}"
      >
        <div class="toggle-track"></div>
        <div class="toggle-switch"></div>
      </button>
    `;
  }
}

if (!customElements.get('bui-toggle')) {
  customElements.define('bui-toggle', BuiToggle);
}
