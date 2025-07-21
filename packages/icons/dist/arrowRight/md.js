import { LitElement, html, css } from 'lit';

export class BuiIconArrowRightMd extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M14.25 8H1.75m12.5 0-3.333-3.333M14.25 8l-3.333 3.333"/>


      </svg>
    `;
  }
}

customElements.define('bui-arrow-right-md', BuiIconArrowRightMd);

export default BuiIconArrowRightMd;
