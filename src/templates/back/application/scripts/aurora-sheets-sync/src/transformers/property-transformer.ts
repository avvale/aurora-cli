import {
  AuroraProperty,
  AuroraRelationship,
  CHECKMARK,
  parseBooleanValue,
  PROPERTY_HEADERS,
  SheetPropertyRow,
} from '../types';

/**
 * Get the value for the "values" column based on property type
 * - enum: enumOptions
 * - array with subtype enum: arrayOptions.enumOptions
 * - decimal: decimals (e.g., "16, 14")
 */
function getvaluesField(property: AuroraProperty): string {
  if (property.type === 'enum' && property.enumOptions) {
    return property.enumOptions.join(', ');
  }
  if (
    property.type === 'array' &&
    property.arrayOptions?.type === 'enum' &&
    property.arrayOptions?.enumOptions
  ) {
    return property.arrayOptions.enumOptions.join(', ');
  }
  if (property.type === 'decimal' && property.decimals) {
    return property.decimals.join(', ');
  }
  return '';
}

/**
 * Map relationship type to spreadsheet format
 * one-to-one = 1:1, many-to-one = N:1, one-to-many = 1:N, many-to-many = N:N
 */
const RELATIONSHIP_TYPE_MAP: Record<string, string> = {
  'one-to-one': '1:1',
  'many-to-one': 'N:1',
  'one-to-many': '1:N',
  'many-to-many': 'N:N',
};

const RELATIONSHIP_TYPE_REVERSE_MAP: Record<string, string> = {
  '1:1': 'one-to-one',
  'N:1': 'many-to-one',
  '1:N': 'one-to-many',
  'N:N': 'many-to-many',
};

function relationshipTypeToSheet(type?: string): string {
  if (!type) return '';
  return RELATIONSHIP_TYPE_MAP[type] || type;
}

function sheetToRelationshipType(type?: string): string {
  if (!type) return '';
  return RELATIONSHIP_TYPE_REVERSE_MAP[type] || type;
}

/**
 * Extract module name from modulePath (e.g., "business-partner-portal/business-partner" -> "business-partner")
 */
function getModuleNameFromPath(modulePath?: string): string {
  if (!modulePath) return '';
  const parts = modulePath.split('/');
  return parts[parts.length - 1] || '';
}

/**
 * Converts a YAML property to a Sheet row
 */
export function propertyToSheetRow(property: AuroraProperty): SheetPropertyRow {
  const row: SheetPropertyRow = {
    name: property.name || '',
    type: property.type || '',
    subtype: property.type === 'array' ? property.arrayOptions?.type || '' : '',
    values: getvaluesField(property),
    nullable: boolToString(property.nullable),
    relationship: relationshipTypeToSheet(property.relationship?.type),
    master: getModuleNameFromPath(property.relationship?.modulePath),
    primaryKey: boolToString(property.primaryKey),
    index: property.index || '',
    indexUsing: property.indexUsing || '',
    maxLength: property.maxLength?.toString() || '',
    decimals: formatDecimals(property.decimals),
    defaultValue: formatDefaultValue(property.defaultValue),
    enumOptions: formatEnumOptions(property.enumOptions),
    'arrayOptions.type': property.arrayOptions?.type || '',
    'arrayOptions.maxLength':
      property.arrayOptions?.maxLength?.toString() || '',
    'arrayOptions.enumOptions': formatEnumOptions(
      property.arrayOptions?.enumOptions,
    ),
    'rel.type': property.relationship?.type || '',
    'rel.singularName': property.relationship?.singularName || '',
    'rel.aggregateName': property.relationship?.aggregateName || '',
    'rel.modulePath': property.relationship?.modulePath || '',
    'rel.key': property.relationship?.key || '',
    'rel.field': property.relationship?.field || '',
    'rel.avoidConstraint': boolToString(property.relationship?.avoidConstraint),
    autoIncrement: boolToString(property.autoIncrement),
    isI18n: boolToString(property.isI18n),
    example: formatExample(property.example),
    description: cleanDescription(property.description),
  };

  return row;
}

/**
 * Converts a Sheet row back to a YAML property
 */
export function sheetRowToProperty(row: SheetPropertyRow): AuroraProperty {
  const property: AuroraProperty = {
    name: row.name,
    type: row.type,
  };

  // Add optional fields only if they have values
  if (parseBooleanValue(row.primaryKey)) property.primaryKey = true;
  // nullable: ✓ = true, empty/not checked = false
  if (parseBooleanValue(row.nullable)) {
    property.nullable = true;
  } else {
    property.nullable = false;
  }
  if (row.index) property.index = row.index;
  if (row.indexUsing) property.indexUsing = row.indexUsing;
  if (row.maxLength) property.maxLength = parseInt(row.maxLength, 10);

  // Handle values column based on type
  // - enum: values contains enumOptions
  // - decimal: values contains decimals (e.g., "16, 14")
  // - array with subtype enum: values contains arrayOptions.enumOptions
  if (row.type === 'enum' && row.values) {
    property.enumOptions = parseEnumOptions(row.values);
  } else if (row.enumOptions) {
    property.enumOptions = parseEnumOptions(row.enumOptions);
  }

  if (row.type === 'decimal' && row.values) {
    property.decimals = parseDecimals(row.values);
  } else if (row.decimals) {
    property.decimals = parseDecimals(row.decimals);
  }

  if (row.defaultValue) {
    const parsedDefault = parseDefaultValue(row.defaultValue);
    // If type is array, wrap defaultValue in array (if not already)
    if (row.type === 'array' && !Array.isArray(parsedDefault)) {
      property.defaultValue = [parsedDefault];
    } else {
      property.defaultValue = parsedDefault;
    }
  }
  if (parseBooleanValue(row.autoIncrement)) property.autoIncrement = true;
  if (parseBooleanValue(row.isI18n)) property.isI18n = true;
  if (row.example) property.example = parseExample(row.example);
  if (row.description) property.description = row.description;

  // Array options - use subtype column when type is "array"
  const arrayType = row.subtype || row['arrayOptions.type'];
  if (row.type === 'array' && arrayType) {
    property.arrayOptions = {
      type: arrayType,
    };
    if (row['arrayOptions.maxLength']) {
      property.arrayOptions.maxLength = parseInt(
        row['arrayOptions.maxLength'],
        10,
      );
    }
    // For array with subtype enum, use values column
    if (arrayType === 'enum' && row.values) {
      property.arrayOptions.enumOptions = parseEnumOptions(row.values);
    } else if (row['arrayOptions.enumOptions']) {
      property.arrayOptions.enumOptions = parseEnumOptions(
        row['arrayOptions.enumOptions'],
      );
    }
  }

  // Relationship - use 'relationship' column (1:1, N:1, 1:N, N:N) or 'rel.type'
  const relType = row.relationship
    ? sheetToRelationshipType(row.relationship)
    : row['rel.type'];
  if (relType) {
    property.relationship = {
      type: relType as AuroraRelationship['type'],
      aggregateName: row['rel.aggregateName'],
      modulePath: row['rel.modulePath'],
    };
    if (row['rel.singularName'])
      property.relationship.singularName = row['rel.singularName'];
    if (row['rel.key']) property.relationship.key = row['rel.key'];
    if (row['rel.field']) property.relationship.field = row['rel.field'];
    if (parseBooleanValue(row['rel.avoidConstraint']))
      property.relationship.avoidConstraint = true;
  }

  return property;
}

/**
 * Convert array of properties to sheet rows (2D array for batch update)
 */
export function propertiesToSheetvalues(
  properties: AuroraProperty[],
): string[][] {
  const rows: string[][] = [PROPERTY_HEADERS as string[]];

  for (const prop of properties) {
    const row = propertyToSheetRow(prop);
    const values = PROPERTY_HEADERS.map((header) => row[header] || '');
    rows.push(values);
  }

  return rows;
}

/**
 * Convert sheet values (2D array) back to properties
 */
export function sheetvaluesToProperties(values: string[][]): AuroraProperty[] {
  if (values.length < 2) return [];

  const headers = values[0] as (keyof SheetPropertyRow)[];
  const properties: AuroraProperty[] = [];

  for (let i = 1; i < values.length; i++) {
    const rowvalues = values[i];
    if (!rowvalues || !rowvalues[0]) continue; // Skip empty rows

    const row: Partial<SheetPropertyRow> = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = rowvalues[j] || '';
    }

    properties.push(sheetRowToProperty(row as SheetPropertyRow));
  }

  return properties;
}

// Helper functions

function boolToString(value?: boolean): string {
  if (value === true) return CHECKMARK;
  if (value === false) return '';
  return '';
}

function formatDecimals(decimals?: [number, number]): string {
  if (!decimals || !Array.isArray(decimals)) return '';
  return `${decimals[0]},${decimals[1]}`;
}

function parseDecimals(value: string): [number, number] {
  const parts = value.split(',').map((s) => parseInt(s.trim(), 10));
  return [parts[0], parts[1]];
}

function formatEnumOptions(options?: string[]): string {
  if (!options || !Array.isArray(options)) return '';
  return options.join(',');
}

function parseEnumOptions(value: string): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatDefaultValue(value?: unknown): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return String(value);
}

function parseDefaultValue(value: string): unknown {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  const num = Number(value);
  if (!isNaN(num) && value.trim() !== '') return num;
  return value;
}

function formatExample(value?: unknown): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function parseExample(value: string): unknown {
  if (!value) return undefined;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function cleanDescription(desc?: string): string {
  if (!desc) return '';
  // Preserve line breaks but normalize multiple spaces and trim each line
  return desc
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim();
}
