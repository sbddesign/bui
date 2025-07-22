import { LitElement, html, css } from 'lit';

export class BuiIconArrowDownLg extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21.25V2.75m0 18.5-7-7m7 7 7-7"/>


      </svg>
    `;
  }
}

customElements.define('bui-arrow-down-lg', BuiIconArrowDownLg);

export default BuiIconArrowDownLg;
