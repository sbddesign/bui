import { LitElement, html, css } from 'lit';

export class BuiButtonCluster extends LitElement {
  static properties = {
    direction: { type: String }, // 'horizontal' or 'vertical'
  };

  static styles = [
    css`
      :host {
        display: inline-flex;
      }
      
      .cluster {
        display: flex;
        gap: 0;
      }
      
      .cluster.horizontal {
        flex-direction: row;
      }
      
      .cluster.vertical {
        flex-direction: column;
      }
      
      /* Remove borders between adjacent buttons */
      ::slotted(bui-button:not(:last-child)) {
        border-right: none !important;
      }
      
      .cluster.vertical ::slotted(bui-button:not(:last-child)) {
        border-bottom: none !important;
      }
    `
  ];

  constructor() {
    super();
    this.direction = 'horizontal';
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateClusterProps();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('direction')) {
      this.updateClusterProps();
    }
  }

  updateClusterProps() {
    // Wait for slot content to be available
    setTimeout(() => {
      const buttons = this.querySelectorAll('bui-button');
      if (buttons.length === 0) return;

      buttons.forEach((button, index) => {
        if (buttons.length === 1) {
          // Single button - no cluster prop needed
          button.removeAttribute('cluster');
        } else if (this.direction === 'horizontal') {
          if (index === 0) {
            button.setAttribute('cluster', 'left');
          } else if (index === buttons.length - 1) {
            button.setAttribute('cluster', 'right');
          } else {
            button.setAttribute('cluster', 'middle');
          }
        } else if (this.direction === 'vertical') {
          if (index === 0) {
            button.setAttribute('cluster', 'top');
          } else if (index === buttons.length - 1) {
            button.setAttribute('cluster', 'bottom');
          } else {
            button.setAttribute('cluster', 'middle');
          }
        }
      });
    }, 0);
  }

  render() {
    const clusterClass = `cluster ${this.direction}`;
    
    return html`
      <div class="${clusterClass}">
        <slot @slotchange="${this.updateClusterProps}"></slot>
      </div>
    `;
  }
}

customElements.define('bui-button-cluster', BuiButtonCluster); 