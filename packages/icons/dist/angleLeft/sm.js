import { LitElement, html, css } from 'lit';

export class BuiIconAngleLeftSm extends LitElement {
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
        
  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8.15 10.25 3.9 6l4.25-4.25"/>


      </svg>
    `;
  }
}

customElements.define('bui-angle-left-sm', BuiIconAngleLeftSm);

export default BuiIconAngleLeftSm;
