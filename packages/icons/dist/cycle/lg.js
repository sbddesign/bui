import { LitElement, html, css } from 'lit';

export class BuiIconCycleLg extends LitElement {
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
        
  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M7 8.5 12.5 3 18 8.5m-11 7 5.5 5.5 5.5-5.5"/>


      </svg>
    `;
  }
}

customElements.define('bui-cycle-lg', BuiIconCycleLg);

export default BuiIconCycleLg;
