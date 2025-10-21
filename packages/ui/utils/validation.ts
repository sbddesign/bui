import type { PropertyValues } from 'lit';

// Type for validation rules
export interface ValidationRule {
  property: string;
  validValues: readonly any[];
  message?: string;
}

// Validation utility function
export function validateProperties(
  component: any,
  changedProperties: PropertyValues<any>,
  validationRules: ValidationRule[]
): void {
  for (const rule of validationRules) {
    if (changedProperties.has(rule.property)) {
      const value = component[rule.property];
      if (
        value !== undefined &&
        value !== null &&
        !rule.validValues.includes(value)
      ) {
        const message =
          rule.message ||
          `Invalid ${rule.property} value: ${value}. Valid values are: ${rule.validValues.join(', ')}`;
        console.warn(message);
      }
    }
  }
}

// Helper function to create validation rules from type arrays
export function createValidationRule<T>(
  property: PropertyKey,
  validValues: readonly any[],
  message?: string
): ValidationRule {
  return {
    property: String(property),
    validValues,
    message,
  };
}

// NEW: Type-safe validation that automatically derives valid values
export function validateEnum<T extends Record<string, any>>(
  component: any,
  changedProperties: PropertyValues<any>,
  enumType: T,
  property: PropertyKey,
  message?: string
): void {
  if (changedProperties.has(String(property))) {
    const value = component[property as keyof typeof component];
    const validValues = Object.values(enumType);
    if (value !== undefined && value !== null && !validValues.includes(value)) {
      const errorMessage =
        message ||
        `Invalid ${String(property)} value: ${value}. Valid values are: ${validValues.join(', ')}`;
      console.warn(errorMessage);
    }
  }
}

// NEW: Create validation rule from enum type
export function createEnumValidationRule<T extends Record<string, any>>(
  enumType: T,
  property: PropertyKey,
  message?: string
): ValidationRule {
  return {
    property: String(property),
    validValues: Object.values(enumType),
    message,
  };
}

// NEW: Validate string literal union types using const assertions
export function validateStringLiteral<T extends readonly string[]>(
  component: any,
  changedProperties: PropertyValues<any>,
  validValues: T,
  property: keyof any,
  message?: string
): void {
  if (changedProperties.has(String(property))) {
    const value = component[property];
    if (
      value !== undefined &&
      value !== null &&
      !validValues.includes(value as T[number])
    ) {
      const errorMessage =
        message ||
        `Invalid ${String(property)} value: ${value}. Valid values are: ${validValues.join(', ')}`;
      console.warn(errorMessage);
    }
  }
}

// NEW: Create validation rule from string literal array
export function createStringLiteralValidationRule<T extends readonly string[]>(
  validValues: T,
  property: keyof any,
  message?: string
): ValidationRule {
  return {
    property: String(property),
    validValues: validValues as readonly any[],
    message,
  };
}
