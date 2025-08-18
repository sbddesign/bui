import { LitElement, html, css } from 'lit';

export class BuiIconAngleDownMd extends LitElement {
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
        
  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="m2 5 6 6 6-6"/>


      </svg>
    `;
  }
}

customElements.define('bui-angle-down-md', BuiIconAngleDownMd);

export default BuiIconAngleDownMd;
