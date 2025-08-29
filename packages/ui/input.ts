import { LitElement, html, css, type PropertyValues } from 'lit';
import { validateProperties, createStringLiteralValidationRule } from './utils/validation.js';

const INPUT_MOODS = ['neutral', 'caution', 'danger', 'success'] as const;
type InputMood = typeof INPUT_MOODS[number];

const INPUT_SIZES = ['large', 'small'] as const;
type InputSize = typeof INPUT_SIZES[number];

export class BuiInput extends LitElement {
  static properties = {
    mood: { type: String, reflect: true }, // 'neutral', 'caution', 'danger', 'success'
    size: { type: String, reflect: true }, // 'large', 'small'
    label: { type: String, reflect: true },
    value: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    showLabel: { type: Boolean, reflect: true, attribute: 'show-label' },
    showIconLeft: { type: Boolean, reflect: true, attribute: 'show-icon-left' },
    showIconRight: { type: Boolean, reflect: true, attribute: 'show-icon-right' },
    iconRightAction: { type: String, attribute: 'icon-right-action' },
  };

  declare mood: InputMood;
  declare size: InputSize;
  declare label: string;
  declare value: string;
  declare placeholder: string;
  declare showLabel: boolean;
  declare showIconLeft: boolean;
  declare showIconRight: boolean;
  declare iconRightAction: string;

  private validationRules = [
    createStringLiteralValidationRule(INPUT_MOODS, 'mood'),
    createStringLiteralValidationRule(INPUT_SIZES, 'size'),
  ];

  static styles = [
    css`
      :host {
        display: block;
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
        order: 2;
      }
      
      .input-field.small {
        padding: var(--size-4) var(--size-3);
        border-radius: var(--component-input-rounding-small);
      }
      
      .input-field.large {
        padding: var(--size-6) var(--size-4);
        border-radius: var(--component-input-rounding-large);
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
        margin-top: calc(-1 * var(--size-6));
      }
      
      .message-container.small {
        border-radius: 0 0 var(--component-input-rounding-small) var(--component-input-rounding-small);
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
      
      .message-container.large .message { font-size: 18px; }
      .message-container.small .message { font-size: var(--size-4); }
      
      /* Mood-specific styles */
      .input-field.neutral { border-color: var(--system-mood-neutral); }
      .message-container.neutral { border-color: var(--system-mood-neutral); }
      .message-container.neutral .message { color: var(--system-mood-neutral-text); }
      
      .input-field.caution { border-color: var(--system-mood-caution); }
      .message-container.caution { border-color: var(--system-mood-caution); }
      .message-container.caution .message { color: var(--system-mood-caution-text); }
      
      .input-field.danger { border-color: var(--system-mood-danger); }
      .message-container.danger { border-color: var(--system-mood-danger); }
      .message-container.danger .message { color: var(--system-mood-danger-text); }
      
      .input-field.success { border-color: var(--system-mood-success); }
      .message-container.success { border-color: var(--system-mood-success); }
      .message-container.success .message { color: var(--system-mood-success-text); }
      
      /* Focus styles */
      .input-field:focus-within { outline: 3px solid; outline-offset: 0; }
      .input-field.neutral:focus-within { outline-color: var(--system-mood-neutral-active); }
      .input-field.caution:focus-within { outline-color: var(--system-mood-caution-active); }
      .input-field.danger:focus-within { outline-color: var(--system-mood-danger-active); }
      .input-field.success:focus-within { outline-color: var(--system-mood-success-active); }
      
      /* Disabled state */
      .input-field:disabled { opacity: 0.5; cursor: not-allowed; }
      input:disabled { cursor: not-allowed; }
    `
  ];

  constructor() {
    super();
    this.mood = 'neutral';
    this.size = 'large';
    this.label = 'Label';
    this.value = '';
    this.placeholder = '';
    this.showLabel = true;
    this.showIconLeft = false;
    this.showIconRight = false;
    this.iconRightAction = '';
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    validateProperties(this, changed, this.validationRules);
  }

  private handleInput = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement | null;
    if (target) {
      this.value = target.value;
    }
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private handleIconRightClick = () => {
    if (this.iconRightAction) {
      this.dispatchEvent(new CustomEvent('icon-right-click', {
        detail: { action: this.iconRightAction },
        bubbles: true,
        composed: true,
      }));
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties as any);
    const messageSlot = this.shadowRoot?.querySelector('slot[name="message"]');
    const messageContainer = this.shadowRoot?.querySelector('.message-container') as HTMLElement | null;
    if (messageSlot && messageContainer) {
      const assignedNodes = (messageSlot as HTMLSlotElement).assignedNodes();
      const hasContent = assignedNodes.length > 0 && assignedNodes.some(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return (node.textContent || '').trim().length > 0;
        }
        return true;
      });
      messageContainer.style.display = hasContent ? 'block' : 'none';
    }
  }

  render() {
    const inputClasses = `input-field ${this.size} ${this.mood}`;
    const messageClasses = `message-container ${this.size} ${this.mood}`;
    
    return html`
      <div class="input-container">
        ${this.showLabel ? html`
            <label class="label">${this.label}</label>  
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
          
          <div class="${messageClasses}" style="display: none;">
            <div class="message">
              <slot name="message"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('bui-input')) {
  customElements.define('bui-input', BuiInput);
}


