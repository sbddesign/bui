import { LitElement, html, css } from 'lit';
import './money-value.js';

export class BuiBitcoinValue extends LitElement {
  static properties = {
    format: { type: String, reflect: true }, // 'sats', 'BTC', 'bip177'
    truncated: { type: Boolean, reflect: true }, // whether to truncate numbers
    amount: { type: Number, reflect: true }, // amount in sats (integer)
    symbolPosition: { type: String, attribute: 'symbol-position', reflect: true }, // 'left', 'right', undefined
    satcomma: { type: Boolean, reflect: true }, // format with spaces in decimal places
    size: { type: String, reflect: true }, // 'small', 'default', 'large', 'xlarge'
    showEstimate: { type: Boolean, attribute: 'show-estimate', reflect: true }, // show estimated symbol (~)
    textSize: { type: String, attribute: 'text-size', reflect: true }, // 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'
  };

  static styles = [
    css`
      :host {
        display: inline-block;
      }
    `
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

  // Convert sats to BTC
  satsToBtc(sats) {
    return sats / 100000000;
  }

  // Get the appropriate symbol and amount for the format
  getFormattedValue() {
    const sats = this.amount;
    
    switch (this.format) {
      case 'sats':
        return {
          symbol: 'sats',
          amount: sats,
          defaultSymbolPosition: 'right'
        };
      case 'BTC':
        return {
          symbol: 'BTC',
          amount: this.satsToBtc(sats),
          defaultSymbolPosition: 'right'
        };
      case 'bip177':
      default:
        return {
          symbol: '₿',
          amount: sats,
          defaultSymbolPosition: 'left'
        };
    }
  }

  render() {
    const formatted = this.getFormattedValue();
    const symbolPosition = this.symbolPosition || formatted.defaultSymbolPosition;
    
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

customElements.define('bui-bitcoin-value', BuiBitcoinValue); 