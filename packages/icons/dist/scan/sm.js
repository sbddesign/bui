import { LitElement, html, css } from 'lit';

export class BuiIconScanSm extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M10 7.846V10H7.846m-3.692 0H2V7.846M7.846 2h2.152v2.154M4.154 2H2v2.154"/>


      </svg>
    `;
  }
}

customElements.define('bui-scan-sm', BuiIconScanSm);

export default BuiIconScanSm;
