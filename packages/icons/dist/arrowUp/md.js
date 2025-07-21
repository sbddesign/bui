import { LitElement, html, css } from 'lit';

export class BuiIconArrowUpMd extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M8 1.75v12.5m0-12.5L4.667 5.083M8 1.75l3.333 3.333"/>


      </svg>
    `;
  }
}

customElements.define('bui-arrow-up-md', BuiIconArrowUpMd);

export default BuiIconArrowUpMd;
