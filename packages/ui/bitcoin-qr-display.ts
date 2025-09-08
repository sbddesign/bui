import { LitElement, html, css } from 'lit';
import type { PropertyValues } from 'lit';
import './option-dot.js';
import './button.js';
import '@bui/icons/cycle/lg';
import '@bui/icons/cycle/md';
import 'bitcoin-qr/dist/bitcoin-qr/index.esm.js';

import { validateProperties, createStringLiteralValidationRule } from './utils/validation.js';

const OPTIONS = ['unified', 'onchain', 'lightning'] as const;
type QrOption = typeof OPTIONS[number];

const SELECTORS = ['dots', 'toggle'] as const;
type SelectorType = typeof SELECTORS[number];

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
  };

  declare address: string;
  declare lightning: string;
  declare option: QrOption;
  declare selector: SelectorType;
  declare size: number;

  private validationRules = [
    createStringLiteralValidationRule(OPTIONS, 'option'),
    createStringLiteralValidationRule(SELECTORS, 'selector'),
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
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    validateProperties(this, changed, this.validationRules);
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

  private cycleOption(): void {
    if (!this.shouldShowSelector) return;
    const order: QrOption[] = ['unified', 'onchain', 'lightning'];
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
    const onchainActive = this.option === 'onchain';
    const lightningActive = this.option === 'lightning';
    return html`
      <div class="dots-row">
        <bui-option-dot .active=${unifiedActive} @click=${() => this.setOption('unified')} title="${OPTION_LABELS.unified}"></bui-option-dot>
        <bui-option-dot .active=${onchainActive} @click=${() => this.setOption('onchain')} title="${OPTION_LABELS.onchain}"></bui-option-dot>
        <bui-option-dot .active=${lightningActive} @click=${() => this.setOption('lightning')} title="${OPTION_LABELS.lightning}"></bui-option-dot>
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
    const effectiveOption = this.effectiveOption;
    return html`
      <div class="frame">
        <div class="qr" style="${qrInlineStyle}">
          ${effectiveOption === 'unified' && this.address && this.lightning
            ? html`<bitcoin-qr width="${this.size}" height="${this.size}" bitcoin="${this.address}" lightning="${this.lightning}" click-behavior="none" type="svg"></bitcoin-qr>`
            : effectiveOption === 'onchain' && this.address
            ? html`<bitcoin-qr width="${this.size}" height="${this.size}" bitcoin="${this.address}" click-behavior="none" type="svg"></bitcoin-qr>`
            : effectiveOption === 'lightning' && this.lightning
            ? html`<bitcoin-qr width="${this.size}" height="${this.size}" lightning="${this.lightning}" click-behavior="none" type="svg"></bitcoin-qr>`
            : html`<div class="helper-text">Failed to render QR code 😭</div>`}
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


