import { LitElement, html, css } from 'lit';

export class BuiIconLightningLg extends LitElement {
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
        
  <path d="M3 13.429 8.143 2h9.514L14.83 8.286H21L6.086 22l2.208-8.571H3Z"/>


      </svg>
    `;
  }
}

customElements.define('bui-lightning-lg', BuiIconLightningLg);

export default BuiIconLightningLg;
