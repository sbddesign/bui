import { LitElement, html, css } from 'lit';

export class BuiIconWarningLg extends LitElement {
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
        
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10.246v3.61m-8.957 3.25c-.833 1.445.21 3.25 1.876 3.25h14.163c1.665 0 2.708-1.805 1.875-3.25l-7.08-12.273c-.834-1.444-2.92-1.444-3.753 0l-7.08 12.274Zm8.957-.36h.007v.008H12v-.008Z"/>


      </svg>
    `;
  }
}

customElements.define('bui-warning-lg', BuiIconWarningLg);

export default BuiIconWarningLg;
