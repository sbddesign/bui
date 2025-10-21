import { LitElement, html, css, type PropertyValues } from 'lit';
import './money-value.js';
import {
  validateProperties,
  createStringLiteralValidationRule,
} from './utils/validation.js';

const FORMATS = ['sats', 'BTC', 'bip177'] as const;
type BitcoinFormat = (typeof FORMATS)[number];

const SYMBOL_POSITIONS = ['left', 'right'] as const;
type SymbolPosition = (typeof SYMBOL_POSITIONS)[number];

const MONEY_SIZES = ['small', 'default', 'large', 'xlarge'] as const;
type MoneySize = (typeof MONEY_SIZES)[number];

const TEXT_SIZES = [
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl',
] as const;
type TextSize = (typeof TEXT_SIZES)[number];

export class BuiBitcoinValue extends LitElement {
  static properties = {
    format: { type: String, reflect: true }, // 'sats' | 'BTC' | 'bip177'
    truncated: { type: Boolean, reflect: true },
    amount: { type: Number, reflect: true }, // amount in sats (integer)
    symbolPosition: {
      type: String,
      attribute: 'symbol-position',
      reflect: true,
    }, // 'left' | 'right'
    satcomma: { type: Boolean, reflect: true },
    size: { type: String, reflect: true }, // 'small' | 'default' | 'large' | 'xlarge'
    showEstimate: { type: Boolean, attribute: 'show-estimate', reflect: true },
    textSize: { type: String, attribute: 'text-size', reflect: true }, // 'base' | ... | '9xl'
  };

  declare format: BitcoinFormat;
  declare truncated: boolean;
  declare amount: number;
  declare symbolPosition?: SymbolPosition;
  declare satcomma: boolean;
  declare size: MoneySize | string;
  declare showEstimate: boolean;
  declare textSize: TextSize | string;

  private validationRules = [
    createStringLiteralValidationRule(FORMATS, 'format'),
    createStringLiteralValidationRule(SYMBOL_POSITIONS, 'symbolPosition'),
    createStringLiteralValidationRule(MONEY_SIZES, 'size'),
    createStringLiteralValidationRule(TEXT_SIZES, 'textSize'),
  ];

  static styles = [
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  constructor() {
    super();
    this.format = 'bip177';
    this.truncated = false;
    this.amount = 0;
    this.symbolPosition = undefined;
    this.satcomma = false;
    this.size = 'default';
    this.showEstimate = false;
    this.textSize = 'base';
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    validateProperties(this, changed, this.validationRules);
  }

  private satsToBtc(sats: number): number {
    return sats / 100000000;
  }

  private getFormattedValue(): {
    symbol: string;
    amount: number;
    defaultSymbolPosition: SymbolPosition;
  } {
    const sats = this.amount;
    switch (this.format) {
      case 'sats':
        return { symbol: 'sats', amount: sats, defaultSymbolPosition: 'right' };
      case 'BTC':
        return {
          symbol: 'BTC',
          amount: this.satsToBtc(sats),
          defaultSymbolPosition: 'right',
        };
      case 'bip177':
      default:
        return { symbol: '₿', amount: sats, defaultSymbolPosition: 'left' };
    }
  }

  render() {
    const formatted = this.getFormattedValue();
    const symbolPosition =
      this.symbolPosition || formatted.defaultSymbolPosition;

    return html`
      <bui-money-value
        symbol="${formatted.symbol}"
        .amount="${formatted.amount}"
        symbol-position="${symbolPosition}"
        .truncation="${this.truncated}"
        .satcomma="${this.satcomma}"
        size="${this.size}"
        .showEstimate="${this.showEstimate}"
        text-size="${this.textSize}"
      ></bui-money-value>
    `;
  }
}

if (!customElements.get('bui-bitcoin-value')) {
  customElements.define('bui-bitcoin-value', BuiBitcoinValue);
}
