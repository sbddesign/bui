import { PropertyValues } from 'lit';
export interface ValidationRule {
    property: string;
    validValues: readonly any[];
    message?: string;
}
export declare function validateProperties(component: any, changedProperties: PropertyValues<any>, validationRules: ValidationRule[]): void;
export declare function createValidationRule<T>(property: keyof T, validValues: readonly any[], message?: string): ValidationRule;
export declare function validateEnum<T extends Record<string, any>>(component: any, changedProperties: PropertyValues<any>, enumType: T, property: keyof T, message?: string): void;
export declare function createEnumValidationRule<T extends Record<string, any>>(enumType: T, property: keyof T, message?: string): ValidationRule;
export declare function validateStringLiteral<T extends readonly string[]>(component: any, changedProperties: PropertyValues<any>, validValues: T, property: keyof any, message?: string): void;
export declare function createStringLiteralValidationRule<T extends readonly string[]>(validValues: T, property: keyof any, message?: string): ValidationRule;
