import { LitElement, html, css } from 'lit';
import './money-value.js';
import './bitcoin-value.js';

export class BuiAmountOptionTile extends LitElement {
  static properties = {
    emoji: { type: String, reflect: true },
    message: { type: String, reflect: true },
    showEmoji: { type: Boolean, attribute: 'show-emoji', reflect: true },
    showMessage: { type: Boolean, attribute: 'show-message', reflect: true },
    showSecondaryCurrency: { type: Boolean, attribute: 'show-secondary-currency', reflect: true },
    bitcoinFirst: { type: String, attribute: 'bitcoin-first', reflect: true }, // 'true' or 'false'
    custom: { type: String, attribute: 'custom', reflect: true }, // 'true' or 'false'
    amountDefined: { type: String, attribute: 'amount-defined', reflect: true }, // 'true' or 'false'
    selected: { type: String, attribute: 'selected', reflect: true }, // 'true' or 'false'
    primaryAmount: { type: Number, reflect: true },
    primarySymbol: { type: String, attribute: 'primary-symbol', reflect: true },
    secondaryAmount: { type: Number, reflect: true },
    secondarySymbol: { type: String, attribute: 'secondary-symbol', reflect: true },
    showEstimate: { type: Boolean, attribute: 'show-estimate', reflect: true },
    primaryTextSize: { type: String, attribute: 'primary-text-size', reflect: true },
    secondaryTextSize: { type: String, attribute: 'secondary-text-size', reflect: true }
  };

  static styles = [
    css`
      :host {
        display: block;
        height: 200px; /* Fixed height as requested */
        width: 100%; /* Expand to fill container width */
      }

      .tile {
        background: var(--background);
        border-radius: 24px;
        padding: var(--size-6);
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--size-6);
        position: relative;
        box-sizing: border-box;
        border: 1px solid var(--system-divider, #d4d4d8);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.03);
        transition: all 0.2s ease;
        cursor: pointer;
      }

      .tile:hover {
        transform: translateY(-2px);
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
      }

      .tile.selected {
        border-color: var(--system-interactive-active);
      }

      .tile.custom {
        border-color: var(--button-outline-outline);
      }

      .amounts {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--size-2);
      }

      .message-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--size-3);
        font-weight: 500;
        line-height: 1;
        color: var(--text-primary);
      }

      .emoji {
        font-size: 36px;
        line-height: 1;
      }

      .message {
        font-size: 24px;
        line-height: 1;
      }

      .custom-text {
        font-size: 24px;
        line-height: 1;
        color: var(--text-primary);
        font-weight: 500;
      }

      .custom-button {
        border: 2px solid var(--button-outline-outline);
        border-radius: 4px;
        padding: var(--size-2) var(--size-4);
        background: transparent;
        color: var(--button-outline-text);
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .custom-button:hover {
        background: var(--button-outline-hover-bg);
        border-color: var(--button-outline-hover-outline);
        color: var(--button-outline-hover-text);
      }
    `
  ];

  constructor() {
    super();
    this.emoji = '🔥';
    this.message = 'Incredible';
    this.showEmoji = true;
    this.showMessage = true;
    this.showSecondaryCurrency = true;
    this.bitcoinFirst = 'false';
    this.custom = 'false';
    this.amountDefined = 'true';
    this.selected = 'false';
    this.primaryAmount = 30;
    this.primarySymbol = '$';
    this.secondaryAmount = 0.001;
    this.secondarySymbol = '₿';
    this.showEstimate = true;
    this.primaryTextSize = '6xl';
    this.secondaryTextSize = '2xl';
  }

  render() {
    const isSelected = this.selected === 'true';
    const isCustom = this.custom === 'true';
    const hasAmount = this.amountDefined === 'true';
    const isBitcoinFirst = this.bitcoinFirst === 'true';

    return html`
      <div class="tile ${isSelected ? 'selected' : ''} ${isCustom ? 'custom' : ''}" @click=${this._handleClick}>
        ${this._renderContent(isSelected, isCustom, hasAmount, isBitcoinFirst)}
      </div>
    `;
  }

  _renderContent(isSelected, isCustom, hasAmount, isBitcoinFirst) {
    if (isCustom && !hasAmount) {
      return html`
        <div class="custom-text">Custom Amount</div>
      `;
    }

    if (isCustom && hasAmount) {
      return html`
        <div class="amounts">
          ${this._renderPrimaryAmount()}
          ${this.showSecondaryCurrency ? this._renderSecondaryAmount() : ''}
        </div>
        <button class="custom-button">Edit</button>
      `;
    }

    return html`
      <div class="amounts">
        ${this._renderPrimaryAmount()}
        ${this.showSecondaryCurrency ? this._renderSecondaryAmount() : ''}
      </div>
      ${this.showMessage ? this._renderMessage() : ''}
    `;
  }

  _renderPrimaryAmount() {
    // Primary amount: use bitcoin-value if bitcoinFirst is true, otherwise use money-value
    if (this.bitcoinFirst === 'true') {
      return html`
        <bui-bitcoin-value
          format="bip177"
          .amount="${this.primaryAmount}"
          symbol-position="left"
          .showEstimate="${false}"
          text-size="${this.primaryTextSize}"
          .truncated="${false}"
          .satcomma="${false}">
        </bui-bitcoin-value>
      `;
    } else {
      return html`
        <bui-money-value
          symbol="${this.primarySymbol}"
          .amount="${this.primaryAmount}"
          symbol-position="left"
          .showEstimate="${false}"
          text-size="${this.primaryTextSize}"
          .truncation="${false}"
          .satcomma="${false}">
        </bui-money-value>
      `;
    }
  }

  _renderSecondaryAmount() {
    // Secondary amount: use money-value if bitcoinFirst is true, otherwise use bitcoin-value
    if (this.bitcoinFirst === 'true') {
      return html`
        <div style="color: var(--text-secondary);">
          <bui-money-value
            symbol="${this.secondarySymbol}"
            .amount="${this.secondaryAmount}"
            symbol-position="left"
            .showEstimate="${this.showEstimate}"
            text-size="${this.secondaryTextSize}"
            .truncation="${false}"
            .satcomma="${false}">
          </bui-money-value>
        </div>
      `;
    } else {
      return html`
        <div style="color: var(--text-secondary);">
          <bui-bitcoin-value
            format="bip177"
            .amount="${this.secondaryAmount}"
            symbol-position="left"
            .showEstimate="${this.showEstimate}"
            text-size="${this.secondaryTextSize}"
            .truncated="${false}"
            .satcomma="${false}">
          </bui-bitcoin-value>
        </div>
      `;
    }
  }

  _renderMessage() {
    return html`
      <div class="message-container">
        ${this.showEmoji ? html`<span class="emoji">${this.emoji}</span>` : ''}
        <span class="message">${this.message}</span>
      </div>
    `;
  }

  _handleClick() {
    this.dispatchEvent(new CustomEvent('amount-tile-click', {
      detail: {
        emoji: this.emoji,
        message: this.message,
        primaryAmount: this.primaryAmount,
        primarySymbol: this.primarySymbol,
        secondaryAmount: this.secondaryAmount,
        secondarySymbol: this.secondarySymbol,
        custom: this.custom === 'true',
        selected: this.selected === 'true'
      },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('bui-amount-option-tile', BuiAmountOptionTile);
