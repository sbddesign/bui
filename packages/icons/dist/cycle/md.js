import { LitElement, html, css } from 'lit';

export class BuiIconCycleMd extends LitElement {
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
        
  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M2.5 5.5 8 2l5.5 3.5m-11 5L8 14l5.5-3.5"/>


      </svg>
    `;
  }
}

customElements.define('bui-cycle-md', BuiIconCycleMd);

export default BuiIconCycleMd;
