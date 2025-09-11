import { LitElement, html, css, type PropertyValues } from 'lit';
import { validateProperties, createStringLiteralValidationRule } from './utils/validation.js';

// Single source of truth: define the values once, derive everything else
const AVATAR_SIZES = ['small', 'medium', 'large'] as const;

// Type definitions automatically derived from the const arrays
type AvatarSize = typeof AVATAR_SIZES[number];

export class BuiAvatar extends LitElement {
  // Property declarations with types
  static properties = {
    imageUrl: { type: String, attribute: 'image-url' },
    text: { type: String },
    showInitial: { 
      type: Boolean, 
      attribute: 'show-initial',
      converter: {
        fromAttribute: (value: string | null) => value !== null,
        toAttribute: (value: boolean) => value ? '' : null
      }
    },
    size: { type: String },
  };

  // TypeScript property declarations
  declare imageUrl?: string;
  declare text?: string;
  declare showInitial: boolean;
  declare size: AvatarSize;

  // Validation rules - automatically derived from the const arrays
  private validationRules = [
    createStringLiteralValidationRule(AVATAR_SIZES, 'size'),
  ];

  static styles = [
    css`
      :host {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
      }

      .avatar-container {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid var(--system-divider);
        background: var(--background);
      }

      .avatar-image {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      .avatar-gradient {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--gradient-color-1), var(--gradient-color-2));
      }

      .avatar-initial {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 700;
        color: var(--white);
        text-align: center;
        line-height: 1;
        user-select: none;
      }

      /* Size variants */
      .avatar-initial.small { font-size: 0.75rem; }
      .avatar-initial.medium { font-size: 1rem; }
      .avatar-initial.large { font-size: 1.5rem; }

      /* Responsive sizing */
      :host {
        min-width: var(--size-8);
        min-height: var(--size-8);
      }

      :host([size="small"]) {
        min-width: var(--size-8);
        min-height: var(--size-8);
      }

      :host([size="medium"]) {
        min-width: var(--size-12);
        min-height: var(--size-12);
      }

      :host([size="large"]) {
        min-width: var(--size-16);
        min-height: var(--size-16);
      }
    `
  ];

  constructor() {
    super();
    this.showInitial = false; // Default to false, will be overridden by attribute if present
    this.size = 'medium';
  }

  /**
   * Validates property values when they change
   */
  protected willUpdate(changedProperties: PropertyValues<this>): void {
    validateProperties(this, changedProperties, this.validationRules);
    
    // Debug property changes
    if (changedProperties.has('showInitial')) {
      console.log('showInitial changed:', {
        oldValue: changedProperties.get('showInitial'),
        newValue: this.showInitial,
        hasAttribute: this.hasAttribute('show-initial')
      });
    }
  }

  /**
   * Generates deterministic gradient colors based on input string
   */
  private generateGradientColors(input: string): { color1: string; color2: string } {
    if (!input) {
      return { color1: '#00d5be', color2: '#e12afb' }; // Default colors from Figma
    }

    // Simple hash function to generate consistent colors
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Generate two colors based on the hash
    const hue1 = Math.abs(hash) % 360;
    const hue2 = (hue1 + 120) % 360; // 120 degrees apart for good contrast

    const color1 = `hsl(${hue1}, 70%, 50%)`;
    const color2 = `hsl(${hue2}, 70%, 50%)`;

    return { color1, color2 };
  }

  /**
   * Gets the first character of the text for display
   */
  private getInitial(text?: string): string {
    if (!text) return '?';
    return text.charAt(0).toUpperCase();
  }

  render() {
    const hasImage = !!this.imageUrl;
    const hasText = !!this.text;
    const shouldShowInitial = !hasImage && hasText && this.showInitial;

    // Debug logging
    console.log('Avatar render:', {
      hasImage,
      hasText,
      showInitial: this.showInitial,
      shouldShowInitial,
      text: this.text
    });

    // Generate gradient colors if we have text but no image
    const gradientColors = !hasImage && hasText && this.text ? this.generateGradientColors(this.text) : null;

    return html`
      <div class="avatar-container">
        ${hasImage
          ? html`<div class="avatar-image" style="background-image: url('${this.imageUrl}')"></div>`
          : hasText
            ? html`
                <div class="avatar-gradient" style="--gradient-color-1: ${gradientColors?.color1}; --gradient-color-2: ${gradientColors?.color2};"></div>
                ${shouldShowInitial
                  ? html`<div class="avatar-initial ${this.size}">${this.getInitial(this.text)}</div>`
                  : ''
                }
              `
            : html`<div class="avatar-gradient" style="--gradient-color-1: #00d5be; --gradient-color-2: #e12afb;"></div>`
        }
      </div>
    `;
  }
}

if (!customElements.get('bui-avatar')) {
  customElements.define('bui-avatar', BuiAvatar);
}