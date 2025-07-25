import { LitElement, html, css } from 'lit';

export class BuiIconArrowUpLg extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m0-18L5 9.865M12 3l7 6.865"/>


      </svg>
    `;
  }
}

customElements.define('bui-arrow-up-lg', BuiIconArrowUpLg);

export default BuiIconArrowUpLg;
