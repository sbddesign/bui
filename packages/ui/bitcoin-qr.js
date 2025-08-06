import { LitElement, html, css } from 'lit';

export class BuiBitcoinQr extends LitElement {
  static properties = {
    // Input data
    bitcoinAddress: { type: String, attribute: 'bitcoin-address' },
    lightningInvoice: { type: String, attribute: 'lightning-invoice' },
    parameters: { type: String },
    
    // QR Code display options
    qrMode: { type: String, attribute: 'qr-mode' }, // 'unified', 'lightning', 'bitcoin'
    
    // Styling options exposed from bitcoin-qr
    width: { type: Number },
    height: { type: Number },
    margin: { type: Number },
    image: { type: String },
    imageSize: { type: Number, attribute: 'image-size' },
    imageMargin: { type: Number, attribute: 'image-margin' },
    imageEmbedded: { type: Boolean, attribute: 'image-embedded' },
    
    // QR styling
    dotsType: { type: String, attribute: 'dots-type' },
    dotsColor: { type: String, attribute: 'dots-color' },
    backgroundColor: { type: String, attribute: 'background-color' },
    cornersSquareType: { type: String, attribute: 'corners-square-type' },
    cornersSquareColor: { type: String, attribute: 'corners-square-color' },
    cornersDotType: { type: String, attribute: 'corners-dot-type' },
    cornersDotColor: { type: String, attribute: 'corners-dot-color' },
    qrErrorCorrectionLevel: { type: String, attribute: 'qr-error-correction-level' },
  };

  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .qr-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .dots-container {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--button-outline-outline, #ccc);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .dot.active {
      background-color: var(--button-filled-bg, #007aff);
      transform: scale(1.2);
    }

    .dot:hover {
      background-color: var(--button-filled-hover-bg, #0056cc);
    }

    .mode-label {
      font-size: 0.875rem;
      color: var(--text-secondary, #666);
      text-align: center;
      margin-top: 0.5rem;
    }

    bitcoin-qr {
      display: block;
    }
  `;

  constructor() {
    super();
    this.qrMode = 'unified';
    this.width = 256;
    this.height = 256;
    this.margin = 10;
    this.qrErrorCorrectionLevel = 'M';
  }

  firstUpdated() {
    // Load the bitcoin-qr web component script if not already loaded
    if (!customElements.get('bitcoin-qr')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/bitcoin-qr@1.4.1/dist/bitcoin-qr/bitcoin-qr.esm.js';
      document.head.appendChild(script);
    }
  }

  _handleDotClick(mode) {
    this.qrMode = mode;
    this.requestUpdate();
  }

  _getQrData() {
    switch (this.qrMode) {
      case 'lightning':
        return this.lightningInvoice || '';
      case 'bitcoin':
        return this.bitcoinAddress || '';
      case 'unified':
      default:
        // Create unified BIP-21 URI if both address and invoice are provided
        if (this.bitcoinAddress && this.lightningInvoice) {
          let unified = `bitcoin:${this.bitcoinAddress}?lightning=${this.lightningInvoice}`;
          if (this.parameters) {
            const separator = this.parameters.startsWith('&') ? '' : '&';
            unified += separator + this.parameters;
          }
          return unified;
        } else if (this.bitcoinAddress) {
          return this.bitcoinAddress;
        } else if (this.lightningInvoice) {
          return this.lightningInvoice;
        }
        return '';
    }
  }

  _getModeLabel() {
    switch (this.qrMode) {
      case 'lightning':
        return 'Lightning';
      case 'bitcoin':
        return 'On-chain';
      case 'unified':
      default:
        return 'Unified';
    }
  }

  _canShowMode(mode) {
    switch (mode) {
      case 'lightning':
        return !!this.lightningInvoice;
      case 'bitcoin':
        return !!this.bitcoinAddress;
      case 'unified':
        return !!(this.bitcoinAddress && this.lightningInvoice);
      default:
        return false;
    }
  }

  _getAvailableModes() {
    const modes = [];
    if (this._canShowMode('unified')) modes.push('unified');
    if (this._canShowMode('lightning')) modes.push('lightning');
    if (this._canShowMode('bitcoin')) modes.push('bitcoin');
    return modes;
  }

  render() {
    const qrData = this._getQrData();
    const availableModes = this._getAvailableModes();
    
    if (!qrData) {
      return html`<div class="qr-container">
        <div style="padding: 2rem; text-align: center; color: var(--text-secondary, #666);">
          Please provide a Bitcoin address and/or Lightning invoice
        </div>
      </div>`;
    }

    // If only one mode is available, don't show dots
    const showDots = availableModes.length > 1;

    return html`
      <div class="qr-container">
        <bitcoin-qr
          unified="${this.qrMode === 'unified' ? qrData : ''}"
          bitcoin="${this.qrMode === 'bitcoin' ? qrData : ''}"
          lightning="${this.qrMode === 'lightning' ? qrData : ''}"
          width="${this.width}"
          height="${this.height}"
          margin="${this.margin}"
          image="${this.image || ''}"
          image-size="${this.imageSize || ''}"
          image-margin="${this.imageMargin || ''}"
          ?image-embedded="${this.imageEmbedded}"
          dots-type="${this.dotsType || ''}"
          dots-color="${this.dotsColor || ''}"
          background-color="${this.backgroundColor || ''}"
          corners-square-type="${this.cornersSquareType || ''}"
          corners-square-color="${this.cornersSquareColor || ''}"
          corners-dot-type="${this.cornersDotType || ''}"
          corners-dot-color="${this.cornersDotColor || ''}"
          qr-error-correction-level="${this.qrErrorCorrectionLevel}"
        ></bitcoin-qr>
        
        ${showDots ? html`
          <div class="dots-container">
            ${availableModes.map(mode => html`
              <div 
                class="dot ${this.qrMode === mode ? 'active' : ''}"
                @click="${() => this._handleDotClick(mode)}"
                title="${this._getModeLabel()}"
              ></div>
            `)}
          </div>
        ` : ''}
        
        <div class="mode-label">${this._getModeLabel()}</div>
      </div>
    `;
  }
}

customElements.define('bui-bitcoin-qr', BuiBitcoinQr);