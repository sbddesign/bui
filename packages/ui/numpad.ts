import { LitElement, html, css } from 'lit';
import './numpad-button.js';

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
        grid-template-columns: repeat(3, 0fr);
        min-width: 372px; /* 3 * 124px */
        justify-content: center;
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
        ?disabled="${this.disabled}">
      </bui-numpad-button>
    `;
  }

  private renderBackspaceButton() {
    return html`
      <bui-numpad-button
        content="icon"
        ?disabled="${this.disabled}">
        <bui-angle-left-lg slot="icon"></bui-angle-left-lg>
      </bui-numpad-button>
    `;
  }
}

if (!customElements.get('bui-numpad')) {
  customElements.define('bui-numpad', BuiNumPad);
}
