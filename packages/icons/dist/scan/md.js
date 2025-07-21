import { LitElement, html, css } from 'lit';

export class BuiIconScanMd extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M14 10.77V14h-3.23m-5.54 0H2v-3.23M10.77 2h3.226v3.23M5.231 2H2v3.23"/>


      </svg>
    `;
  }
}

customElements.define('bui-scan-md', BuiIconScanMd);

export default BuiIconScanMd;
