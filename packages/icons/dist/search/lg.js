import { LitElement, html, css } from 'lit';

export class BuiIconSearchLg extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="m21.25 21.25-4-4m2.214-6.143a8.357 8.357 0 1 1-16.714 0 8.357 8.357 0 0 1 16.714 0Z"/>


      </svg>
    `;
  }
}

customElements.define('bui-search-lg', BuiIconSearchLg);

export default BuiIconSearchLg;
