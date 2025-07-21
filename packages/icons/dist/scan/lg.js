import { LitElement, html, css } from 'lit';

export class BuiIconScanLg extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M21 16.154V21h-4.846m-8.308 0H3v-4.846M16.154 3h4.84v4.846M7.846 3H3v4.846"/>


      </svg>
    `;
  }
}

customElements.define('bui-scan-lg', BuiIconScanLg);

export default BuiIconScanLg;
