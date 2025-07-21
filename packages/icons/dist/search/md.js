import { LitElement, html, css } from 'lit';

export class BuiIconSearchMd extends LitElement {
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
    <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="m14.25 14.25-2.648-2.648m1.211-4.32a5.532 5.532 0 1 1-11.063 0 5.532 5.532 0 0 1 11.063 0Z"/>
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

customElements.define('bui-search-md', BuiIconSearchMd);

export default BuiIconSearchMd;
