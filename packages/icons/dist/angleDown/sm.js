import { LitElement, html, css } from 'lit';

export class BuiIconAngleDownSm extends LitElement {
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
        
  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1.75 3.85 6 8.1l4.25-4.25"/>


      </svg>
    `;
  }
}

customElements.define('bui-angle-down-sm', BuiIconAngleDownSm);

export default BuiIconAngleDownSm;
