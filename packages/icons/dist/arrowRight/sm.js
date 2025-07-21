import { LitElement, html, css } from 'lit';

export class BuiIconArrowRightSm extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M10.25 6h-8.5m8.5 0-3.5-3.5m3.5 3.5-3.5 3.5"/>


      </svg>
    `;
  }
}

customElements.define('bui-arrow-right-sm', BuiIconArrowRightSm);

export default BuiIconArrowRightSm;
