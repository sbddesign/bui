import { LitElement, html, css } from 'lit';

export class BuiIconCheckCircleLg extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 9-7 7-3-3m14.25-1a9.25 9.25 0 1 1-18.5 0 9.25 9.25 0 0 1 18.5 0Z"/>


      </svg>
    `;
  }
}

customElements.define('bui-check-circle-lg', BuiIconCheckCircleLg);

export default BuiIconCheckCircleLg;
