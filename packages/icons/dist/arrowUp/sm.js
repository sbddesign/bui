import { LitElement, html, css } from 'lit';

export class BuiIconArrowUpSm extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M6 1.75v8.5m0-8.5-3.5 3.5M6 1.75l3.5 3.5"/>


      </svg>
    `;
  }
}

customElements.define('bui-arrow-up-sm', BuiIconArrowUpSm);

export default BuiIconArrowUpSm;
