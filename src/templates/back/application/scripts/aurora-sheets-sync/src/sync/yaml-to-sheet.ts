import * as fs from 'fs-extra';
import { sheets_v4 } from 'googleapis';
import * as yaml from 'js-yaml';
import * as path from 'path';
import { GoogleSheetsAuth } from '../auth/google-auth';
import { SheetsConfigManager } from '../config/sheets-config';
import { propertyToSheetRow } from '../transformers/property-transformer';
import {
  createPropertyWithoutPivot,
  separatePropertiesAndPivots,
} from '../transformers/relationship-transformer';
import {
  AuroraProperty,
  AuroraSchema,
  CHECKMARK,
  getSchemaPath,
  SheetPropertyRow,
} from '../types';
import {
  formatValidationResult,
  validateSchema,
} from '../validators/schema-validator';

const TEMPLATE_SHEET_NAME = 'TEMPLATE';
const INDEX_SHEET_NAME = 'MODULES';

export interface PushOptions {
  dryRun?: boolean;
  verbose?: boolean;
}

export interface PushResult {
  success: boolean;
  modulesProcessed: number;
  modulesFailed: string[];
  messages: string[];
}

/**
 * Push YAML schemas to Google Sheets
 */
export async function pushBoundedContext(
  auth: GoogleSheetsAuth,
  config: SheetsConfigManager,
  boundedContextName: string,
  options: PushOptions = {},
): Promise<PushResult> {
  const result: PushResult = {
    success: true,
    modulesProcessed: 0,
    modulesFailed: [],
    messages: [],
  };

  try {
    await config.load();
    const bcConfig = config.getBoundedContext(boundedContextName);
    const cliterPath = config.getCliterPath();
    const bcPath = path.join(cliterPath, boundedContextName);

    if (!(await fs.pathExists(bcPath))) {
      throw new Error(`Bounded context path not found: ${bcPath}`);
    }

    // Load all YAML files
    const yamlFiles = await fs.readdir(bcPath);
    const schemas: AuroraSchema[] = [];

    for (const file of yamlFiles) {
      if (!file.endsWith('.aurora.yaml')) continue;

      const filePath = path.join(bcPath, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const schema = yaml.load(content) as AuroraSchema;

      // Validate schema
      const validation = validateSchema(schema);
      if (!validation.isValid) {
        result.messages.push(`Validation failed for ${file}:`);
        result.messages.push(formatValidationResult(validation));
        result.modulesFailed.push(schema.moduleName);
        result.success = false;
        continue;
      }

      schemas.push(schema);
    }

    if (options.dryRun) {
      result.messages.push(
        `[DRY RUN] Would push ${schemas.length} modules to spreadsheet ${bcConfig.spreadsheetId}`,
      );
      result.modulesProcessed = schemas.length;
      return result;
    }

    const sheetsApi = auth.getSheetsApi();

    // Step 1: Ensure all module sheets exist first
    for (const schema of schemas) {
      await ensureSheetExists(
        sheetsApi,
        bcConfig.spreadsheetId,
        schema.moduleName,
      );
    }

    // Step 2: Get sheet ID map for hyperlinks (master column)
    const moduleSheetIds = await getSheetIdMap(
      sheetsApi,
      bcConfig.spreadsheetId,
    );

    // Step 3: Update each module sheet with data
    for (const schema of schemas) {
      try {
        await updateModuleSheet(
          sheetsApi,
          bcConfig.spreadsheetId,
          schema,
          moduleSheetIds,
        );
        result.modulesProcessed++;
        result.messages.push(`✓ Updated: ${schema.moduleName}`);
      } catch (error) {
        const err = error as Error;
        result.modulesFailed.push(schema.moduleName);
        result.messages.push(`✗ Failed: ${schema.moduleName} - ${err.message}`);
        result.success = false;
      }
    }

    // Update MODULES index sheet AFTER module sheets exist
    await updateIndexSheet(sheetsApi, bcConfig.spreadsheetId, schemas);
    result.messages.push(
      `Updated MODULES sheet with ${schemas.length} modules`,
    );

    // Reorder sheets: MODULES → [modules alphabetically] → TEMPLATE → DATA
    await reorderSheets(sheetsApi, bcConfig.spreadsheetId, schemas);
  } catch (error) {
    const err = error as Error;
    result.success = false;
    result.messages.push(`Error: ${err.message}`);
  }

  return result;
}

/**
 * Read headers from the first row of INDEX sheet (MODULES)
 */
async function readIndexHeaders(
  api: sheets_v4.Sheets,
  spreadsheetId: string,
): Promise<string[]> {
  const response = await api.spreadsheets.values.get({
    spreadsheetId,
    range: `'${INDEX_SHEET_NAME}'!1:1`,
  });
  return (response.data.values?.[0] || []) as string[];
}

/**
 * Get value from schema by path (supports nested paths with ':' separator)
 * Example paths: 'moduleName', 'front:outlineIcon', 'hasOAuth'
 */
function getSchemaValue(schema: AuroraSchema, path: string): unknown {
  const schemaPath = getSchemaPath(path); // Apply special mappings (e.g., hasAuth -> hasOAuth)
  const parts = schemaPath.split(':');
  let value: unknown = schema;

  for (const part of parts) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return value;
}

/**
 * Format a value for a spreadsheet cell
 * - moduleName: creates hyperlink to the module sheet
 * - booleans: ✓ for true, empty for false
 * - other: string conversion
 */
function formatCellValue(
  value: unknown,
  header: string,
  sheetId: number,
  schema: AuroraSchema,
): string {
  // moduleName with hyperlink
  if (header === 'moduleName') {
    return `=HYPERLINK("#gid=${sheetId}", "${schema.moduleName}")`;
  }

  // Booleans: ✓ or empty
  if (typeof value === 'boolean') {
    return value ? CHECKMARK : '';
  }

  // Strings and others
  return value?.toString() || '';
}

/**
 * Update the Index sheet (MODULES) with module summary
 * Reads headers from the spreadsheet dynamically and preserves row 1
 */
async function updateIndexSheet(
  api: sheets_v4.Sheets,
  spreadsheetId: string,
  schemas: AuroraSchema[],
): Promise<void> {
  // Ensure MODULES sheet exists
  await ensureSheetExists(api, spreadsheetId, INDEX_SHEET_NAME);

  // Read headers from row 1 of MODULES sheet
  const headers = await readIndexHeaders(api, spreadsheetId);

  if (headers.length === 0) {
    throw new Error(
      `No headers found in ${INDEX_SHEET_NAME} sheet. Please add headers in row 1.`,
    );
  }

  // Build data rows (starting from row 2, preserving headers)
  const dataRows: string[][] = [];

  for (const schema of schemas) {
    const sheetId = await getSheetIdByName(
      api,
      spreadsheetId,
      schema.moduleName,
    );
    const row = headers.map((header) => {
      const value = getSchemaValue(schema, header);
      return formatCellValue(value, header, sheetId, schema);
    });
    dataRows.push(row);
  }

  // Calculate range based on number of columns
  const lastColumn = String.fromCharCode(64 + headers.length); // A=65, so 64+1=A, 64+6=F, etc.

  // Clear data rows only (preserve row 1 with headers)
  await api.spreadsheets.values.clear({
    spreadsheetId,
    range: `'${INDEX_SHEET_NAME}'!A2:${lastColumn}`,
  });

  // Write data starting from row 2
  if (dataRows.length > 0) {
    await api.spreadsheets.values.update({
      spreadsheetId,
      range: `'${INDEX_SHEET_NAME}'!A2`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: dataRows },
    });

    // Get MODULES sheet ID for formatting operations
    const modulesSheetId = await getSheetIdByName(
      api,
      spreadsheetId,
      INDEX_SHEET_NAME,
    );

    // Apply formatting: row height and filter range
    await api.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          // Set row height to 20 pixels for data rows
          {
            updateDimensionProperties: {
              range: {
                sheetId: modulesSheetId,
                dimension: 'ROWS',
                startIndex: 1, // Row 2 (0-indexed)
                endIndex: 1 + dataRows.length,
              },
              properties: {
                pixelSize: 20,
              },
              fields: 'pixelSize',
            },
          },
          // Clear existing filter
          {
            clearBasicFilter: {
              sheetId: modulesSheetId,
            },
          },
          // Set new filter range including all data rows
          {
            setBasicFilter: {
              filter: {
                range: {
                  sheetId: modulesSheetId,
                  startRowIndex: 0, // Row 1 (headers)
                  endRowIndex: 1 + dataRows.length, // Include all data rows
                  startColumnIndex: 0,
                  endColumnIndex: headers.length,
                },
              },
            },
          },
        ],
      },
    });
  }
}

/**
 * Reorder sheets: MODULES → [modules alphabetically] → TEMPLATE → DATA
 */
async function reorderSheets(
  api: sheets_v4.Sheets,
  spreadsheetId: string,
  schemas: AuroraSchema[],
): Promise<void> {
  // Get all sheets
  const spreadsheet = await api.spreadsheets.get({ spreadsheetId });
  const sheets = spreadsheet.data.sheets || [];

  // Build desired order
  const moduleNames = schemas.map((s) => s.moduleName).sort();
  const desiredOrder = [
    INDEX_SHEET_NAME, // MODULES first
    ...moduleNames, // Module sheets alphabetically
    TEMPLATE_SHEET_NAME, // TEMPLATE
    'DATA', // DATA last
  ];

  // Build reorder requests
  const requests: { updateSheetProperties: object }[] = [];

  for (let i = 0; i < desiredOrder.length; i++) {
    const sheetName = desiredOrder[i];
    const sheet = sheets.find((s) => s.properties?.title === sheetName);

    if (sheet?.properties?.sheetId !== undefined) {
      requests.push({
        updateSheetProperties: {
          properties: {
            sheetId: sheet.properties.sheetId,
            index: i,
          },
          fields: 'index',
        },
      });
    }
  }

  if (requests.length > 0) {
    await api.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests },
    });
  }
}

/**
 * Read headers from the first row of a module sheet
 */
async function readModuleHeaders(
  api: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
): Promise<string[]> {
  const response = await api.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetName}'!1:1`,
  });
  return (response.data.values?.[0] || []) as string[];
}

/**
 * Map a property to a row based on available headers
 * Only includes values for headers that exist in the sheet
 * @param moduleSheetIds - Map of module names to sheet IDs for hyperlinks
 */
function mapPropertyToRow(
  prop: AuroraProperty,
  headers: string[],
  moduleSheetIds: Map<string, number>,
): string[] {
  const propRow = propertyToSheetRow(prop);
  return headers.map((header) => {
    const value = propRow[header as keyof SheetPropertyRow];

    // Special handling for 'master' column - add hyperlink if module exists in this BC
    if (header === 'master' && value) {
      const sheetId = moduleSheetIds.get(value);
      if (sheetId !== undefined) {
        return `=HYPERLINK("#gid=${sheetId}", "${value}")`;
      }
      // Module from another BC - no hyperlink
      return value;
    }

    return value || '';
  });
}

/**
 * Get a map of all sheet names to their IDs in the spreadsheet
 */
async function getSheetIdMap(
  api: sheets_v4.Sheets,
  spreadsheetId: string,
): Promise<Map<string, number>> {
  const spreadsheet = await api.spreadsheets.get({ spreadsheetId });
  const map = new Map<string, number>();

  for (const sheet of spreadsheet.data.sheets || []) {
    const title = sheet.properties?.title;
    const sheetId = sheet.properties?.sheetId;
    if (title && sheetId != null) {
      map.set(title, sheetId);
    }
  }

  return map;
}

/**
 * Update a single module sheet
 * Reads headers from row 1 (never modified) and writes properties from row 2
 * @param moduleSheetIds - Map of module names to sheet IDs for master hyperlinks
 */
async function updateModuleSheet(
  api: sheets_v4.Sheets,
  spreadsheetId: string,
  schema: AuroraSchema,
  moduleSheetIds: Map<string, number>,
): Promise<void> {
  const sheetName = schema.moduleName;

  // Ensure sheet exists (duplicated from TEMPLATE)
  await ensureSheetExists(api, spreadsheetId, sheetName);

  // Read headers from row 1 of the module sheet
  const headers = await readModuleHeaders(api, spreadsheetId, sheetName);

  if (headers.length === 0) {
    throw new Error(
      `No headers found in sheet '${sheetName}'. Please ensure TEMPLATE has headers in row 1.`,
    );
  }

  // Build data rows for properties only (no metadata, no header row)
  const dataRows: string[][] = [];

  // Separate regular properties from pivot-containing properties
  const { regularProperties, pivotProperties } = separatePropertiesAndPivots(
    schema.aggregateProperties || [],
  );

  // Add regular properties
  for (const prop of regularProperties) {
    dataRows.push(mapPropertyToRow(prop, headers, moduleSheetIds));
  }

  // Add pivot-containing properties (simplified, without pivot details in this sheet)
  for (const prop of pivotProperties) {
    const simplified = createPropertyWithoutPivot(prop);
    dataRows.push(mapPropertyToRow(simplified, headers, moduleSheetIds));
  }

  // Calculate last column letter based on headers count
  const lastColumn = String.fromCharCode(64 + headers.length);

  // Clear data rows only (preserve row 1 with headers)
  await api.spreadsheets.values.clear({
    spreadsheetId,
    range: `'${sheetName}'!A2:${lastColumn}`,
  });

  // Write data starting from row 2
  if (dataRows.length > 0) {
    await api.spreadsheets.values.update({
      spreadsheetId,
      range: `'${sheetName}'!A2`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: dataRows },
    });

    // Update filter range to include all data rows
    const moduleSheetId = await getSheetIdByName(api, spreadsheetId, sheetName);
    await api.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          // Clear existing filter
          {
            clearBasicFilter: {
              sheetId: moduleSheetId,
            },
          },
          // Set new filter range including all data rows
          {
            setBasicFilter: {
              filter: {
                range: {
                  sheetId: moduleSheetId,
                  startRowIndex: 0, // Row 1 (headers)
                  endRowIndex: 1 + dataRows.length, // Include all data rows
                  startColumnIndex: 0,
                  endColumnIndex: headers.length,
                },
              },
            },
          },
        ],
      },
    });
  }
}

/**
 * Get the template sheet ID if it exists
 * @returns Template sheet ID or null if not found
 */
async function getTemplateSheetId(
  api: sheets_v4.Sheets,
  spreadsheetId: string,
): Promise<number | null> {
  const spreadsheet = await api.spreadsheets.get({ spreadsheetId });
  const templateSheet = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === TEMPLATE_SHEET_NAME,
  );
  return templateSheet?.properties?.sheetId ?? null;
}

/**
 * Ensure a sheet with the given name exists.
 * If a "_template" sheet exists, duplicates it to preserve formatting.
 * Otherwise, creates a new empty sheet.
 */
async function ensureSheetExists(
  api: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
): Promise<void> {
  const spreadsheet = await api.spreadsheets.get({ spreadsheetId });
  const exists = spreadsheet.data.sheets?.some(
    (s) => s.properties?.title === sheetName,
  );

  if (exists) {
    return;
  }

  // Check if template sheet exists
  const templateSheetId = await getTemplateSheetId(api, spreadsheetId);

  if (templateSheetId !== null) {
    // Duplicate template sheet and rename to new sheet name
    await api.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            duplicateSheet: {
              sourceSheetId: templateSheetId,
              insertSheetIndex: 1,
              newSheetName: sheetName,
            },
          },
        ],
      },
    });
  } else {
    // Create new empty sheet (original behavior)
    await api.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: { title: sheetName },
            },
          },
        ],
      },
    });
  }
}

/**
 * Get sheet ID by name
 */
async function getSheetIdByName(
  api: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
): Promise<number> {
  const spreadsheet = await api.spreadsheets.get({ spreadsheetId });
  const sheet = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === sheetName,
  );
  return sheet?.properties?.sheetId || 0;
}
