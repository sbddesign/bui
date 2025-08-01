import { LitElement, html, css } from 'lit';

export class BuiMoneyValue extends LitElement {
  static properties = {
    symbolPosition: { type: String, attribute: 'symbol-position', reflect: true }, // 'left' or 'right'
    symbol: { type: String, reflect: true }, // currency symbol
    amount: { type: Number, reflect: true }, // required amount
    truncation: { type: Boolean, reflect: true }, // whether to truncate numbers
    size: { type: String, reflect: true }, // 'small', 'default', 'large', 'xlarge'
  };

  static styles = [
    css`
      :host {
        display: inline-block;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: var(--text-primary);
      }
      
      .money-value {
        display: flex;
        align-items: baseline;
        gap: var(--size-1);
        font-weight: 500;
        line-height: 1.2;
      }
      

      
      .symbol {
        opacity: 0.8;
        font-weight: 400;
      }
      
      .amount {
        font-weight: 500;
      }
      
      /* Responsive font sizes */
      .money-value.small .amount,
      .money-value.small .symbol {
        font-size: 0.875rem;
      }
      
      .money-value.default .amount,
      .money-value.default .symbol {
        font-size: 1rem;
      }
      
      .money-value.large .amount,
      .money-value.large .symbol {
        font-size: 1.25rem;
      }
      
      .money-value.xlarge .amount,
      .money-value.xlarge .symbol {
        font-size: 1.5rem;
      }
    `
  ];

  constructor() {
    super();
    this.symbolPosition = 'left';
    this.symbol = '₿'; // Bitcoin symbol
    this.amount = 0;
    this.truncation = false;
    this.size = 'default';
  }

  formatAmount(amount) {
    if (this.truncation) {
      return this.formatWithTruncation(amount);
    }
    return this.formatStandard(amount);
  }

  formatStandard(amount) {
    // Format with commas for thousands separators
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 8, // Allow up to 8 decimal places for crypto
    }).format(amount);
  }

  formatWithTruncation(amount) {
    // Use Intl.NumberFormat's built-in compact notation
    try {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      }).format(amount);
    } catch (error) {
      // Fallback to custom logic for older browsers
      if (amount >= 1000000000) {
        return (amount / 1000000000).toFixed(1) + 'B';
      } else if (amount >= 1000000) {
        return (amount / 1000000).toFixed(1) + 'M';
      } else if (amount >= 1000) {
        return (amount / 1000).toFixed(1) + 'K';
      } else {
        return this.formatStandard(amount);
      }
    }
  }

  render() {
    const sizeClass = this.size;
    const formattedAmount = this.formatAmount(this.amount);
    
    return html`
      <div class="money-value ${sizeClass}">
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

customElements.define('bui-money-value', BuiMoneyValue); 