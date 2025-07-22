import { LitElement, html, css } from 'lit';

export class BuiIconCrossCircleMd extends LitElement {
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
        
  <g clip-path="url(#a)">
    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m6 10 4-4M6 6l4 4m4.25-2a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>


      </svg>
    `;
  }
}

customElements.define('bui-cross-circle-md', BuiIconCrossCircleMd);

export default BuiIconCrossCircleMd;
