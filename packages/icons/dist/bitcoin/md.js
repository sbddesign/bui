import { LitElement, html, css } from 'lit';

export class BuiIconBitcoinMd extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      line-height: 0;
    }
    
    svg {
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        
  <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="m4.97 11.274 1.867-7.682M4 11.027s2.174.554 4.203 1.074c4.152 1.062 4.51-3.218 1-4.116 3.203.82 3.873-2.797.866-3.566L5.751 3.314m.447 3.903 2.942.753M9 4.146 9.4 2.5m-2.563 11 .4-1.647"/>


      </svg>
    `;
  }
}

customElements.define('bui-bitcoin-md', BuiIconBitcoinMd);

export default BuiIconBitcoinMd;
