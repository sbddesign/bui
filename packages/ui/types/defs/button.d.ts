import { LitElement, PropertyValues } from 'lit';
declare const BUTTON_CONTENTS: readonly ["label", "icon", "label+icon", "icon+label"];
declare const BUTTON_STYLE_TYPES: readonly ["filled", "outline", "free"];
declare const BUTTON_SIZES: readonly ["default", "small", "large"];
type ButtonContent = typeof BUTTON_CONTENTS[number];
type ButtonStyleType = typeof BUTTON_STYLE_TYPES[number];
type ButtonSize = typeof BUTTON_SIZES[number];
type ButtonCluster = 'top' | 'bottom' | 'left' | 'right' | 'middle-horizontal' | 'middle-vertical';
export declare class BuiButton extends LitElement {
    static properties: {
        content: {
            type: StringConstructor;
        };
        styleType: {
            type: StringConstructor;
            attribute: string;
        };
        size: {
            type: StringConstructor;
        };
        disabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        label: {
            type: StringConstructor;
        };
        cluster: {
            type: StringConstructor;
        };
        wide: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    content: ButtonContent;
    styleType: ButtonStyleType;
    size: ButtonSize;
    disabled: boolean;
    label: string;
    cluster?: ButtonCluster;
    wide: boolean;
    private validationRules;
    static styles: import("lit").CSSResult[];
    constructor();
    /**
     * Validates property values when they change
     */
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    render(): import("lit").TemplateResult<1>;
}
export {};
