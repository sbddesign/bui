import { LitElement, html, css } from 'lit';

export class BuiIconArrowRightLg extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.25 12H2.75m18.5 0-7-7m7 7-7 7"/>


      </svg>
    `;
  }
}

customElements.define('bui-arrow-right-lg', BuiIconArrowRightLg);

export default BuiIconArrowRightLg;
