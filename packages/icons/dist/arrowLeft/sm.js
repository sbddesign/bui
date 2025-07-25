import { LitElement, html, css } from 'lit';

export class BuiIconArrowLeftSm extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1.75 6h8.5m-8.5 0 3.5-3.5M1.75 6l3.5 3.5"/>


      </svg>
    `;
  }
}

customElements.define('bui-arrow-left-sm', BuiIconArrowLeftSm);

export default BuiIconArrowLeftSm;
