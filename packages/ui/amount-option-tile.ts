import { LitElement, html, css, type PropertyValues } from 'lit';
import './money-value.js';
import './bitcoin-value.js';
import { validateProperties, createStringLiteralValidationRule } from './utils/validation.js';

const TEXT_SIZES = ['base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'] as const;
type TextSize = typeof TEXT_SIZES[number];

export interface AmountTileClickDetail {
  emoji: string;
  message: string;
  primaryAmount: number;
  primarySymbol: string;
  secondaryAmount: number;
  secondarySymbol: string;
  custom: boolean;
  selected: boolean;
}

const booleanStringConverter = {
  fromAttribute: (value: string | null) => value === 'true' || value === '',
  toAttribute: (value: boolean) => (value ? 'true' : 'false'),
};

export class BuiAmountOptionTile extends LitElement {
  static properties = {
    emoji: { type: String, reflect: true },
    message: { type: String, reflect: true },
    showEmoji: { type: Boolean, attribute: 'show-emoji', reflect: true },
    showMessage: { type: Boolean, attribute: 'show-message', reflect: true },
    showSecondaryCurrency: { type: Boolean, attribute: 'show-secondary-currency', reflect: true },
    bitcoinFirst: { type: Boolean, attribute: 'bitcoin-first', reflect: true, converter: booleanStringConverter },
    custom: { type: Boolean, attribute: 'custom', reflect: true, converter: booleanStringConverter },
    amountDefined: { type: Boolean, attribute: 'amount-defined', reflect: true, converter: booleanStringConverter },
    selected: { type: Boolean, attribute: 'selected', reflect: true, converter: booleanStringConverter },
    primaryAmount: { type: Number, reflect: true },
    primarySymbol: { type: String, attribute: 'primary-symbol', reflect: true },
    secondaryAmount: { type: Number, reflect: true },
    secondarySymbol: { type: String, attribute: 'secondary-symbol', reflect: true },
    showEstimate: { type: Boolean, attribute: 'show-estimate', reflect: true },
    primaryTextSize: { type: String, attribute: 'primary-text-size', reflect: true },
    secondaryTextSize: { type: String, attribute: 'secondary-text-size', reflect: true },
  } as const;

  declare emoji: string;
  declare message: string;
  declare showEmoji: boolean;
  declare showMessage: boolean;
  declare showSecondaryCurrency: boolean;
  declare bitcoinFirst: boolean;
  declare custom: boolean;
  declare amountDefined: boolean;
  declare selected: boolean;
  declare primaryAmount: number;
  declare primarySymbol: string;
  declare secondaryAmount: number;
  declare secondarySymbol: string;
  declare showEstimate: boolean;
  declare primaryTextSize: TextSize;
  declare secondaryTextSize: TextSize;

  private validationRules = [
    createStringLiteralValidationRule(TEXT_SIZES, 'primaryTextSize'),
    createStringLiteralValidationRule(TEXT_SIZES, 'secondaryTextSize'),
  ];

  static styles = [
    css`
      :host {
        display: block;
        height: 200px;
        width: 100%;
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
    `,
  ];

  constructor() {
    super();
    this.emoji = '🔥';
    this.message = 'Incredible';
    this.showEmoji = true;
    this.showMessage = true;
    this.showSecondaryCurrency = true;
    this.bitcoinFirst = false;
    this.custom = false;
    this.amountDefined = true;
    this.selected = false;
    this.primaryAmount = 30;
    this.primarySymbol = '$';
    this.secondaryAmount = 0.001;
    this.secondarySymbol = '₿';
    this.showEstimate = true;
    this.primaryTextSize = '6xl';
    this.secondaryTextSize = '2xl';
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    validateProperties(this, changed, this.validationRules);
  }

  render() {
    const isSelected = this.selected;
    const isCustom = this.custom;
    const hasAmount = this.amountDefined;
    const isBitcoinFirst = this.bitcoinFirst;

    return html`
      <div class="tile ${isSelected ? 'selected' : ''} ${isCustom ? 'custom' : ''}" @click=${this.handleClick}>
        ${this.renderContent(isSelected, isCustom, hasAmount, isBitcoinFirst)}
      </div>
    `;
  }

  private renderContent(isSelected: boolean, isCustom: boolean, hasAmount: boolean, isBitcoinFirst: boolean) {
    if (isCustom && !hasAmount) {
      return html`<div class="custom-text">Custom Amount</div>`;
    }

    if (isCustom && hasAmount) {
      return html`
        <div class="amounts">
          ${this.renderPrimaryAmount()}
          ${this.showSecondaryCurrency ? this.renderSecondaryAmount() : ''}
        </div>
        <button class="custom-button">Edit</button>
      `;
    }

    return html`
      <div class="amounts">
        ${this.renderPrimaryAmount()}
        ${this.showSecondaryCurrency ? this.renderSecondaryAmount() : ''}
      </div>
      ${this.showMessage ? this.renderMessage() : ''}
    `;
  }

  private renderPrimaryAmount() {
    if (this.bitcoinFirst) {
      return html`
        <bui-bitcoin-value
          format="bip177"
          .amount=${this.primaryAmount}
          symbol-position="left"
          .showEstimate=${false}
          text-size="${this.primaryTextSize}"
          .truncated=${false}
          .satcomma=${false}
        ></bui-bitcoin-value>
      `;
    } else {
      return html`
        <bui-money-value
          symbol="${this.primarySymbol}"
          .amount=${this.primaryAmount}
          symbol-position="left"
          .showEstimate=${false}
          text-size="${this.primaryTextSize}"
          .truncation=${false}
          .satcomma=${false}
        ></bui-money-value>
      `;
    }
  }

  private renderSecondaryAmount() {
    if (this.bitcoinFirst) {
      return html`
        <div style="color: var(--text-secondary);">
          <bui-money-value
            symbol="${this.secondarySymbol}"
            .amount=${this.secondaryAmount}
            symbol-position="left"
            .showEstimate=${this.showEstimate}
            text-size="${this.secondaryTextSize}"
            .truncation=${false}
            .satcomma=${false}
          ></bui-money-value>
        </div>
      `;
    } else {
      return html`
        <div style="color: var(--text-secondary);">
          <bui-bitcoin-value
            format="bip177"
            .amount=${this.secondaryAmount}
            symbol-position="left"
            .showEstimate=${this.showEstimate}
            text-size="${this.secondaryTextSize}"
            .truncated=${false}
            .satcomma=${false}
          ></bui-bitcoin-value>
        </div>
      `;
    }
  }

  private renderMessage() {
    return html`
      <div class="message-container">
        ${this.showEmoji ? html`<span class="emoji">${this.emoji}</span>` : ''}
        <span class="message">${this.message}</span>
      </div>
    `;
  }

  private handleClick = () => {
    this.dispatchEvent(new CustomEvent<AmountTileClickDetail>('amount-tile-click', {
      detail: {
        emoji: this.emoji,
        message: this.message,
        primaryAmount: this.primaryAmount,
        primarySymbol: this.primarySymbol,
        secondaryAmount: this.secondaryAmount,
        secondarySymbol: this.secondarySymbol,
        custom: this.custom,
        selected: this.selected,
      },
      bubbles: true,
      composed: true,
    }));
  };
}

if (!customElements.get('bui-amount-option-tile')) {
  customElements.define('bui-amount-option-tile', BuiAmountOptionTile);
}


