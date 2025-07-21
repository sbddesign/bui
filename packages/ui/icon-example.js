import { LitElement, html, css } from 'lit';
import '@bui/icons/arrowLeft/lg.js';
import '@bui/icons/arrowRight/lg.js';
import '@bui/icons/search/lg.js';
import '@bui/icons/checkCircle/lg.js';

export class BuiIconExample extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .icon-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: white;
    }
    
    .icon-item:hover {
      background: #f9fafb;
    }
    
    .icon-name {
      font-size: 0.875rem;
      color: #6b7280;
      font-family: monospace;
    }
    
    .color-examples {
      margin-top: 2rem;
    }
    
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .color-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      border-radius: 6px;
      color: white;
    }
    
    .blue { background: #3b82f6; }
    .green { background: #10b981; }
    .red { background: #ef4444; }
    .purple { background: #8b5cf6; }
    .orange { background: #f59e0b; }
  `;

  render() {
    return html`
      <h2>Icon Web Components</h2>
      <p>These icons are web components that can be styled with CSS and inherit colors from their parent elements.</p>
      
      <h3>Available Icons</h3>
      <div class="icon-grid">
        <div class="icon-item">
          <bui-arrow-left-lg style="width: 24px; height: 24px;"></bui-arrow-left-lg>
          <span class="icon-name">bui-arrow-left-lg</span>
        </div>
        
        <div class="icon-item">
          <bui-arrow-right-lg style="width: 24px; height: 24px;"></bui-arrow-right-lg>
          <span class="icon-name">bui-arrow-right-lg</span>
        </div>
        
        <div class="icon-item">
          <bui-search-lg style="width: 24px; height: 24px;"></bui-search-lg>
          <span class="icon-name">bui-search-lg</span>
        </div>
        
        <div class="icon-item">
          <bui-check-circle-lg style="width: 24px; height: 24px;"></bui-check-circle-lg>
          <span class="icon-name">bui-check-circle-lg</span>
        </div>
      </div>
      
      <div class="color-examples">
        <h3>Color Inheritance Examples</h3>
        <p>Icons inherit the <code>currentColor</code> from their parent elements:</p>
        
        <div class="color-grid">
          <div class="color-item blue">
            <bui-arrow-left-lg style="width: 20px; height: 20px;"></bui-arrow-left-lg>
            <span>Blue</span>
          </div>
          
          <div class="color-item green">
            <bui-check-circle-lg style="width: 20px; height: 20px;"></bui-check-circle-lg>
            <span>Green</span>
          </div>
          
          <div class="color-item red">
            <bui-search-lg style="width: 20px; height: 20px;"></bui-search-lg>
            <span>Red</span>
          </div>
          
          <div class="color-item purple">
            <bui-arrow-right-lg style="width: 20px; height: 20px;"></bui-arrow-right-lg>
            <span>Purple</span>
          </div>
          
          <div class="color-item orange">
            <bui-check-circle-lg style="width: 20px; height: 20px;"></bui-check-circle-lg>
            <span>Orange</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('bui-icon-example', BuiIconExample); 