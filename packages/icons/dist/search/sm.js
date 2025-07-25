import { LitElement, html, css } from 'lit';

export class BuiIconSearchSm extends LitElement {
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
    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m10.25 10.25-1.8-1.8m.823-2.939a3.761 3.761 0 1 1-7.523 0 3.761 3.761 0 0 1 7.523 0Z"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h12v12H0z"/>
    </clipPath>
  </defs>


      </svg>
    `;
  }
}

customElements.define('bui-search-sm', BuiIconSearchSm);

export default BuiIconSearchSm;
