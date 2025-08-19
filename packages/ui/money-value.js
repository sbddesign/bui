import { LitElement, html, css } from 'lit';

export class BuiMoneyValue extends LitElement {
  static properties = {
    symbolPosition: { type: String, attribute: 'symbol-position', reflect: true }, // 'left' or 'right'
    symbol: { type: String, reflect: true }, // currency symbol
    amount: { type: Number, reflect: true }, // required amount
    truncation: { type: Boolean, reflect: true }, // whether to truncate numbers
    size: { type: String, reflect: true }, // 'small', 'default', 'large', 'xlarge'
    satcomma: { type: Boolean, reflect: true }, // format with spaces in decimal places
    showEstimate: { type: Boolean, attribute: 'show-estimate', reflect: true }, // show estimated symbol (~)
    textSize: { type: String, attribute: 'text-size', reflect: true }, // 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'
  };

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
        color: var(--text-primary);
      }
      
      .symbol {
        opacity: 0.8;
        font-weight: 400;
      }
      
      .amount {
        font-weight: 500;
      }

      /* Text size variants */
      .text-base {
        font-size: 16px;
        gap: var(--size-1);
      }
      
      .text-lg {
        font-size: 18px;
        gap: var(--size-1);
      }
      
      .text-xl {
        font-size: 20px;
        gap: var(--size-1);
      }
      
      .text-2xl {
        font-size: 24px;
        gap: var(--size-1);
      }
      
      .text-3xl {
        font-size: 30px;
        gap: var(--size-1);
      }
      
      .text-4xl {
        font-size: 36px;
        gap: var(--size-2);
      }
      
      .text-5xl {
        font-size: 48px;
        gap: var(--size-2);
      }
      
      .text-6xl {
        font-size: 60px;
        gap: var(--size-3);
      }
      
      .text-7xl {
        font-size: 72px;
        gap: var(--size-3);
      }
      
      .text-8xl {
        font-size: 96px;
        gap: var(--size-4);
      }
      
      .text-9xl {
        font-size: 128px;
        gap: var(--size-4);
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
    this.satcomma = false;
    this.showEstimate = false; // Default to false as requested
    this.textSize = 'base';
  }

  formatAmount(amount) {
    if (this.truncation) {
      return this.formatWithTruncation(amount);
    }
    if (this.satcomma) {
      return this.formatWithSatcomma(amount);
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

  formatWithSatcomma(amount) {
    // Format with spaces in decimal places (satcomma format)
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 8, // Allow up to 8 decimal places for crypto
    }).format(amount);
    
    // Split into integer and decimal parts
    const parts = formatted.split('.');
    if (parts.length === 1) {
      // No decimal part, just return the integer part
      return parts[0];
    }
    
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Add spaces to decimal part: 2 chars, then every 3 chars
    let formattedDecimal = '';
    if (decimalPart.length >= 2) {
      formattedDecimal = decimalPart.substring(0, 2);
      const remaining = decimalPart.substring(2);
      
      // Add spaces every 3 characters
      for (let i = 0; i < remaining.length; i += 3) {
        formattedDecimal += ' ' + remaining.substring(i, i + 3);
      }
    } else {
      formattedDecimal = decimalPart;
    }
    
    return `${integerPart}.${formattedDecimal}`;
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

  getTextSizeClass(textSize) {
    // Map textSize values to valid CSS class names
    const sizeMap = {
      'base': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl'
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

customElements.define('bui-money-value', BuiMoneyValue); 