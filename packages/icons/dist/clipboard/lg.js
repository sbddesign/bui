import { LitElement, html, css } from 'lit';

export class BuiIconClipboardLg extends LitElement {
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
        
  <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M15.5 5H18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.5M9 7h6a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3 1 1 0 0 0 1 1Z"/>


      </svg>
    `;
  }
}

customElements.define('bui-clipboard-lg', BuiIconClipboardLg);

export default BuiIconClipboardLg;
