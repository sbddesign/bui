import { LitElement, html, css } from 'lit';
import type { PropertyValues } from 'lit';
import './option-dot.js';
import './button.js';
import '@bui/icons/cycle/lg';
import '@bui/icons/cycle/md';
import * as QRCodeStyling from 'qr-code-styling';

import { validateProperties, createStringLiteralValidationRule } from './utils/validation.js';

const OPTIONS = ['unified', 'lightning', 'onchain'] as const;
type QrOption = typeof OPTIONS[number];

const SELECTORS = ['dots', 'toggle'] as const;
type SelectorType = typeof SELECTORS[number];

const DOT_TYPES = ['rounded', 'square', 'dots', 'classy', 'classy-rounded', 'extra-rounded'] as const;
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

  private qrCodeInstance: QRCodeStyling.default | null = null;
  private qrContainer: HTMLElement | null = null;

  private validationRules = [
    createStringLiteralValidationRule(OPTIONS, 'option'),
    createStringLiteralValidationRule(SELECTORS, 'selector'),
    createStringLiteralValidationRule(DOT_TYPES, 'dotType'),
  ];

  static styles = [
    css`
      :host { display: block; }
      .container { display: flex; flex-direction: column; align-items: center; gap: var(--size-4); border-radius: 10px; }
      .helper-text { color: var(--text-secondary); font-size: 16px; text-align: center; }
      .frame { background: var(--white); border: 1px solid var(--system-divider); border-radius: 10px; padding: 28px; display: flex; align-items: center; justify-content: center; }
      .qr { width: var(--qr-size); height: var(--qr-size); display: flex; align-items: center; justify-content: center; }
      .options { display: flex; flex-direction: column; align-items: center; gap: var(--size-3); padding: var(--size-3) 0; }
      .dots-row { display: flex; gap: var(--size-4); align-items: center; }
      .selector-row { display: flex; gap: var(--size-4); align-items: center; }
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
    this.dotType = 'dots';
    this.dotColor = '#000000';
    this.unifiedImage = '';
    this.lightningImage = '';
    this.onchainImage = '';
    this.copyOnTap = true;
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    validateProperties(this, changed, this.validationRules);
  }

  protected async updated(changed: PropertyValues<this>): Promise<void> {
    if (changed.has('address') || changed.has('lightning') || changed.has('option') || changed.has('size') || changed.has('showImage') || changed.has('dotType') || changed.has('dotColor') || changed.has('unifiedImage') || changed.has('lightningImage') || changed.has('onchainImage')) {
      await this.updateQRCode();
    }
  }

  protected firstUpdated(): void {
    this.qrContainer = this.shadowRoot?.querySelector('.qr-container') as HTMLElement;
    this.updateQRCode();
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

  private createQRCode(): QRCodeStyling.default {
    const qrData = this.getQrData();
    const iconDataUrl = this.getIconDataUrl();
    
    return new QRCodeStyling.default({
      width: this.size,
      height: this.size,
      data: qrData,
      type: 'svg',
      image: iconDataUrl,
      margin: 0, // Remove all margin/padding
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.3, 
        margin: 8
      },
      dotsOptions: {
        color: this.dotColor,
        type: this.dotType as any
      },
      backgroundOptions: {
        color: '#ffffff'
      },
      cornersSquareOptions: {
        color: this.dotColor,
        type: 'extra-rounded'
      },
      cornersDotOptions: {
        color: this.dotColor,
        type: 'dot'
      }
    });
  }

  private async updateQRCode(): Promise<void> {
    if (!this.qrContainer) return;
    
    // Clear existing QR code
    this.qrContainer.innerHTML = '';
    
    const qrData = this.getQrData();
    if (!qrData) {
      this.qrContainer.innerHTML = '<div class="helper-text">Failed to render QR code 😭</div>';
      return;
    }

    try {
      this.qrCodeInstance = this.createQRCode();
      this.qrCodeInstance.append(this.qrContainer);
      
      // Add click handler for copy functionality
      if (this.copyOnTap) {
        this.qrContainer.style.cursor = 'pointer';
        this.qrContainer.addEventListener('click', this.handleQrClick.bind(this));
      }
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      this.qrContainer.innerHTML = '<div class="helper-text">Failed to render QR code 😭</div>';
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
    const title = this.copyOnTap ? 'Click to copy QR code data' : '';
    return html`
      <div class="frame">
        <div class="qr qr-container" style="${qrInlineStyle}" title="${title}">
          <!-- QR code will be rendered here by qr-code-styling -->
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="helper-text">${this.helperText}</div>
        ${this.renderQr()}
        ${this.shouldShowSelector ? html`<div class="options">${this.renderSelector()}</div>` : null}
      </div>
    `;
  }
}

if (!customElements.get('bui-bitcoin-qr-display')) {
  customElements.define('bui-bitcoin-qr-display', BuiBitcoinQrDisplay);
}


