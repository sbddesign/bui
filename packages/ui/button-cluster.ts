import { LitElement, html, css, PropertyValues } from 'lit';
import { validateProperties, createStringLiteralValidationRule } from './utils/validation.js';

const DIRECTIONS = ['horizontal', 'vertical'] as const;
type Direction = typeof DIRECTIONS[number];

export class BuiButtonCluster extends LitElement {
  static properties = {
    direction: { type: String }, // 'horizontal' | 'vertical'
  };

  declare direction: Direction;

  private validationRules = [
    createStringLiteralValidationRule(DIRECTIONS, 'direction'),
  ];

  static styles = [
    css`
      :host {
        display: inline-flex;
      }
      
      .cluster {
        display: flex;
        gap: 0;
      }
      
      .cluster.horizontal { flex-direction: row; }
      .cluster.vertical { flex-direction: column; }
    `
  ];

  constructor() {
    super();
    this.direction = 'horizontal';
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.updateClusterProps();
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    validateProperties(this, changed, this.validationRules);
  }

  protected updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.has('direction')) {
      this.updateClusterProps();
    }
  }

  private updateClusterProps = (): void => {
    setTimeout(() => {
      const buttons = this.querySelectorAll('bui-button');
      if (buttons.length === 0) return;

      buttons.forEach((button, index) => {
        if (buttons.length === 1) {
          button.removeAttribute('cluster');
        } else if (this.direction === 'horizontal') {
          if (index === 0) {
            button.setAttribute('cluster', 'left');
          } else if (index === buttons.length - 1) {
            button.setAttribute('cluster', 'right');
          } else {
            button.setAttribute('cluster', 'middle-horizontal');
          }
        } else if (this.direction === 'vertical') {
          if (index === 0) {
            button.setAttribute('cluster', 'top');
          } else if (index === buttons.length - 1) {
            button.setAttribute('cluster', 'bottom');
          } else {
            button.setAttribute('cluster', 'middle-vertical');
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

if (!customElements.get('bui-button-cluster')) {
  customElements.define('bui-button-cluster', BuiButtonCluster);
}


