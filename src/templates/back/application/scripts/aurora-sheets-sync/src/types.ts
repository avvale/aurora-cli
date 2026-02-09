/**
 * Aurora YAML Schema Types
 */

export interface AuroraRelationship {
  type: 'one-to-one' | 'many-to-one' | 'one-to-many' | 'many-to-many';
  singularName?: string;
  aggregateName: string;
  modulePath: string;
  key?: string;
  field?: string;
  avoidConstraint?: boolean;
  pivot?: AuroraPivot;
}

export interface AuroraPivot {
  boundedContextName: string;
  moduleName: string;
  moduleNames: string;
  aggregateName: string;
  hasOAuth?: boolean;
  hasTenant?: boolean;
  hasAuditing?: boolean;
  aggregateProperties: AuroraProperty[];
  excludedOperations?: string[];
}

export interface AuroraArrayOptions {
  type: string;
  maxLength?: number;
  enumOptions?: string[];
}

export interface AuroraWebComponent {
  type: string;
}

export interface AuroraProperty {
  name: string;
  type: string;
  primaryKey?: boolean;
  nullable?: boolean;
  index?: string;
  indexUsing?: string;
  maxLength?: number;
  length?: number;
  decimals?: [number, number];
  defaultValue?: unknown;
  enumOptions?: string[];
  arrayOptions?: AuroraArrayOptions;
  relationship?: AuroraRelationship;
  webComponent?: AuroraWebComponent;
  autoIncrement?: boolean;
  isI18n?: boolean;
  example?: unknown;
  description?: string;
}

export interface AuroraFront {
  solidIcon?: string;
  outlineIcon?: string;
}

export interface AuroraAdditionalApi {
  path: string;
  resolverType: string;
  httpMethod: string;
}

export interface AuroraSchema {
  version: string;
  boundedContextName: string;
  moduleName: string;
  moduleNames: string;
  aggregateName: string;
  hasOAuth?: boolean;
  hasTenant?: boolean;
  hasAuditing?: boolean;
  description?: string;
  front?: AuroraFront;
  aggregateProperties: AuroraProperty[];
  additionalApis?: AuroraAdditionalApi[];
  excludedOperations?: string[];
  excludedFiles?: string[];
}

/**
 * Sheet Row Types
 */

export interface SheetPropertyRow {
  name: string;
  type: string;
  subtype: string; // Used for arrayOptions.type when type="array"
  values: string; // Multi-purpose: enumOptions, arrayOptions.enumOptions, or decimals
  nullable: string;
  relationship: string; // Mapped: 1:1, N:1, 1:N, N:N
  master: string; // Related module name (with hyperlink if in same BC)
  primaryKey: string;
  index: string;
  indexUsing: string;
  'maxLength/length': string;
  decimals: string;
  defaultValue: string;
  enumOptions: string;
  'arrayOptions.type': string;
  'arrayOptions.maxLength': string;
  'arrayOptions.enumOptions': string;
  'rel.type': string;
  'rel.singularName': string;
  'rel.aggregateName': string;
  'rel.modulePath': string;
  'rel.key': string;
  'rel.field': string;
  'rel.avoidConstraint': string;
  autoIncrement: string;
  isI18n: string;
  example: string;
  description: string;
}

export interface SheetMetadata {
  moduleName: string;
  moduleNames: string;
  aggregateName: string;
  boundedContextName: string;
  version: string;
  hasOAuth: string;
  hasTenant: string;
  hasAuditing: string;
  description: string;
  solidIcon: string;
  outlineIcon: string;
}

/**
 * Dynamic index row - headers are read from spreadsheet
 */
export type SheetIndexRow = Record<string, string>;

export interface SheetPivotData {
  pivotName: string;
  metadata: {
    boundedContextName: string;
    moduleName: string;
    moduleNames: string;
    aggregateName: string;
    hasOAuth: string;
    hasTenant: string;
    hasAuditing: string;
  };
  properties: SheetPropertyRow[];
}

export interface ModuleSheetData {
  metadata: SheetMetadata;
  properties: SheetPropertyRow[];
  pivots: SheetPivotData[];
}

/**
 * Property Headers for the Sheet
 */
export const PROPERTY_HEADERS: (keyof SheetPropertyRow)[] = [
  'name',
  'type',
  'primaryKey',
  'nullable',
  'index',
  'indexUsing',
  'maxLength/length',
  'decimals',
  'defaultValue',
  'enumOptions',
  'arrayOptions.type',
  'arrayOptions.maxLength',
  'arrayOptions.enumOptions',
  'rel.type',
  'rel.singularName',
  'rel.aggregateName',
  'rel.modulePath',
  'rel.key',
  'rel.field',
  'rel.avoidConstraint',
  'autoIncrement',
  'isI18n',
  'example',
  'description',
];

export const METADATA_LABELS = [
  'Module Name',
  'Module Names (plural)',
  'Aggregate Name',
  'Bounded Context',
  'Version',
  'Has OAuth',
  'Has Tenant',
  'Has Auditing',
  'Description',
  'Solid Icon',
  'Outline Icon',
];

/**
 * Header to schema path mapping for special cases
 * Headers use ':' as separator for nested paths (e.g., 'front:outlineIcon')
 */
export const HEADER_TO_SCHEMA_MAP: Record<string, string> = {
  hasAuth: 'hasOAuth', // Spreadsheet uses 'hasAuth', schema uses 'hasOAuth'
};

/**
 * Get schema path from header name
 */
export function getSchemaPath(header: string): string {
  return HEADER_TO_SCHEMA_MAP[header] || header;
}

// Checkmark character used for boolean TRUE in spreadsheet (CHAR 9989)
export const CHECKMARK = '✓';

/**
 * Parse boolean value from spreadsheet cell
 * Supports both 'TRUE' string and '✓' checkmark formats
 */
export function parseBooleanValue(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toUpperCase();
  return normalized === 'TRUE' || value.trim() === CHECKMARK;
}
