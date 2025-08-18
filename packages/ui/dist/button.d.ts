import { LitElement, PropertyValues } from 'lit';
type ButtonContent = 'label' | 'icon' | 'label+icon' | 'icon+label';
type ButtonStyleType = 'filled' | 'outline' | 'free';
type ButtonSize = 'default' | 'small' | 'large';
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
    static styles: import("lit").CSSResult[];
    constructor();
    /**
     * Validates property values when they change
     */
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    render(): import("lit").TemplateResult<1>;
}
export {};
