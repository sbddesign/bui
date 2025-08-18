import { LitElement, html, css } from 'lit';
import './option-dot.js';
import './button.js';
import '../icons/dist/cycle/md.js';

const OPTION_LABELS = {
  unified: 'Bitcoin QR',
  onchain: 'On-chain',
  lightning: 'Lightning',
};

export class BuiBitcoinQrDisplay extends LitElement {
  static properties = {
    address: { type: String },
    lightning: { type: String },
    option: { type: String, reflect: true }, // 'unified' | 'onchain' | 'lightning'
    selector: { type: String, reflect: true }, // 'dots' | 'toggle'
    size: { type: Number }, // QR inner size in px (square)
  };

  static styles = [
    css`
      :host {
        display: block;
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--size-4);
        border-radius: 10px;
      }

      .helper-text {
        color: var(--text-secondary);
        font-size: 16px;
        text-align: center;
      }

      .frame {
        background: var(--white);
        border: 1px solid var(--system-divider);
        border-radius: 10px;
        padding: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .qr {
        width: var(--qr-size);
        height: var(--qr-size);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .options {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--size-3);
        padding: var(--size-3) 0;
      }

      .dots-row {
        display: flex;
        gap: var(--size-4);
        align-items: center;
      }

      .selector-row {
        display: flex;
        gap: var(--size-4);
        align-items: center;
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
  }

  get unifiedString() {
    if (!this.address || !this.lightning) return '';
    return `bitcoin:${this.address}?lightning=${this.lightning}`;
  }

  cycleOption() {
    const order = ['unified', 'onchain', 'lightning'];
    const idx = order.indexOf(this.option);
    const next = order[(idx + 1) % order.length];
    this.option = next;
  }

  setOption(newOption) {
    this.option = newOption;
  }

  renderDotsSelector() {
    const unifiedActive = this.option === 'unified';
    const onchainActive = this.option === 'onchain';
    const lightningActive = this.option === 'lightning';

    return html`
      <div class="dots-row">
        <bui-option-dot
          .active=${unifiedActive}
          @click=${() => this.setOption('unified')}
          title="${OPTION_LABELS.unified}"
        ></bui-option-dot>
        <bui-option-dot
          .active=${onchainActive}
          @click=${() => this.setOption('onchain')}
          title="${OPTION_LABELS.onchain}"
        ></bui-option-dot>
        <bui-option-dot
          .active=${lightningActive}
          @click=${() => this.setOption('lightning')}
          title="${OPTION_LABELS.lightning}"
        ></bui-option-dot>
      </div>
    `;
  }

  renderToggleSelector() {
    return html`
      <div class="selector-row">
        <bui-button
          style-type="free"
          size="small"
          content="icon"
          aria-label="Cycle QR format"
          @click=${() => this.cycleOption()}
        >
          <bui-cycle-md slot="icon"></bui-cycle-md>
        </bui-button>
        <div class="helper-text" aria-live="polite">${OPTION_LABELS[this.option]}</div>
      </div>
    `;
  }

  renderSelector() {
    if (this.selector === 'toggle') return this.renderToggleSelector();
    return html`
      ${this.renderDotsSelector()}
      <div class="helper-text">${OPTION_LABELS[this.option]}</div>
    `;
  }

  renderQr() {
    const styleVars = `--qr-size: ${this.size}px;`;

    // Render according to option
    return html`
      <div class="frame" style="${styleVars}">
        <div class="qr">
          ${this.option === 'unified' && this.address && this.lightning
            ? html`<bitcoin-qr width="${this.size}" height="${this.size}" bitcoin="${this.address}" lightning="${this.lightning}" type="svg"></bitcoin-qr>`
            : this.option === 'onchain' && this.address
            ? html`<bitcoin-qr width="${this.size}" height="${this.size}" bitcoin="${this.address}" type="svg"></bitcoin-qr>`
            : this.option === 'lightning' && this.lightning
            ? html`<bitcoin-qr width="${this.size}" height="${this.size}" lightning="${this.lightning}" type="svg"></bitcoin-qr>`
            : html`<div class="helper-text">No data provided</div>`}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="helper-text">Scan with any Bitcoin on-chain or Lightning wallet</div>
        ${this.renderQr()}
        <div class="options">
          ${this.renderSelector()}
        </div>
      </div>
    `;
  }
}

customElements.define('bui-bitcoin-qr-display', BuiBitcoinQrDisplay);
