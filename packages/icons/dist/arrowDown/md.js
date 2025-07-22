import { LitElement, html, css } from 'lit';

export class BuiIconArrowDownMd extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14.25V1.75m0 12.5-3.333-3.333M8 14.25l3.333-3.333"/>


      </svg>
    `;
  }
}

customElements.define('bui-arrow-down-md', BuiIconArrowDownMd);

export default BuiIconArrowDownMd;
