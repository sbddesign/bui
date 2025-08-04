import { LitElement, html, css } from 'lit';

export class BuiInput extends LitElement {
  static properties = {
    mood: { type: String, reflect: true }, // 'neutral', 'caution', 'danger', 'success'
    size: { type: String, reflect: true }, // 'large', 'small'
    label: { type: String, reflect: true },
    value: { type: String, reflect: true },
    message: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    showLabel: { type: Boolean, reflect: true, attribute: 'show-label' },
    showMessage: { type: Boolean, reflect: true, attribute: 'show-message' },
    showIconLeft: { type: Boolean, reflect: true, attribute: 'show-icon-left' },
    showIconRight: { type: Boolean, reflect: true, attribute: 'show-icon-right' },
    iconRightAction: { type: String, attribute: 'icon-right-action' }, // function name to call
  };

  static styles = [
    css`
      :host {
        display: block;
        font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .input-container {
        display: flex;
        flex-direction: column;
        gap: var(--size-4);
        width: 100%;
      }
      
      .label {
        font-weight: 500;
        font-size: var(--size-4);
        line-height: 1;
        color: var(--text-primary);
        letter-spacing: 0.16px;
      }
      
      .field-container {
        display: flex;
        flex-direction: column-reverse;
        width: 100%;
      }
      
      .input-field {
        display: flex;
        flex-direction: row;
        gap: var(--size-1);
        align-items: center;
        background: var(--component-input-bg);
        border: 2px solid;
        border-radius: var(--component-input-rounding-large);
        padding: var(--size-4) var(--size-6);
        position: relative;
        margin-bottom: calc(-1 * var(--size-6));
        order: 2;
      }
      
      .input-field.small {
        height: 48px;
        padding: var(--size-3) var(--size-4);
        border-radius: var(--component-input-rounding-small);
        margin-bottom: calc(-1 * var(--size-6));
      }
      
      .input-field.large {
        height: 64px;
        padding: var(--size-4) var(--size-6);
        border-radius: var(--component-input-rounding-large);
        margin-bottom: calc(-1 * var(--size-6));
      }
      
      .input-content {
        display: flex;
        flex-direction: row;
        gap: var(--size-2);
        align-items: center;
        flex: 1;
      }
      
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--size-6);
        height: var(--size-6);
        flex-shrink: 0;
      }
      
      .icon.clickable {
        cursor: pointer;
      }
      
      .input-value {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        flex: 1;
        min-width: 0;
      }
      
      input {
        font-family: inherit;
        font-weight: normal;
        font-size: var(--size-4);
        line-height: 1;
        color: var(--text-primary);
        background: transparent;
        border: none;
        outline: none;
        width: 100%;
        min-width: 0;
      }
      
      .input-field.large input {
        font-size: 18px;
      }
      
      .input-field.small input {
        font-size: var(--size-4);
      }
      
      .message-container {
        background: var(--component-input-bg);
        border: 2px solid;
        border-radius: 0 0 var(--component-input-rounding-large) var(--component-input-rounding-large);
        padding: calc(var(--size-6) + var(--size-3)) var(--size-6) var(--size-4);
        order: 1;
      }
      
      .message-container.small {
        border-radius: 0 0 var(--component-input-rounding-small) var(--component-input-rounding-small);
        padding: calc(var(--size-4) + var(--size-3)) var(--size-4) var(--size-3);
      }
      
      .message-container.large {
        border-radius: 0 0 var(--component-input-rounding-large) var(--component-input-rounding-large);
        padding: calc(var(--size-6) + var(--size-3)) var(--size-6) var(--size-4);
      }
      
      .message {
        font-weight: normal;
        font-size: var(--size-4);
        line-height: 1;
        color: var(--text-secondary);
        width: 100%;
      }
      
      .message-container.large .message {
        font-size: 18px;
      }
      
      .message-container.small .message {
        font-size: var(--size-4);
      }
      
      /* Mood-specific styles */
      .input-field.neutral {
        border-color: var(--system-mood-neutral);
      }
      
      .message-container.neutral {
        border-color: var(--system-mood-neutral);
      }
      
      .message-container.neutral .message {
        color: var(--system-mood-neutral-text);
      }
      
      .input-field.caution {
        border-color: var(--system-mood-caution);
      }
      
      .message-container.caution {
        border-color: var(--system-mood-caution);
      }
      
      .message-container.caution .message {
        color: var(--system-mood-caution-text);
      }
      
      .input-field.danger {
        border-color: var(--system-mood-danger);
      }
      
      .message-container.danger {
        border-color: var(--system-mood-danger);
      }
      
      .message-container.danger .message {
        color: var(--system-mood-danger-text);
      }
      
      .input-field.success {
        border-color: var(--system-mood-success);
      }
      
      .message-container.success {
        border-color: var(--system-mood-success);
      }
      
      .message-container.success .message {
        color: var(--system-mood-success-text);
      }
      
      /* Focus styles */
      .input-field:focus-within {
        outline: 2px solid var(--system-interactive);
        outline-offset: 2px;
      }
      
      /* Disabled state */
      .input-field:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      input:disabled {
        cursor: not-allowed;
      }
    `
  ];

  constructor() {
    super();
    this.mood = 'neutral';
    this.size = 'large';
    this.label = 'Label';
    this.value = '';
    this.message = '';
    this.placeholder = '';
    this.showLabel = true;
    this.showMessage = false;
    this.showIconLeft = false;
    this.showIconRight = false;
    this.iconRightAction = '';
  }

  handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  handleIconRightClick() {
    if (this.iconRightAction) {
      this.dispatchEvent(new CustomEvent('icon-right-click', {
        detail: { action: this.iconRightAction },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    const inputClasses = `input-field ${this.size} ${this.mood}`;
    const messageClasses = `message-container ${this.size} ${this.mood}`;
    
    return html`
      <div class="input-container">
        ${this.showLabel ? html`
          <div class="label">
            <p>${this.label}</p>
          </div>
        ` : ''}
        
        <div class="field-container">
          <div class="${inputClasses}">
            <div class="input-content">
              ${this.showIconLeft ? html`
                <div class="icon">
                  <slot name="icon-left"></slot>
                </div>
              ` : ''}
              
              <div class="input-value">
                <input
                  type="text"
                  .value="${this.value}"
                  placeholder="${this.placeholder}"
                  @input="${this.handleInput}"
                >
              </div>
              
              ${this.showIconRight ? html`
                <div class="icon ${this.iconRightAction ? 'clickable' : ''}" 
                     @click="${this.handleIconRightClick}">
                  <slot name="icon-right"></slot>
                </div>
              ` : ''}
            </div>
          </div>
          
          ${this.showMessage ? html`
            <div class="${messageClasses}">
              <div class="message">
                <p>${this.message}</p>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('bui-input', BuiInput); 