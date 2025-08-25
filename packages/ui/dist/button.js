import { LitElement, html, css } from 'lit';
export class BuiButton extends LitElement {
    constructor() {
        super();
        this.content = 'label';
        this.styleType = 'filled';
        this.size = 'default';
        this.disabled = false;
        this.label = 'Label';
        this.wide = false;
    }
    /**
     * Validates property values when they change
     */
    willUpdate(changedProperties) {
        // Validate content property
        if (changedProperties.has('content') && this.content) {
            const validContents = ['label', 'icon', 'label+icon', 'icon+label'];
            if (!validContents.includes(this.content)) {
                console.warn(`Invalid content value: ${this.content}. Valid values are: ${validContents.join(', ')}`);
            }
        }
        // Validate styleType property
        if (changedProperties.has('styleType') && this.styleType) {
            const validStyleTypes = ['filled', 'outline', 'free'];
            if (!validStyleTypes.includes(this.styleType)) {
                console.warn(`Invalid styleType value: ${this.styleType}. Valid values are: ${validStyleTypes.join(', ')}`);
            }
        }
        // Validate size property
        if (changedProperties.has('size') && this.size) {
            const validSizes = ['default', 'small', 'large'];
            if (!validSizes.includes(this.size)) {
                console.warn(`Invalid size value: ${this.size}. Valid values are: ${validSizes.join(', ')}`);
            }
        }
    }
    render() {
        const classes = [this.size, this.styleType].join(' ');
        const isIconOnly = this.content === 'icon';
        const iconOnlyClass = isIconOnly ? 'icon-only' : '';
        const clusterClass = this.cluster ? `cluster-${this.cluster}` : '';
        const wideClass = this.wide ? 'wide' : '';
        const allClasses = [classes, iconOnlyClass, clusterClass, wideClass].filter(Boolean).join(' ');
        return html `
      <button class="${allClasses}" ?disabled="${this.disabled}">
        ${this.content === 'icon+label' ? html `<slot name="icon"></slot>` : ''}
        ${['label', 'label+icon', 'icon+label'].includes(this.content) ? html `<span>${this.label}</span>` : ''}
        ${this.content === 'label+icon' ? html `<slot name="icon"></slot>` : ''}
        ${this.content === 'icon' ? html `<slot name="icon"></slot>` : ''}
      </button>
    `;
    }
}
// Property declarations with types
BuiButton.properties = {
    content: { type: String }, // 'label', 'icon', 'label+icon', etc.
    styleType: { type: String, attribute: 'style-type' }, // 'filled', 'outline', 'free'
    size: { type: String }, // 'default', 'small', 'large'
    disabled: { type: Boolean, reflect: true },
    label: { type: String },
    cluster: { type: String }, // 'top', 'bottom', 'left', 'right', 'middle'
    wide: { type: Boolean, reflect: true }, // expands to fill available space
};
BuiButton.styles = [
    css `
      :host {
        display: inline-block;
      }
      button {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        border-radius: var(--button-rounding);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5em;
        font-weight: 500;
        transition: background 0.2s, color 0.2s, border 0.2s;
        color: var(--text-primary);
        position: relative;
      }
      /* Size variants */
      button.default { font-size: 1rem; padding: 0.5em 1.25em; }
      button.small { font-size: 0.85rem; padding: 0.25em 0.75em; }
      button.large { font-size: 1.15rem; padding: 0.75em 1.5em; }
      
      /* Square appearance for icon-only buttons */
      button.icon-only.default { 
        padding: 0.5em; 
        min-height: calc(2.45em + 0.5px); /* Split the difference - account for 1px border on top and bottom */
        line-height: 1.5; /* Match line-height of text buttons */
      }
      button.icon-only.small { 
        padding: 0.25em; 
        min-height: calc(2em + 0.5px); /* Split the difference - account for 1px border on top and bottom */
        line-height: 1.5;
      }
      button.icon-only.large { 
        padding: 0.75em; 
        min-height: calc(2.9em + 0.5px); /* Split the difference - account for 1px border on top and bottom */
        line-height: 1.5;
      }
      
      /* Filled button styles */
      button.filled {
        background: var(--button-filled-bg);
        color: var(--button-filled-text);
        border: 2px solid var(--button-filled-outline);
      }
      button.filled:hover {
        background: var(--button-filled-hover-bg);
        border-color: var(--button-filled-hover-outline);
      }
      button.filled:active {
        background: var(--button-filled-active-bg);
        border-color: var(--button-filled-active-outline);
      }
      button.filled:disabled {
        background: var(--button-filled-disabled-bg);
        border-color: var(--button-filled-disabled-outline);
        color: var(--button-filled-disabled-text);
        cursor: not-allowed;
      }
      
      /* Outline button styles */
      button.outline {
        background: var(--button-outline-bg);
        color: var(--button-outline-text);
        border: 2px solid var(--button-outline-outline);
      }
      button.outline:hover {
        background: var(--button-outline-hover-bg);
        border-color: var(--button-outline-hover-outline);
        color: var(--button-outline-hover-text);
      }
      button.outline:active {
        background: var(--button-outline-active-bg);
        border-color: var(--button-outline-active-outline);
        color: var(--button-outline-active-text);
      }
      button.outline:disabled {
        border-color: var(--button-outline-disabled-outline);
        color: var(--button-outline-disabled-text);
        cursor: not-allowed;
      }
      
      /* Free button styles */
      button.free {
        background: var(--button-free-bg);
        color: var(--button-free-text);
        border: 2px solid var(--button-free-outline);
      }
      button.free:hover {
        background: var(--button-free-hover-bg);
      }
      button.free:active {
        background: var(--button-free-active-bg);
      }
      button.free:disabled {
        color: var(--button-free-disabled-text);
        cursor: not-allowed;
      }
      
      /* Disabled state for all buttons */
      button:disabled {
        opacity: 1; /* Remove opacity override since we're using specific disabled colors */
      }
      
      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Slot styles for icon content */
      ::slotted([slot="icon"]) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Ensure icons have consistent sizing */
      ::slotted([slot="icon"]) {
        width: 1em;
        height: 1em;
      }
      
      /* Cluster-specific border radius overrides */
      button.cluster-top {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        border-bottom: 0 !important;
      }
      
      button.cluster-bottom {
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
      }
      
      button.cluster-left {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        border-right: 0 !important;
      }
      
      button.cluster-right {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
      }
      
      button.cluster-middle-horizontal {
        border-radius: 0 !important;
        border-right: 0 !important;
      }
      
      button.cluster-middle-vertical {
        border-radius: 0 !important;
        border-bottom: 0 !important;
      }
      
      /* Wide button styles */
      :host([wide]) {
        display: block;
        width: 100%;
      }
      
      button.wide {
        width: 100%;
        justify-content: center;
      }
    `
];
customElements.define('bui-button', BuiButton);
