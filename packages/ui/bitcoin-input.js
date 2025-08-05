import { LitElement, html, css } from 'lit';
import { BuiInput } from './input.js';
import init, { PaymentParams, initSync } from '@mutinywallet/waila-wasm';

export class BuiBitcoinInput extends LitElement {
  static properties = {
    value: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    label: { type: String, reflect: true },
    size: { type: String, reflect: true },
    showLabel: { type: Boolean, reflect: true, attribute: 'show-label' },
    showIconLeft: { type: Boolean, reflect: true, attribute: 'show-icon-left' },
    showIconRight: { type: Boolean, reflect: true, attribute: 'show-icon-right' },
    iconRightAction: { type: String, attribute: 'icon-right-action' },
    
    // Bitcoin-specific properties
    enableNodePubkey: { type: Boolean, reflect: true, attribute: 'enable-node-pubkey' },
    enableRgbInvoice: { type: Boolean, reflect: true, attribute: 'enable-rgb-invoice' },
    enableNostrPubkey: { type: Boolean, reflect: true, attribute: 'enable-nostr-pubkey' },
    unrecognizedMessage: { type: String, attribute: 'unrecognized-message' },
    unsupportedMessage: { type: String, attribute: 'unsupported-message' },
    
    // Internal state
    _currentMood: { type: String, state: true },
    _currentMessage: { type: String, state: true },
    _isWasmReady: { type: Boolean, state: true }
  };

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
      }
      
      bui-input {
        width: 100%;
      }
    `
  ];

  constructor() {
    super();
    this._value = '';
    this.placeholder = 'Enter bitcoin address, invoice, or payment info...';
    this.label = 'Bitcoin Payment';
    this.size = 'large';
    this.showLabel = true;
    this.showIconLeft = false;
    this.showIconRight = false;
    this.iconRightAction = '';
    
    // Bitcoin-specific defaults
    this.enableNodePubkey = false;
    this.enableRgbInvoice = false;
    this.enableNostrPubkey = false;
    this.unrecognizedMessage = 'Format not recognized. Please enter a valid bitcoin address, invoice, or payment info.';
    this.unsupportedMessage = 'This format is recognized but not currently supported.';
    
    // Internal state
    this._currentMood = 'neutral';
    this._currentMessage = '';
    this._isWasmReady = false;
    
    // Initialize WASM
    this._initializeWasm();
  }

  // Override the property setter to ensure proper updates
  set value(val) {
    const oldValue = this._value;
    this._value = val;
    console.log('Value setter called:', val); // Debug log
    this.requestUpdate('value', oldValue);
  }

  get value() {
    return this._value || '';
  }

  async _initializeWasm() {
    try {
      // Try default initialization first
      await init();
      this._isWasmReady = true;
      console.log('Bitcoin WASM initialized successfully');
      
      // Re-validate current value if any
      if (this.value && this.value.trim()) {
        this._validateInput(this.value);
      }
    } catch (error) {
      console.error('Failed to initialize bitcoin-waila WASM:', error);
      
      // Try alternative initialization approaches
      try {
        console.log('Trying fallback WASM initialization...');
        
        // Try to fetch WASM from various possible paths
        const possiblePaths = [
          '/waila_wasm_bg.wasm',  // From public directory
          './waila_wasm_bg.wasm',  // Relative to current
          '/@mutinywallet/waila-wasm/waila_wasm_bg.wasm',
          '/node_modules/@mutinywallet/waila-wasm/waila_wasm_bg.wasm',
          '../node_modules/@mutinywallet/waila-wasm/waila_wasm_bg.wasm'
        ];
        
        let wasmLoaded = false;
        for (const path of possiblePaths) {
          try {
            console.log(`Trying to fetch WASM from: ${path}`);
            const response = await fetch(path);
            if (response.ok) {
              const wasmBytes = await response.arrayBuffer();
              initSync(wasmBytes);
              this._isWasmReady = true;
              wasmLoaded = true;
              console.log(`Successfully loaded WASM from: ${path}`);
              break;
            }
          } catch (fetchError) {
            console.warn(`Failed to fetch from ${path}:`, fetchError);
          }
        }
        
        if (!wasmLoaded) {
          throw new Error('All WASM loading attempts failed');
        }
        
        // Re-validate current value if any
        if (this.value && this.value.trim()) {
          this._validateInput(this.value);
        }
      } catch (fallbackError) {
        console.error('All WASM initialization attempts failed:', fallbackError);
        this._isWasmReady = false;
      }
    }
  }

  _validateInput(value) {
    if (!this._isWasmReady || !value.trim()) {
      this._currentMood = 'neutral';
      this._currentMessage = '';
      return;
    }

    try {
      const params = new PaymentParams(value.trim());
      
      // Check what type of payment this is and if it's supported
      const supportedTypes = this._getSupportedTypes();
      const detectedType = this._detectPaymentType(params);
      
      if (detectedType && supportedTypes.includes(detectedType)) {
        this._currentMood = 'success';
        this._currentMessage = `Valid ${detectedType} detected`;
      } else if (detectedType) {
        this._currentMood = 'caution';
        this._currentMessage = this.unsupportedMessage;
      } else {
        this._currentMood = 'danger';
        this._currentMessage = this.unrecognizedMessage;
      }
    } catch (error) {
      this._currentMood = 'danger';
      this._currentMessage = this.unrecognizedMessage;
    }
    
    this.requestUpdate();
  }

  _getSupportedTypes() {
    const defaultSupported = [
      'bitcoin-address',
      'bip21-uri', 
      'lightning-invoice',
      'lightning-offer',
      'bolt12-invoice',
      'bolt12-refund',
      'lnurl',
      'lightning-address'
    ];
    
    const optionalSupported = [];
    if (this.enableNodePubkey) optionalSupported.push('node-pubkey');
    if (this.enableRgbInvoice) optionalSupported.push('rgb-invoice');
    if (this.enableNostrPubkey) optionalSupported.push('nostr-pubkey');
    
    return [...defaultSupported, ...optionalSupported];
  }

  _detectPaymentType(params) {
    try {
      // Check different properties to determine type
      if (params.address && !params.invoice && !params.offer) {
        return 'bitcoin-address';
      }
      
      if (params.address && params.invoice) {
        return 'bip21-uri';
      }
      
      if (params.invoice && !params.address) {
        return 'lightning-invoice';
      }
      
      if (params.offer) {
        return 'lightning-offer';
      }
      
      if (params.lnurl) {
        // Could be LNURL or Lightning Address
        if (this.value.includes('@')) {
          return 'lightning-address';
        }
        return 'lnurl';
      }
      
      if (params.node_pubkey && this.enableNodePubkey) {
        return 'node-pubkey';
      }
      
      // Check for RGB invoice pattern
      if (this.enableRgbInvoice && this.value.startsWith('rgb:')) {
        return 'rgb-invoice';
      }
      
      // Check for Nostr pubkey (basic pattern check)
      if (this.enableNostrPubkey && this._isNostrPubkey(this.value)) {
        return 'nostr-pubkey';
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  _isNostrPubkey(value) {
    // Basic check for Nostr pubkey format (npub or hex)
    return value.startsWith('npub') || (value.length === 64 && /^[0-9a-fA-F]+$/.test(value));
  }

  _handleInput(e) {
    const newValue = e.detail.value;
    console.log('Input received:', newValue); // Debug log
    
    this.value = newValue;
    this._validateInput(this.value);
    
    console.log('Value after validation:', this.value); // Debug log
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('bitcoin-input', {
      detail: { 
        value: this.value,
        mood: this._currentMood,
        isValid: this._currentMood === 'success'
      },
      bubbles: true,
      composed: true
    }));
  }

  _handleIconRightClick(e) {
    this.dispatchEvent(new CustomEvent('icon-right-click', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <bui-input
        .value="${this.value}"
        .placeholder="${this.placeholder}"
        .label="${this.label}"
        .size="${this.size}"
        .mood="${this._currentMood}"
        .showLabel="${this.showLabel}"
        .showIconLeft="${this.showIconLeft}"
        .showIconRight="${this.showIconRight}"
        .iconRightAction="${this.iconRightAction}"
        @input="${this._handleInput}"
        @icon-right-click="${this._handleIconRightClick}"
      >
        <slot name="icon-left" slot="icon-left"></slot>
        <slot name="icon-right" slot="icon-right"></slot>
        <span slot="message">${this._currentMessage}</span>
      </bui-input>
    `;
  }
}

customElements.define('bui-bitcoin-input', BuiBitcoinInput);