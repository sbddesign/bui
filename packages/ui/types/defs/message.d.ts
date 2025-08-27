import { LitElement, PropertyValues } from 'lit';
declare const MESSAGE_MOODS: readonly ["neutral", "success", "caution", "danger"];
type MessageMood = typeof MESSAGE_MOODS[number];
export declare class BuiMessage extends LitElement {
    static properties: {
        text: {
            type: StringConstructor;
        };
        mood: {
            type: StringConstructor;
        };
        showIcon: {
            type: BooleanConstructor;
            reflect: boolean;
            attribute: string;
        };
        icon: {
            type: StringConstructor;
        };
    };
    text: string;
    mood: MessageMood;
    showIcon: boolean;
    icon: string;
    private validationRules;
    static styles: import("lit").CSSResult[];
    constructor();
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    private renderIcon;
    render(): import("lit").TemplateResult<1>;
}
export {};
