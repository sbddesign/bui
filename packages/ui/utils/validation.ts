import type { PropertyValues } from 'lit';
import type { LitElement } from 'lit';

// Type for validation rules
export interface ValidationRule {
  property: string;
  validValues: readonly unknown[];
  message?: string;
}

// Validation utility function
export function validateProperties<T extends LitElement>(
  component: T,
  changedProperties: PropertyValues<T>,
  validationRules: ValidationRule[]
): void {
  for (const rule of validationRules) {
    const propertyKey = rule.property as keyof T;
    // PropertyValues is a Map-like type, cast to access has() with dynamic keys
    if ((changedProperties as Map<PropertyKey, unknown>).has(propertyKey)) {
      const value = component[propertyKey];
      if (value !== undefined && value !== null && !rule.validValues.includes(value)) {
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
  validValues: readonly unknown[],
  message?: string
): ValidationRule {
  return {
    property: String(property),
    validValues,
    message,
  };
}

// NEW: Type-safe validation that automatically derives valid values
export function validateEnum<TEnum extends Record<string, unknown>, TComponent extends LitElement>(
  component: TComponent,
  changedProperties: PropertyValues<TComponent>,
  enumType: TEnum,
  property: PropertyKey,
  message?: string
): void {
  const propertyKey = String(property) as keyof TComponent;
  // PropertyValues is a Map-like type, cast to access has() with dynamic keys
  if ((changedProperties as Map<PropertyKey, unknown>).has(propertyKey)) {
    const value = component[propertyKey];
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
export function createEnumValidationRule<T extends Record<string, unknown>>(
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
export function validateStringLiteral<T extends readonly string[], TComponent extends LitElement>(
  component: TComponent,
  changedProperties: PropertyValues<TComponent>,
  validValues: T,
  property: PropertyKey,
  message?: string
): void {
  const propertyKey = String(property) as keyof TComponent;
  // PropertyValues is a Map-like type, cast to access has() with dynamic keys
  if ((changedProperties as Map<PropertyKey, unknown>).has(propertyKey)) {
    const value = component[propertyKey];
    if (value !== undefined && value !== null && !validValues.includes(value as T[number])) {
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
  property: PropertyKey,
  message?: string
): ValidationRule {
  return {
    property: String(property),
    validValues: validValues as readonly unknown[],
    message,
  };
}
