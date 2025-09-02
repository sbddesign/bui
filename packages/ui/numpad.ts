import { LitElement, html, css } from 'lit';

export interface NumPadClickDetail {
  value: string;
  type: 'number' | 'backspace';
}

export class BuiNumPad extends LitElement {
  static properties = {
    disabled: { type: Boolean, reflect: true },
  };

  declare disabled: boolean;

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
      }
      
      .numpad {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(124px, 1fr));
        gap: 0;
        width: 100%;
        max-width: 100%;
      }
      
      /* Ensure minimum 3 columns */
      .numpad {
        grid-template-columns: repeat(auto-fit, minmax(124px, 1fr));
        min-width: 372px; /* 3 * 124px */
      }
      
      /* Responsive behavior */
      @media (min-width: 400px) {
        .numpad {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      @media (min-width: 600px) {
        .numpad {
          grid-template-columns: repeat(4, 1fr);
        }
      }
      
      @media (min-width: 800px) {
        .numpad {
          grid-template-columns: repeat(5, 1fr);
        }
      }
      
      /* Ensure buttons maintain their size */
      bui-numpad-button {
        width: 130px;
        height: 130px;
        justify-self: center;
      }
      
      /* Container for responsive behavior */
      .numpad-container {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    `
  ];

  constructor() {
    super();
    this.disabled = false;
  }

  render() {
    return html`
      <div class="numpad-container">
        <div class="numpad">
          <!-- Number buttons 1-9 -->
          ${this.renderNumberButton('1')}
          ${this.renderNumberButton('2')}
          ${this.renderNumberButton('3')}
          ${this.renderNumberButton('4')}
          ${this.renderNumberButton('5')}
          ${this.renderNumberButton('6')}
          ${this.renderNumberButton('7')}
          ${this.renderNumberButton('8')}
          ${this.renderNumberButton('9')}
          
          <!-- Period button -->
          ${this.renderNumberButton('.')}
          
          <!-- Zero button -->
          ${this.renderNumberButton('0')}
          
          <!-- Backspace button -->
          ${this.renderBackspaceButton()}
        </div>
      </div>
    `;
  }

  private renderNumberButton(number: string) {
    return html`
      <bui-numpad-button
        number="${number}"
        content="number"
        ?disabled="${this.disabled}"
        @numpad-click="${this.handleNumberClick}">
      </bui-numpad-button>
    `;
  }

  private renderBackspaceButton() {
    return html`
      <bui-numpad-button
        content="icon"
        ?disabled="${this.disabled}"
        @numpad-click="${this.handleBackspaceClick}">
        <bui-angle-left-lg slot="icon"></bui-angle-left-lg>
      </bui-numpad-button>
    `;
  }

  private handleNumberClick = (event: CustomEvent<{ number: string; content: string }>) => {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent<NumPadClickDetail>('numpad-click', {
        detail: {
          value: event.detail.number,
          type: 'number',
        },
        bubbles: true,
        composed: true,
      }));
    }
  };

  private handleBackspaceClick = () => {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent<NumPadClickDetail>('numpad-click', {
        detail: {
          value: 'backspace',
          type: 'backspace',
        },
        bubbles: true,
        composed: true,
      }));
    }
  };
}

if (!customElements.get('bui-numpad')) {
  customElements.define('bui-numpad', BuiNumPad);
}
