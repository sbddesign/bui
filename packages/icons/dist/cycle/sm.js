import { LitElement, html, css } from 'lit';

export class BuiIconCycleSm extends LitElement {
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
        
  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M2.5 4.5 6 2l3.5 2.5m-7 3L6 10l3.5-2.5"/>


      </svg>
    `;
  }
}

customElements.define('bui-cycle-sm', BuiIconCycleSm);

export default BuiIconCycleSm;
