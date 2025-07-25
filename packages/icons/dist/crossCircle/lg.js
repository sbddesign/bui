import { LitElement, html, css } from 'lit';

export class BuiIconCrossCircleLg extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m9 15 6-6M9 9l6 6m6.25-3a9.25 9.25 0 1 1-18.5 0 9.25 9.25 0 0 1 18.5 0Z"/>


      </svg>
    `;
  }
}

customElements.define('bui-cross-circle-lg', BuiIconCrossCircleLg);

export default BuiIconCrossCircleLg;
