import { LitElement, html, css } from 'lit';

export class BuiIconLightningSm extends LitElement {
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
        
  <path d="M1.5 6.714 4.071 1H8.83L7.414 4.143H10.5L3.043 11l1.104-4.286H1.5Z"/>


      </svg>
    `;
  }
}

customElements.define('bui-lightning-sm', BuiIconLightningSm);

export default BuiIconLightningSm;
