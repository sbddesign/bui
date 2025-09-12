import { LitElement, html, css } from 'lit';
import type { PropertyValues } from 'lit';
import './option-dot.js';
import './button.js';
import '@sbddesign/bui-icons/cycle/lg';
import '@sbddesign/bui-icons/cycle/md';
import '@sbddesign/bui-icons/checkCircle/lg';
import { QRCodeStyling } from '@liquid-js/qr-code-styling';

import { validateProperties, createStringLiteralValidationRule } from './utils/validation.js';

const OPTIONS = ['unified', 'lightning', 'onchain'] as const;
type QrOption = typeof OPTIONS[number];

const SELECTORS = ['dots', 'toggle'] as const;
type SelectorType = typeof SELECTORS[number];

const DOT_TYPES = ['dot', 'square', 'rounded', 'extra-rounded', 'classy', 'classy-rounded', 'random-dot', 'vertical-line', 'horizontal-line', 'small-square', 'tiny-square', 'diamond'] as const;
type DotType = typeof DOT_TYPES[number];

const OPTION_LABELS: Record<QrOption, string> = {
  unified: 'Bitcoin QR',
  onchain: 'On-chain',
  lightning: 'Lightning',
};

const HELPER_TEXTS: Record<QrOption, string> = {
  unified: 'Scan with any Bitcoin on-chain or Lightning wallet',
  onchain: 'Scan with any Bitcoin on-chain wallet',
  lightning: 'Scan with any Bitcoin Lightning wallet',
};

export class BuiBitcoinQrDisplay extends LitElement {
  static properties = {
    address: { type: String },
    lightning: { type: String },
    option: { type: String, reflect: true }, // 'unified' | 'onchain' | 'lightning'
    selector: { type: String, reflect: true }, // 'dots' | 'toggle'
    size: { type: Number }, // QR inner size in px (square)
    showImage: { type: Boolean, reflect: true }, // Show icon overlay on QR code
    dotType: { type: String, reflect: true }, // QR dot style: 'rounded' | 'square' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded'
    dotColor: { type: String, reflect: true }, // QR dot color
    unifiedImage: { type: String }, // Custom image URL for unified QR codes
    lightningImage: { type: String }, // Custom image URL for lightning QR codes
    onchainImage: { type: String }, // Custom image URL for on-chain QR codes
    copyOnTap: { type: Boolean, reflect: true }, // Enable tap-to-copy functionality
    placeholder: { type: Boolean, reflect: true }, // Show placeholder/loading state
    error: { type: Boolean, reflect: true }, // Show error state
    errorMessage: { type: String }, // Custom error message
    complete: { type: Boolean, reflect: true }, // Show complete/success state
  };

  declare address: string;
  declare lightning: string;
  declare option: QrOption;
  declare selector: SelectorType;
  declare size: number;
  declare showImage: boolean;
  declare dotType: string;
  declare dotColor: string;
  declare unifiedImage: string;
  declare lightningImage: string;
  declare onchainImage: string;
  declare copyOnTap: boolean;
  declare placeholder: boolean;
  declare error: boolean;
  declare errorMessage: string;
  declare complete: boolean;

  private qrCodeInstance: QRCodeStyling | null = null;
  private qrContainer: HTMLElement | null = null;
  private isUpdatingQR: boolean = false;

  private validationRules = [
    createStringLiteralValidationRule(OPTIONS, 'option'),
    createStringLiteralValidationRule(SELECTORS, 'selector'),
    createStringLiteralValidationRule(DOT_TYPES, 'dotType'),
  ];

  static styles = [
    css`
      :host { display: block; }
      .container { display: flex; flex-direction: column; align-items: center; gap: var(--size-3); border-radius: 8.909px; }
      .helper-text { color: var(--text-secondary); font-size: 14px; text-align: center; }
      .frame { background: var(--white); border: 1px solid var(--system-divider); border-radius: var(--size-2); padding: var(--size-6); display: flex; align-items: center; justify-content: center; position: relative; }
      .qr { width: var(--qr-size); height: var(--qr-size); display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; }
      .qr-container { position: relative; }
      .qr-container canvas, .qr-container svg {
        width: 100%;
        height: auto;
      }
      .qr-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        padding: var(--size-3);
        background: var(--white);
        border-radius: 80px;
        pointer-events: none;
        z-index: 10;
      }
      .qr-overlay img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .options { display: flex; flex-direction: column; align-items: center; gap: var(--size-3); padding: var(--size-3) 0; }
      .dots-row { display: flex; gap: var(--size-4); align-items: center; }
      .selector-row { display: flex; gap: var(--size-4); align-items: center; }
      
      /* Placeholder styles */
      .placeholder-helper { background: var(--system-placeholder); height: 17px; border-radius: 28px; width: 240px; }
      .placeholder-qr { background: var(--system-placeholder); border-radius: 12px; width: 332.606px; height: 332.606px; }
      .placeholder-options { background: var(--system-placeholder); height: 48px; border-radius: 12px; width: 100px; }
      
      /* Error state styles */
      .error-helper-placeholder { 
        background: var(--tailwind-stone-100); 
        height: 20px; 
        border-radius: 28px; 
        width: 240px; 
        opacity: 0; 
      }
      .error-options-placeholder { 
        background: var(--tailwind-stone-100); 
        height: 48px; 
        border-radius: 12px; 
        width: 100px; 
        opacity: 0; 
      }
      .error-message { 
        color: var(--text-secondary); 
        font-size: 14px; 
        text-align: center; 
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: var(--size-4);
        box-sizing: border-box;
      }
      .complete-qr {
        background: var(--system-mood-success);
        border-radius: 12px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .complete-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--size-2);
        text-align: center;
      }
      .complete-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--white);
      }
      .complete-text {
        color: var(--white);
        font-size: 24px;
        font-weight: 400;
        line-height: 1;
        margin: 0;
      }
    `,
  ];

  constructor() {
    super();
    this.address = '';
    this.lightning = '';
    this.option = 'unified';
    this.selector = 'dots';
    this.size = 332;
    this.showImage = true;
    this.dotType = 'dot';
    this.dotColor = '#000000';
    this.unifiedImage = '';
    this.lightningImage = '';
    this.onchainImage = '';
    this.copyOnTap = true;
    this.placeholder = false;
    this.error = false;
    this.errorMessage = 'Sorry, an error occurred. Try again later.';
    this.complete = false;
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    validateProperties(this, changed, this.validationRules);
  }

  protected async updated(changed: PropertyValues<this>): Promise<void> {
    if (changed.has('address') || changed.has('lightning') || changed.has('option') || changed.has('size') || changed.has('showImage') || changed.has('dotType') || changed.has('dotColor') || changed.has('unifiedImage') || changed.has('lightningImage') || changed.has('onchainImage') || changed.has('placeholder') || changed.has('error')) {
      await this.updateQRCode();
    }
  }

  protected firstUpdated(): void {
    this.qrContainer = this.shadowRoot?.querySelector('.qr-container') as HTMLElement;
    // Use requestAnimationFrame to ensure DOM is fully ready
    requestAnimationFrame(() => {
      this.updateQRCode();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // Clean up QR code instance when component is removed
    if (this.qrCodeInstance) {
      this.qrCodeInstance = null;
    }
  }

  private get hasBothAddressAndLightning(): boolean {
    return Boolean(this.address && this.lightning);
  }

  private get effectiveOption(): QrOption {
    if (this.address && !this.lightning) return 'onchain';
    if (this.lightning && !this.address) return 'lightning';
    return this.option;
  }

  private get shouldShowSelector(): boolean {
    return this.hasBothAddressAndLightning;
  }

  private get helperText(): string {
    const effective = this.effectiveOption;
    return HELPER_TEXTS[effective] || HELPER_TEXTS.unified;
  }

  private get unifiedString(): string {
    if (!this.address || !this.lightning) return '';
    return `bitcoin:${this.address}?lightning=${this.lightning}`;
  }

  private getQrData(): string {
    const effectiveOption = this.effectiveOption;
    if (effectiveOption === 'unified' && this.address && this.lightning) {
      return this.unifiedString;
    } else if (effectiveOption === 'onchain' && this.address) {
      return this.address;
    } else if (effectiveOption === 'lightning' && this.lightning) {
      return this.lightning;
    }
    return '';
  }

  private getIconDataUrl(): string {
    if (!this.showImage) return '';
    
    const effectiveOption = this.effectiveOption;
    
    // Check for custom images first
    if (effectiveOption === 'unified' && this.unifiedImage) {
      return this.unifiedImage;
    } else if (effectiveOption === 'lightning' && this.lightningImage) {
      return this.lightningImage;
    } else if (effectiveOption === 'onchain' && this.onchainImage) {
      return this.onchainImage;
    }
    
    // Fall back to default SVG icons
    let svgContent = '';
    
    if (effectiveOption === 'unified') {
      // Orange Bitcoin icon for unified
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 64 64">
        <rect width="64" height="64" fill="#FF8904" rx="32"/>
        <path stroke="#fff" stroke-linecap="square" stroke-linejoin="round" stroke-width="5.333" d="m19.58 43.986 6.88-27.608m-8.94 27.099s8.016 1.992 15.499 3.861c15.311 3.817 16.628-11.564 3.687-14.791C48.517 35.49 50.987 22.495 39.9 19.73l-15.92-3.971m1.646 14.028 10.849 2.703m-.516-13.743 1.476-5.914M27.98 52.366l1.476-5.918"/>
      </svg>`;
    } else if (effectiveOption === 'lightning') {
      // Yellow Lightning icon for lightning
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 64 64">
        <rect width="64" height="64" fill="#FDC700" rx="32"/>
        <path fill="#fff" d="m14.5 37.095 11.143-24.762h20.614l-6.128 13.62H53.5L21.186 55.666l4.785-18.572H14.5Z"/>
      </svg>`;
    } else if (effectiveOption === 'onchain') {
      // Black Bitcoin icon for on-chain
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 64 64">
        <rect width="64" height="64" fill="#000" rx="32"/>
        <path stroke="#fff" stroke-linecap="square" stroke-linejoin="round" stroke-width="5.333" d="m19.58 43.986 6.88-27.608m-8.94 27.099s8.016 1.992 15.499 3.861c15.311 3.817 16.628-11.564 3.687-14.791C48.517 35.49 50.987 22.495 39.9 19.73l-15.92-3.971m1.646 14.028 10.849 2.703m-.516-13.743 1.476-5.914M27.98 52.366l1.476-5.918"/>
      </svg>`;
    }
    
    if (svgContent) {
      return `data:image/svg+xml;base64,${btoa(svgContent)}`;
    }
    
    return '';
  }

  private createQRCode(): QRCodeStyling {
    const qrData = this.getQrData();
    const iconDataUrl = this.getIconDataUrl();
    
    // Start with minimal configuration
    const config: any = {
      data: qrData,
      width: this.size,
      height: this.size,
      type: 'canvas',
      dotsOptions: {
        color: this.dotColor,
        type: this.dotType,
        size: 10
      },
      backgroundOptions: {
        color: '#ffffff',
        margin: 0
      }
    };

    // Images will be handled manually with CSS overlay
    
    console.log('QR Code config dotsOptions:', config.dotsOptions);
    
    return new QRCodeStyling(config);
  }


  private async updateQRCode(): Promise<void> {
    if (!this.qrContainer || this.isUpdatingQR) return;
    
    this.isUpdatingQR = true;
    
    
    // More thorough cleanup
    this.cleanupQRCode();
    
    try {
      // Handle placeholder state
      if (this.placeholder) {
        this.isUpdatingQR = false;
        return; // Placeholder will be rendered in the template
      }
      
      // Handle error state
      if (this.error) {
        const err = document.createElement('div');
        err.className = 'error-message';
        const p = document.createElement('p');
        p.textContent = this.errorMessage;
        err.appendChild(p);
        this.qrContainer.replaceChildren(err);
        this.isUpdatingQR = false;
        return;
      }
      
      const qrData = this.getQrData();
      if (!qrData) {
        // No data provided - show error state
        this.qrContainer.innerHTML = '<div class="error-message">No Bitcoin address or Lightning invoice provided</div>';
        this.isUpdatingQR = false;
        return;
      }

      this.qrCodeInstance = this.createQRCode();
      this.qrCodeInstance.append(this.qrContainer);
      
      // Add click handler for copy functionality
      if (this.copyOnTap) {
        this.qrContainer.style.cursor = 'pointer';
        this.qrContainer.addEventListener('click', this.handleQrClick.bind(this));
      }
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      console.error('QR Data:', this.getQrData());
      console.error('Image URL:', this.getIconDataUrl());
      this.qrContainer.innerHTML = '<div class="error-message">Failed to render QR code 😭</div>';
    } finally {
      this.isUpdatingQR = false;
    }
  }

  private cleanupQRCode(): void {
    // Clear existing QR code instance
    if (this.qrCodeInstance) {
      this.qrCodeInstance = null;
    }
    
    // Clear container completely
    if (this.qrContainer) {
      this.qrContainer.innerHTML = '';
    }
  }

  private async handleQrClick(): Promise<void> {
    if (!this.copyOnTap) return;
    
    const qrData = this.getQrData();
    if (!qrData) return;
    
    try {
      await navigator.clipboard.writeText(qrData);
      
      // Emit custom copy event
      this.dispatchEvent(new CustomEvent('bui-copy', {
        detail: {
          copiedText: qrData,
          source: 'qr-code',
          component: 'bui-bitcoin-qr-display'
        },
        bubbles: true,
        composed: true
      }));
    } catch (error) {
      console.error('Failed to copy QR data to clipboard:', error);
      
      // Emit error event
      this.dispatchEvent(new CustomEvent('bui-copy-error', {
        detail: {
          error: error,
          attemptedText: qrData,
          source: 'qr-code',
          component: 'bui-bitcoin-qr-display'
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  private cycleOption(): void {
    if (!this.shouldShowSelector) return;
    const order: QrOption[] = ['unified', 'lightning', 'onchain'];
    const idx = order.indexOf(this.option);
    const next = order[(idx + 1) % order.length];
    this.option = next;
  }

  private setOption(newOption: QrOption): void {
    if (!this.shouldShowSelector) return;
    this.option = newOption;
  }

  private renderDotsSelector() {
    if (!this.shouldShowSelector) return null;
    const unifiedActive = this.option === 'unified';
    const lightningActive = this.option === 'lightning';
    const onchainActive = this.option === 'onchain';
    return html`
      <div class="dots-row">
        <bui-option-dot .active=${unifiedActive} @click=${() => this.setOption('unified')} title="${OPTION_LABELS.unified}"></bui-option-dot>
        <bui-option-dot .active=${lightningActive} @click=${() => this.setOption('lightning')} title="${OPTION_LABELS.lightning}"></bui-option-dot>
        <bui-option-dot .active=${onchainActive} @click=${() => this.setOption('onchain')} title="${OPTION_LABELS.onchain}"></bui-option-dot>
      </div>
    `;
  }

  private renderToggleSelector() {
    if (!this.shouldShowSelector) return null;
    return html`
      <div class="selector-row">
        <bui-button
          style-type="free"
          size="default"
          content="label+icon"
          label="${OPTION_LABELS[this.option]}"
          aria-label="Cycle QR format"
          @click=${() => this.cycleOption()}
        >
          <bui-cycle-md slot="icon"></bui-cycle-md>
        </bui-button>
      </div>
    `;
  }

  private renderSelector() {
    if (!this.shouldShowSelector) return null;
    if (this.selector === 'toggle') return this.renderToggleSelector();
    return html`
      ${this.renderDotsSelector()}
      <div class="helper-text">${OPTION_LABELS[this.option]}</div>
    `;
  }

  private renderQr() {
    const qrInlineStyle = `width: ${this.size}px; height: ${this.size}px;`;
    const title = this.copyOnTap && !this.placeholder && !this.error ? 'Click to copy QR code data' : '';
    const iconDataUrl = this.getIconDataUrl();
    
    
    // Handle placeholder state
    if (this.placeholder) {
      return html`
        <div class="frame">
          <div class="qr qr-container placeholder-qr" style="${qrInlineStyle}">
            <!-- Placeholder QR area -->
          </div>
        </div>
      `;
    }
    
    // Handle complete state
    if (this.complete) {
      return html`
        <div class="frame">
          <div class="qr complete-qr" style="${qrInlineStyle}">
            <div class="complete-content">
              <div class="complete-icon">
                <bui-check-circle-lg></bui-check-circle-lg>
              </div>
              <p class="complete-text">Payment Received</p>
            </div>
          </div>
        </div>
      `;
    }
    
    return html`
      <div class="frame">
        <div class="qr qr-container" style="${qrInlineStyle}" title="${title}">
          <!-- QR code will be rendered here by qr-code-styling -->
        </div>
        ${this.showImage && iconDataUrl && !this.error ? html`
          <div class="qr-overlay">
            <img src="${iconDataUrl}" alt="QR code icon" />
          </div>
        ` : ''}
      </div>
    `;
  }

  render() {
    return html`
      <div class="container">
        ${this.placeholder ? html`<div class="placeholder-helper"></div>` : (this.error ? html`<div class="error-helper-placeholder"></div>` : (this.complete ? html`<div class="helper-text" style="opacity: 0;">${this.helperText}</div>` : html`<div class="helper-text">${this.helperText}</div>`))}
        ${this.renderQr()}
        ${this.placeholder ? (this.shouldShowSelector ? html`<div class="placeholder-options"></div>` : null) : (this.error ? (this.shouldShowSelector ? html`<div class="options" style="opacity: 0;">${this.renderSelector()}</div>` : null) : (this.complete ? (this.shouldShowSelector ? html`<div class="options" style="opacity: 0;">${this.renderSelector()}</div>` : null) : (this.shouldShowSelector ? html`<div class="options">${this.renderSelector()}</div>` : null)))}
      </div>
    `;
  }
}

if (!customElements.get('bui-bitcoin-qr-display')) {
  customElements.define('bui-bitcoin-qr-display', BuiBitcoinQrDisplay);
}


