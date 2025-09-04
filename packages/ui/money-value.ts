import { LitElement, html, css, type PropertyValues } from 'lit';
import { validateProperties, createStringLiteralValidationRule } from './utils/validation.js';

const SYMBOL_POSITIONS = ['left', 'right'] as const;
type SymbolPosition = typeof SYMBOL_POSITIONS[number];

const MONEY_SIZES = ['small', 'default', 'large', 'xlarge'] as const;
type MoneySize = typeof MONEY_SIZES[number];

const TEXT_SIZES = ['base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'] as const;
type TextSize = typeof TEXT_SIZES[number];

export class BuiMoneyValue extends LitElement {
  static properties = {
    symbolPosition: { type: String, attribute: 'symbol-position', reflect: true }, // 'left' | 'right'
    symbol: { type: String, reflect: true },
    amount: { type: Number, reflect: true },
    truncation: { type: Boolean, reflect: true },
    size: { type: String, reflect: true }, // 'small' | 'default' | 'large' | 'xlarge'
    satcomma: { type: Boolean, reflect: true },
    showEstimate: { type: Boolean, attribute: 'show-estimate', reflect: true },
    textSize: { type: String, attribute: 'text-size', reflect: true }, // 'base' | 'lg' | ... | '9xl'
  };

  declare symbolPosition: SymbolPosition;
  declare symbol: string;
  declare amount: number;
  declare truncation: boolean;
  declare size: MoneySize | string;
  declare satcomma: boolean;
  declare showEstimate: boolean;
  declare textSize: TextSize | string;

  private validationRules = [
    createStringLiteralValidationRule(SYMBOL_POSITIONS, 'symbolPosition'),
    createStringLiteralValidationRule(MONEY_SIZES, 'size'),
    createStringLiteralValidationRule(TEXT_SIZES, 'textSize'),
  ];

  static styles = [
    css`
      :host {
        display: inline-block;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .money-value {
        display: flex;
        align-items: center;
        gap: var(--size-1);
        font-weight: 500;
        line-height: 1.2;
      }
      
      .estimate {
        font-weight: 400;
      }
      
      .symbol {
        font-weight: 400;
      }
      
      .amount {
        font-weight: 500;
      }

      /* Text size variants */
      .text-base { font-size: 16px; gap: var(--size-1); }
      .text-lg { font-size: 18px; gap: var(--size-1); }
      .text-xl { font-size: 20px; gap: var(--size-1); }
      .text-2xl { font-size: 24px; gap: var(--size-1); }
      .text-3xl { font-size: 30px; gap: var(--size-1); }
      .text-4xl { font-size: 36px; gap: var(--size-2); }
      .text-5xl { font-size: 48px; gap: var(--size-2); }
      .text-6xl { font-size: 60px; gap: var(--size-3); }
      .text-7xl { font-size: 72px; gap: var(--size-3); }
      .text-8xl { font-size: 96px; gap: var(--size-4); }
      .text-9xl { font-size: 128px; gap: var(--size-4); }
    `
  ];

  constructor() {
    super();
    this.symbolPosition = 'left';
    this.symbol = '₿';
    this.amount = 0;
    this.truncation = false;
    this.size = 'default';
    this.satcomma = false;
    this.showEstimate = false;
    this.textSize = 'base';
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    validateProperties(this, changed, this.validationRules);
  }

  private formatAmount(amount: number): string {
    if (this.truncation) {
      return this.formatWithTruncation(amount);
    }
    if (this.satcomma) {
      return this.formatWithSatcomma(amount);
    }
    return this.formatStandard(amount);
  }

  private formatStandard(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 8,
    }).format(amount);
  }

  private formatWithSatcomma(amount: number): string {
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 8,
    }).format(amount);
    const parts = formatted.split('.');
    if (parts.length === 1) return parts[0];
    const integerPart = parts[0];
    const decimalPart = parts[1];
    let formattedDecimal = '';
    if (decimalPart.length >= 2) {
      formattedDecimal = decimalPart.substring(0, 2);
      const remaining = decimalPart.substring(2);
      for (let i = 0; i < remaining.length; i += 3) {
        formattedDecimal += ' ' + remaining.substring(i, i + 3);
      }
    } else {
      formattedDecimal = decimalPart;
    }
    return `${integerPart}.${formattedDecimal}`;
  }

  private formatWithTruncation(amount: number): string {
    try {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      }).format(amount);
    } catch {
      if (amount >= 1000000000) return (amount / 1000000000).toFixed(1) + 'B';
      if (amount >= 1000000) return (amount / 1000000).toFixed(1) + 'M';
      if (amount >= 1000) return (amount / 1000).toFixed(1) + 'K';
      return this.formatStandard(amount);
    }
  }

  private getTextSizeClass(textSize: TextSize | string): string {
    const sizeMap: Record<string, string> = {
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    };
    return sizeMap[textSize] || 'text-base';
  }

  render() {
    const sizeClass = this.size;
    const textSizeClass = this.getTextSizeClass(this.textSize);
    const formattedAmount = this.formatAmount(this.amount);
    
    return html`
      <div class="money-value ${sizeClass} ${textSizeClass}">
        ${this.showEstimate ? html`<span class="estimate">~</span>` : ''}
        ${this.symbolPosition === 'left' 
          ? html`
            <span class="symbol">${this.symbol}</span>
            <span class="amount">${formattedAmount}</span>
          `
          : html`
            <span class="amount">${formattedAmount}</span>
            <span class="symbol">${this.symbol}</span>
          `
        }
      </div>
    `;
  }
}

if (!customElements.get('bui-money-value')) {
  customElements.define('bui-money-value', BuiMoneyValue);
}


