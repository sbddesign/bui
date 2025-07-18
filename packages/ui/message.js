import { LitElement, html, css } from 'lit';

export class BuiMessage extends LitElement {
  static properties = {
    text: { type: String },
    mood: { type: String }, // 'neutral', 'success', 'caution', 'danger'
    showIcon: { type: Boolean },
    icon: { type: String }, // custom icon slot
  };

  static styles = [
    css`
      :host {
        display: block;
      }
      
      .message {
        position: relative;
        border-radius: 24px;
        border: 2px solid;
        padding: var(--size-4);
        display: flex;
        align-items: flex-start;
        gap: var(--size-2);
        font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 18px;
        font-weight: normal;
        line-height: normal;
      }
      
      .message.neutral {
        border-color: var(--system-mood-neutral);
        color: var(--system-mood-neutral-text, var(--system-mood-neutral));
      }
      
      .message.success {
        border-color: var(--system-mood-success);
        color: var(--system-mood-success-text, var(--system-mood-success));
      }
      
      .message.caution {
        border-color: var(--system-mood-caution);
        color: var(--system-mood-caution-text, var(--system-mood-caution));
      }
      
      .message.danger {
        border-color: var(--system-mood-danger);
        color: var(--system-mood-danger-text, var(--system-mood-danger));
      }
      
      .icon {
        flex-shrink: 0;
        width: var(--size-6);
        height: var(--size-6);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .icon svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      .content {
        flex: 1;
        min-width: 0;
      }
      
      .content p {
        margin: 0;
        line-height: normal;
      }
      
      /* Default icon styles for each mood */
      .icon.neutral svg {
        color: var(--system-mood-neutral-text, var(--system-mood-neutral));
      }
      
      .icon.success svg {
        color: var(--system-mood-success-text, var(--system-mood-success));
      }
      
      .icon.caution svg {
        color: var(--system-mood-caution-text, var(--system-mood-caution));
      }
      
      .icon.danger svg {
        color: var(--system-mood-danger-text, var(--system-mood-danger));
      }
    `
  ];

  constructor() {
    super();
    this.text = 'For this small payment, you could save on fees by sending to a Lightning wallet.';
    this.mood = 'neutral';
    this.showIcon = true;
    this.icon = '';
  }

  renderIcon() {
    if (!this.showIcon) return null;
    
    if (this.icon) {
      return html`<div class="icon ${this.mood}">${this.icon}</div>`;
    }
    
    // Default icons for each mood
    const iconMap = {
      neutral: html`<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>`,
      success: html`<svg viewBox="0 0 16 16"><path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      caution: html`<svg viewBox="0 0 16 16"><path d="M8 1L15 14H1L8 1Z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 6V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="12" r="0.5" fill="currentColor"/></svg>`,
      danger: html`<svg viewBox="0 0 16 16"><path d="M8 1L15 14H1L8 1Z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 6V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="12" r="0.5" fill="currentColor"/></svg>`
    };
    
    return html`<div class="icon ${this.mood}">${iconMap[this.mood] || iconMap.neutral}</div>`;
  }

  render() {
    return html`
      <div class="message ${this.mood}">
        ${this.renderIcon()}
        <div class="content">
          <p>${this.text}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('bui-message', BuiMessage); 