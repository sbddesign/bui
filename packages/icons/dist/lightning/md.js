import { LitElement, html, css } from 'lit';

export class BuiIconLightningMd extends LitElement {
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
        
  <path d="m1.75 9 3.6-8h6.66l-1.98 4.4h4.32L3.91 15l1.546-6H1.75Z"/>


      </svg>
    `;
  }
}

customElements.define('bui-lightning-md', BuiIconLightningMd);

export default BuiIconLightningMd;
