import {
  AuroraPivot,
  AuroraProperty,
  CHECKMARK,
  parseBooleanValue,
  PROPERTY_HEADERS,
  SheetPivotData,
} from '../types';
import { propertyToSheetRow, sheetRowToProperty } from './property-transformer';

const PIVOT_SEPARATOR = '══════';

/**
 * Creates the pivot separator row for the sheet
 */
export function createPivotSeparator(pivotName: string): string[] {
  const separator = `${PIVOT_SEPARATOR} PIVOT: ${pivotName} ${PIVOT_SEPARATOR}`;
  const row = new Array(PROPERTY_HEADERS.length).fill('');
  row[0] = separator;
  return row;
}

/**
 * Check if a row is a pivot separator
 */
export function isPivotSeparator(row: string[]): boolean {
  return row[0]?.includes(PIVOT_SEPARATOR) && row[0]?.includes('PIVOT:');
}

/**
 * Extract pivot name from separator row
 */
export function extractPivotNameFromSeparator(row: string[]): string | null {
  if (!isPivotSeparator(row)) return null;
  const match = row[0].match(/PIVOT:\s*([^\s═]+)/);
  return match ? match[1] : null;
}

/**
 * Creates pivot metadata rows
 */
export function createPivotMetadataRows(pivot: AuroraPivot): string[][] {
  const rows: string[][] = [];

  // Metadata row format: [label, value, ...empty]
  const emptyPadding = new Array(PROPERTY_HEADERS.length - 2).fill('');

  rows.push(['Bounded Context', pivot.boundedContextName, ...emptyPadding]);
  rows.push(['Module Name', pivot.moduleName, ...emptyPadding]);
  rows.push(['Module Names', pivot.moduleNames, ...emptyPadding]);
  rows.push(['Aggregate Name', pivot.aggregateName, ...emptyPadding]);
  rows.push(['Has OAuth', pivot.hasOAuth ? CHECKMARK : '', ...emptyPadding]);
  rows.push(['Has Tenant', pivot.hasTenant ? CHECKMARK : '', ...emptyPadding]);
  rows.push([
    'Has Auditing',
    pivot.hasAuditing ? CHECKMARK : '',
    ...emptyPadding,
  ]);

  return rows;
}

/**
 * Parse pivot metadata from rows
 */
export function parsePivotMetadataRows(rows: string[][]): Partial<AuroraPivot> {
  const metadata: Partial<AuroraPivot> = {};

  for (const row of rows) {
    const label = row[0]?.trim();
    const value = row[1]?.trim();

    switch (label) {
      case 'Bounded Context':
        metadata.boundedContextName = value;
        break;
      case 'Module Name':
        metadata.moduleName = value;
        break;
      case 'Module Names':
        metadata.moduleNames = value;
        break;
      case 'Aggregate Name':
        metadata.aggregateName = value;
        break;
      case 'Has OAuth':
        metadata.hasOAuth = parseBooleanValue(value);
        break;
      case 'Has Tenant':
        metadata.hasTenant = parseBooleanValue(value);
        break;
      case 'Has Auditing':
        metadata.hasAuditing = parseBooleanValue(value);
        break;
    }
  }

  return metadata;
}

/**
 * Converts a pivot to sheet rows (separator + metadata + header + properties)
 */
export function pivotToSheetRows(pivot: AuroraPivot): string[][] {
  const rows: string[][] = [];

  // Separator
  rows.push(createPivotSeparator(pivot.moduleName));

  // Empty row for visual separation
  rows.push(new Array(PROPERTY_HEADERS.length).fill(''));

  // Metadata
  rows.push(...createPivotMetadataRows(pivot));

  // Empty row before properties
  rows.push(new Array(PROPERTY_HEADERS.length).fill(''));

  // Property headers
  rows.push(PROPERTY_HEADERS as string[]);

  // Properties
  for (const prop of pivot.aggregateProperties || []) {
    const propRow = propertyToSheetRow(prop);
    const values = PROPERTY_HEADERS.map((header) => propRow[header] || '');
    rows.push(values);
  }

  return rows;
}

/**
 * Parse pivot section from sheet rows
 */
export function parsePivotFromSheetRows(
  rows: string[][],
): SheetPivotData | null {
  if (rows.length === 0) return null;

  // Find separator
  const separatorIdx = rows.findIndex(isPivotSeparator);
  if (separatorIdx === -1) return null;

  const pivotName = extractPivotNameFromSeparator(rows[separatorIdx]);
  if (!pivotName) return null;

  // Find metadata rows (after separator, before headers)
  const metadataRows: string[][] = [];
  let headerIdx = -1;

  for (let i = separatorIdx + 1; i < rows.length; i++) {
    const row = rows[i];
    // Check if this is the property header row
    if (row[0] === 'name' && row[1] === 'type') {
      headerIdx = i;
      break;
    }
    // Skip empty rows
    if (row[0]?.trim()) {
      metadataRows.push(row);
    }
  }

  if (headerIdx === -1) return null;

  const metadata = parsePivotMetadataRows(metadataRows);

  // Parse properties
  const properties: AuroraProperty[] = [];
  const headers = rows[headerIdx];

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const row = rows[i];
    // Stop if we hit another pivot separator or empty row
    if (!row[0]?.trim() || isPivotSeparator(row)) break;

    const propObj: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      propObj[headers[j]] = row[j] || '';
    }
    properties.push(sheetRowToProperty(propObj as never));
  }

  return {
    pivotName,
    metadata: {
      boundedContextName: metadata.boundedContextName || '',
      moduleName: metadata.moduleName || pivotName,
      moduleNames: metadata.moduleNames || '',
      aggregateName: metadata.aggregateName || '',
      hasOAuth: metadata.hasOAuth ? 'TRUE' : 'FALSE',
      hasTenant: metadata.hasTenant ? 'TRUE' : 'FALSE',
      hasAuditing: metadata.hasAuditing ? 'TRUE' : 'FALSE',
    },
    properties: properties.map(propertyToSheetRow),
  };
}

/**
 * Reconstruct pivot object from sheet data
 */
export function sheetPivotDataToPivot(data: SheetPivotData): AuroraPivot {
  return {
    boundedContextName: data.metadata.boundedContextName,
    moduleName: data.metadata.moduleName,
    moduleNames: data.metadata.moduleNames,
    aggregateName: data.metadata.aggregateName,
    hasOAuth: parseBooleanValue(data.metadata.hasOAuth),
    hasTenant: parseBooleanValue(data.metadata.hasTenant),
    hasAuditing: parseBooleanValue(data.metadata.hasAuditing),
    aggregateProperties: data.properties.map(sheetRowToProperty),
  };
}

/**
 * Find all pivot sections in sheet data
 */
export function findAllPivotSections(
  rows: string[][],
): { startIdx: number; name: string }[] {
  const sections: { startIdx: number; name: string }[] = [];

  for (let i = 0; i < rows.length; i++) {
    if (isPivotSeparator(rows[i])) {
      const name = extractPivotNameFromSeparator(rows[i]);
      if (name) {
        sections.push({ startIdx: i, name });
      }
    }
  }

  return sections;
}
