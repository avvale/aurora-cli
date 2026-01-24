import {
  AuroraProperty,
  AuroraSchema,
  ModuleSheetData,
  parseBooleanValue,
  SheetPropertyRow,
} from '../types';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

const VALID_TYPES = [
  'id',
  'varchar',
  'char',
  'text',
  'int',
  'bigint',
  'smallint',
  'decimal',
  'float',
  'boolean',
  'date',
  'timestamp',
  'json',
  'jsonb',
  'enum',
  'array',
  'relationship',
  'blob',
  'password',
  'manyToMany',
];

const VALID_INDEX_TYPES = ['index', 'unique'];

const CAMEL_CASE_REGEX = /^[a-z][a-zA-Z0-9]*$/;

/**
 * Validates an Aurora YAML schema
 */
export function validateSchema(schema: AuroraSchema): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Module-level validation
  if (!schema.moduleName) {
    errors.push({
      field: 'moduleName',
      message: 'Module name is required',
      severity: 'error',
    });
  } else if (!CAMEL_CASE_REGEX.test(schema.moduleName)) {
    warnings.push({
      field: 'moduleName',
      message: `Module name "${schema.moduleName}" should be camelCase`,
      severity: 'warning',
    });
  }

  if (!schema.aggregateName) {
    errors.push({
      field: 'aggregateName',
      message: 'Aggregate name is required',
      severity: 'error',
    });
  }

  if (!schema.boundedContextName) {
    errors.push({
      field: 'boundedContextName',
      message: 'Bounded context name is required',
      severity: 'error',
    });
  }

  // Properties validation
  if (!schema.aggregateProperties || schema.aggregateProperties.length === 0) {
    errors.push({
      field: 'aggregateProperties',
      message: 'At least one property is required',
      severity: 'error',
    });
  } else {
    // Map<name, isI18n> to allow duplicate names if isI18n differs
    const propertyMap = new Map<string, boolean>();
    let hasPrimaryKey = false;

    for (const prop of schema.aggregateProperties) {
      const propErrors = validateProperty(prop, propertyMap);
      errors.push(...propErrors.filter((e) => e.severity === 'error'));
      warnings.push(...propErrors.filter((e) => e.severity === 'warning'));

      if (prop.primaryKey) hasPrimaryKey = true;
      propertyMap.set(prop.name, prop.isI18n ?? false);
    }

    if (!hasPrimaryKey) {
      errors.push({
        field: 'aggregateProperties',
        message: 'At least one primary key is required',
        severity: 'error',
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates a single property
 * @param existingProperties Map<name, isI18n> to detect duplicates (allows same name if isI18n differs)
 */
export function validateProperty(
  prop: AuroraProperty,
  existingProperties?: Map<string, boolean>,
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Name validation
  if (!prop.name) {
    errors.push({
      field: `property`,
      message: 'Property name is required',
      severity: 'error',
    });
  } else {
    if (!CAMEL_CASE_REGEX.test(prop.name)) {
      errors.push({
        field: `property.${prop.name}`,
        message: `Property name "${prop.name}" should be camelCase`,
        severity: 'warning',
      });
    }

    // Duplicate validation: only error if BOTH have same isI18n value
    if (existingProperties?.has(prop.name)) {
      const existingIsI18n = existingProperties.get(prop.name);
      const currentIsI18n = prop.isI18n ?? false;

      // Only error if both have same isI18n value (true duplicate)
      if (existingIsI18n === currentIsI18n) {
        errors.push({
          field: `property.${prop.name}`,
          message: `Duplicate property name "${prop.name}"`,
          severity: 'error',
        });
      }
      // If one is i18n and other is not -> allowed (not a duplicate)
    }
  }

  // Type validation
  if (!prop.type) {
    errors.push({
      field: `property.${prop.name}.type`,
      message: 'Property type is required',
      severity: 'error',
    });
  } else if (!VALID_TYPES.includes(prop.type)) {
    errors.push({
      field: `property.${prop.name}.type`,
      message: `Invalid type "${prop.type}". Valid types: ${VALID_TYPES.join(', ')}`,
      severity: 'error',
    });
  }

  // Type-specific validations
  if (
    prop.type === 'enum' &&
    (!prop.enumOptions || prop.enumOptions.length === 0)
  ) {
    errors.push({
      field: `property.${prop.name}.enumOptions`,
      message: 'Enum type requires enumOptions',
      severity: 'error',
    });
  }

  if (prop.type === 'array' && !prop.arrayOptions?.type) {
    errors.push({
      field: `property.${prop.name}.arrayOptions`,
      message: 'Array type requires arrayOptions.type',
      severity: 'error',
    });
  }

  if (prop.type === 'varchar' && !prop.maxLength) {
    errors.push({
      field: `property.${prop.name}.maxLength`,
      message: 'Varchar type should specify maxLength',
      severity: 'warning',
    });
  }

  if (prop.type === 'decimal' && !prop.decimals) {
    errors.push({
      field: `property.${prop.name}.decimals`,
      message: 'Decimal type should specify decimals [precision, scale]',
      severity: 'warning',
    });
  }

  // Index validation
  if (prop.index && !VALID_INDEX_TYPES.includes(prop.index)) {
    errors.push({
      field: `property.${prop.name}.index`,
      message: `Invalid index type "${prop.index}". Valid: ${VALID_INDEX_TYPES.join(', ')}`,
      severity: 'error',
    });
  }

  // Relationship validation
  if (prop.type === 'relationship' && !prop.relationship) {
    errors.push({
      field: `property.${prop.name}.relationship`,
      message: 'Relationship type requires relationship configuration',
      severity: 'error',
    });
  }

  if (prop.relationship) {
    if (!prop.relationship.type) {
      errors.push({
        field: `property.${prop.name}.relationship.type`,
        message: 'Relationship type is required',
        severity: 'error',
      });
    }
    if (!prop.relationship.aggregateName) {
      errors.push({
        field: `property.${prop.name}.relationship.aggregateName`,
        message: 'Relationship aggregateName is required',
        severity: 'error',
      });
    }
    if (!prop.relationship.modulePath) {
      errors.push({
        field: `property.${prop.name}.relationship.modulePath`,
        message: 'Relationship modulePath is required',
        severity: 'error',
      });
    }
  }

  return errors;
}

/**
 * Validates sheet data before converting to YAML
 */
export function validateSheetData(data: ModuleSheetData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Metadata validation
  if (!data.metadata.moduleName) {
    errors.push({
      field: 'metadata.moduleName',
      message: 'Module name is required in sheet',
      severity: 'error',
    });
  }

  if (!data.metadata.aggregateName) {
    errors.push({
      field: 'metadata.aggregateName',
      message: 'Aggregate name is required in sheet',
      severity: 'error',
    });
  }

  // Properties validation
  if (data.properties.length === 0) {
    errors.push({
      field: 'properties',
      message: 'At least one property row is required',
      severity: 'error',
    });
  } else {
    // Map<name, isI18n> to allow duplicate names if isI18n differs
    const propertyMap = new Map<string, boolean>();

    for (const row of data.properties) {
      const rowErrors = validatePropertyRow(row, propertyMap);
      errors.push(...rowErrors.filter((e) => e.severity === 'error'));
      warnings.push(...rowErrors.filter((e) => e.severity === 'warning'));
      if (row.name) propertyMap.set(row.name, parseBooleanValue(row.isI18n));
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates a sheet property row
 * @param existingProperties Map<name, isI18n> to detect duplicates (allows same name if isI18n differs)
 */
export function validatePropertyRow(
  row: SheetPropertyRow,
  existingProperties?: Map<string, boolean>,
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!row.name) {
    errors.push({
      field: 'row',
      message: 'Property name is required',
      severity: 'error',
    });
    return errors;
  }

  if (!CAMEL_CASE_REGEX.test(row.name)) {
    errors.push({
      field: `row.${row.name}`,
      message: `Property name "${row.name}" should be camelCase`,
      severity: 'warning',
    });
  }

  // Duplicate validation: only error if BOTH have same isI18n value
  if (existingProperties?.has(row.name)) {
    const existingIsI18n = existingProperties.get(row.name);
    const currentIsI18n = parseBooleanValue(row.isI18n);

    // Only error if both have same isI18n value (true duplicate)
    if (existingIsI18n === currentIsI18n) {
      errors.push({
        field: `row.${row.name}`,
        message: `Duplicate property name "${row.name}"`,
        severity: 'error',
      });
    }
    // If one is i18n and other is not -> allowed (not a duplicate)
  }

  if (!row.type) {
    errors.push({
      field: `row.${row.name}.type`,
      message: 'Type is required',
      severity: 'error',
    });
  } else if (!VALID_TYPES.includes(row.type)) {
    errors.push({
      field: `row.${row.name}.type`,
      message: `Invalid type "${row.type}"`,
      severity: 'error',
    });
  }

  // Type-specific validations
  if (row.type === 'enum' && !row.enumOptions) {
    errors.push({
      field: `row.${row.name}.enumOptions`,
      message: 'Enum requires enumOptions',
      severity: 'error',
    });
  }

  if (row.type === 'array' && !row['arrayOptions.type']) {
    errors.push({
      field: `row.${row.name}.arrayOptions`,
      message: 'Array requires arrayOptions.type',
      severity: 'error',
    });
  }

  return errors;
}

/**
 * Format validation results for display
 */
export function formatValidationResult(result: ValidationResult): string {
  const lines: string[] = [];

  if (result.isValid) {
    lines.push('✓ Validation passed');
  } else {
    lines.push('✗ Validation failed');
  }

  if (result.errors.length > 0) {
    lines.push('\nErrors:');
    for (const err of result.errors) {
      lines.push(`  ✗ ${err.field}: ${err.message}`);
    }
  }

  if (result.warnings.length > 0) {
    lines.push('\nWarnings:');
    for (const warn of result.warnings) {
      lines.push(`  ⚠ ${warn.field}: ${warn.message}`);
    }
  }

  return lines.join('\n');
}
