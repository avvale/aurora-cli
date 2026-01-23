import * as fs from 'fs-extra';
import { sheets_v4 } from 'googleapis';
import * as yaml from 'js-yaml';
import * as path from 'path';
import { GoogleSheetsAuth } from '../auth/google-auth';
import { SheetsConfigManager } from '../config/sheets-config';
import {
  extractPivotNameFromSeparator,
  isPivotSeparator,
  parsePivotMetadataRows,
} from '../transformers/pivot-transformer';
import { sheetRowToProperty } from '../transformers/property-transformer';
import {
  AuroraPivot,
  AuroraProperty,
  AuroraSchema,
  SheetPropertyRow,
} from '../types';

// Sheets to exclude from module processing (system sheets)
const EXCLUDED_SHEETS = ['DATA', 'TEMPLATE', 'MODULES'];

export interface PullOptions {
  dryRun?: boolean;
  verbose?: boolean;
  backup?: boolean;
  preferYaml?: boolean;
  preferSheet?: boolean;
}

export interface PullResult {
  success: boolean;
  modulesProcessed: number;
  modulesFailed: string[];
  backupPath?: string;
  messages: string[];
}

/**
 * Pull schemas from Google Sheets to YAML files
 */
export async function pullBoundedContext(
  auth: GoogleSheetsAuth,
  config: SheetsConfigManager,
  boundedContextName: string,
  options: PullOptions = {},
): Promise<PullResult> {
  const result: PullResult = {
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

    // Create backup if requested
    if (options.backup !== false) {
      const backupPath = await createBackup(config, boundedContextName);
      result.backupPath = backupPath;
      result.messages.push(`Backup created: ${backupPath}`);
    }

    const sheetsApi = auth.getSheetsApi();

    // Get all sheets in the spreadsheet
    const spreadsheet = await sheetsApi.spreadsheets.get({
      spreadsheetId: bcConfig.spreadsheetId,
    });

    const sheets = spreadsheet.data.sheets || [];
    const moduleSheets = sheets.filter(
      (s) =>
        s.properties?.title && !EXCLUDED_SHEETS.includes(s.properties.title),
    );

    if (options.dryRun) {
      result.messages.push(
        `[DRY RUN] Would pull ${moduleSheets.length} modules from spreadsheet`,
      );
      result.modulesProcessed = moduleSheets.length;
      return result;
    }

    // Ensure output directory exists
    await fs.ensureDir(bcPath);

    // Process each module sheet
    for (const sheet of moduleSheets) {
      const sheetName = sheet.properties!.title!;

      try {
        // Try to read existing YAML to preserve metadata and fields not in spreadsheet
        const existingFilePath = path.join(bcPath, `${sheetName}.aurora.yaml`);
        let existingSchema: AuroraSchema | undefined;
        let existingYamlContent: string | undefined;

        if (await fs.pathExists(existingFilePath)) {
          existingYamlContent = await fs.readFile(existingFilePath, 'utf-8');
          existingSchema = yaml.load(existingYamlContent) as AuroraSchema;
        }

        const schema = await readModuleSheet(
          sheetsApi,
          bcConfig.spreadsheetId,
          sheetName,
          existingSchema,
        );

        if (!schema) {
          result.messages.push(`⚠ Skipped: ${sheetName} (empty or invalid)`);
          continue;
        }

        // Write YAML file
        const filePath = path.join(bcPath, `${sheetName}.aurora.yaml`);

        // Ensure descriptions end with newline for proper YAML folded style (> instead of >-)
        normalizeDescriptions(schema);

        // Use large lineWidth to avoid re-wrapping existing descriptions
        // New descriptions will have their original wrapping from the spreadsheet
        let yamlContent = yaml.dump(schema, {
          indent: 2,
          lineWidth: 500,
          noRefs: true,
          sortKeys: false,
          quotingType: '"',
        });

        // Convert multiline arrays to inline format for specific keys (enumOptions, decimals, excludedOperations, etc.)
        yamlContent = convertArraysToInlineFormat(yamlContent);

        // Restore original descriptions from existing YAML if content matches
        if (existingYamlContent && existingSchema) {
          yamlContent = restoreOriginalDescriptions(
            yamlContent,
            existingYamlContent,
            schema,
            existingSchema,
          );
        }

        // Ensure file ends with newline
        if (!yamlContent.endsWith('\n')) {
          yamlContent += '\n';
        }

        // Check if content actually changed (ignore formatting differences)
        if (existingYamlContent) {
          const existingNormalized =
            normalizeYamlForComparison(existingYamlContent);
          const newNormalized = normalizeYamlForComparison(yamlContent);

          if (existingNormalized === newNormalized) {
            // No content changes, skip writing to preserve original formatting
            result.modulesProcessed++;
            result.messages.push(`✓ Pulled: ${sheetName} (no changes)`);
            continue;
          }
        }

        await fs.writeFile(filePath, yamlContent, 'utf-8');
        result.modulesProcessed++;
        result.messages.push(`✓ Pulled: ${sheetName}`);
      } catch (error) {
        const err = error as Error;
        result.modulesFailed.push(sheetName);
        result.messages.push(`✗ Failed: ${sheetName} - ${err.message}`);
        result.success = false;
      }
    }
  } catch (error) {
    const err = error as Error;
    result.success = false;
    result.messages.push(`Error: ${err.message}`);
  }

  return result;
}

/**
 * Read a single module sheet and convert to AuroraSchema
 * New structure: Row 1 = headers, Row 2+ = properties
 * Metadata comes from existing YAML file
 */
async function readModuleSheet(
  api: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
  existingSchema?: AuroraSchema,
): Promise<AuroraSchema | null> {
  // Read all data from the sheet
  const response = await api.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetName}'!A:Z`,
  });

  const rows = response.data.values || [];
  if (rows.length < 2) return null; // Need at least headers + 1 property

  // Row 0 = headers, Row 1+ = properties
  const headers = rows[0] as (keyof SheetPropertyRow)[];

  // Validate headers
  if (!headers.includes('name') || !headers.includes('type')) {
    return null;
  }

  // Parse properties from row 1 onwards
  const properties: AuroraProperty[] = [];
  const pivots = new Map<string, AuroraPivot>();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    // Skip empty rows
    if (!row[0]?.trim()) continue;

    // Check for pivot separator
    if (isPivotSeparator(row)) {
      const pivotName = extractPivotNameFromSeparator(row);
      if (pivotName) {
        const { pivot, endIdx } = parsePivotSection(rows, i);
        if (pivot) {
          pivots.set(pivotName, pivot);
        }
        i = endIdx - 1; // -1 because loop will increment
      }
      continue;
    }

    // Parse property row
    const propObj: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      propObj[headers[j]] = row[j] || '';
    }

    const sheetProperty = sheetRowToProperty(
      propObj as unknown as SheetPropertyRow,
    );

    // Merge with existing property to preserve fields not in spreadsheet
    if (existingSchema) {
      const existingProp = existingSchema.aggregateProperties?.find(
        (p) => p.name === sheetProperty.name,
      );
      if (existingProp) {
        // Preserve fields from existing that aren't handled by spreadsheet
        const merged = mergeProperties(existingProp, sheetProperty, headers);
        properties.push(merged);
      } else {
        properties.push(sheetProperty);
      }
    } else {
      properties.push(sheetProperty);
    }
  }

  // Build schema using existing metadata or defaults
  const schema: AuroraSchema = existingSchema
    ? {
        ...existingSchema,
        aggregateProperties: properties,
      }
    : {
        version: '0.0.1',
        boundedContextName: '',
        moduleName: sheetName,
        moduleNames: sheetName + 's',
        aggregateName: toPascalCase(sheetName),
        aggregateProperties: properties,
      };

  // Preserve exact description format from existing schema if content is same
  if (existingSchema?.description && schema.description) {
    const existingNorm = normalizeText(existingSchema.description);
    const currentNorm = normalizeText(schema.description);
    if (existingNorm === currentNorm) {
      schema.description = existingSchema.description;
    }
  }

  // Merge pivot data back into relationships
  mergePivotsIntoProperties(schema.aggregateProperties, pivots);

  return schema;
}

/**
 * Convert multiline arrays to inline format for specific keys
 * This matches the original YAML format used in Aurora schemas
 */
function convertArraysToInlineFormat(yamlContent: string): string {
  // Keys that should have inline array format
  // Note: excludedOperations and excludedFiles are kept multi-line for readability
  const inlineArrayKeys = ['enumOptions', 'decimals', 'defaultValue'];

  const lines = yamlContent.split('\n');
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if this line is a key that should have inline array
    let foundKey = false;
    for (const key of inlineArrayKeys) {
      if (trimmed === `${key}:` || trimmed.startsWith(`${key}: `)) {
        // Check if next line starts an array
        if (i + 1 < lines.length && lines[i + 1].trim().startsWith('- ')) {
          // Calculate the expected indentation for array items
          // Key is at some indent, array items should be at indent + 2
          const keyIndent = line.length - line.trimStart().length;
          const expectedArrayItemIndent = keyIndent + 2;

          // Collect array items only at the expected indentation level
          const items: string[] = [];
          let j = i + 1;

          while (j < lines.length) {
            const arrayLine = lines[j];
            const arrayTrimmed = arrayLine.trim();

            // Check indentation of this line
            const lineIndent = arrayLine.length - arrayLine.trimStart().length;

            if (
              arrayTrimmed.startsWith('- ') &&
              lineIndent === expectedArrayItemIndent
            ) {
              items.push(arrayTrimmed.substring(2).trim());
              j++;
            } else if (arrayTrimmed === '') {
              j++;
            } else {
              // Different indentation or not an array item - stop
              break;
            }
          }

          // Write inline array
          result.push(`${' '.repeat(keyIndent)}${key}: [${items.join(', ')}]`);
          i = j;
          foundKey = true;
          break;
        }
      }
    }

    if (!foundKey) {
      result.push(line);
      i++;
    }
  }

  return result.join('\n');
}

/**
 * Normalize descriptions in schema to ensure proper YAML folded style
 * Adds trailing newline so yaml.dump uses '>' instead of '>-'
 */
function normalizeDescriptions(schema: AuroraSchema): void {
  // Normalize module description
  if (schema.description && !schema.description.endsWith('\n')) {
    schema.description = schema.description + '\n';
  }

  // Normalize property descriptions
  for (const prop of schema.aggregateProperties || []) {
    if (prop.description && !prop.description.endsWith('\n')) {
      prop.description = prop.description + '\n';
    }
  }
}

/**
 * Restore original description blocks from existing YAML if content matches
 * This bypasses yaml.dump's reformatting for descriptions that haven't changed
 */
function restoreOriginalDescriptions(
  newYaml: string,
  existingYaml: string,
  newSchema: AuroraSchema,
  existingSchema: AuroraSchema,
): string {
  let result = newYaml;

  // Build map of property descriptions from existing YAML
  const existingDescriptions = extractDescriptionBlocks(existingYaml);

  // Restore module-level description if content matches
  if (newSchema.description && existingSchema.description) {
    const newNorm = normalizeText(newSchema.description);
    const existNorm = normalizeText(existingSchema.description);

    if (newNorm === existNorm && existingDescriptions.has('__module__')) {
      const newBlock = extractModuleDescriptionBlock(result);
      const existBlock = existingDescriptions.get('__module__');
      if (newBlock && existBlock) {
        result = result.replace(newBlock, existBlock);
      }
    }
  }

  // Restore property descriptions if content matches
  for (const prop of newSchema.aggregateProperties || []) {
    if (!prop.description) continue;

    const newNorm = normalizeText(prop.description);

    // First try to match by property name
    let existingProp = existingSchema.aggregateProperties?.find(
      (p) => p.name === prop.name,
    );

    // If no match by name, try to find by normalized description content
    if (!existingProp?.description) {
      existingProp = existingSchema.aggregateProperties?.find(
        (p) => p.description && normalizeText(p.description) === newNorm,
      );
    }

    if (!existingProp?.description) continue;

    const existNorm = normalizeText(existingProp.description);

    if (newNorm === existNorm && existingDescriptions.has(existingProp.name)) {
      const newBlock = extractPropertyDescriptionBlock(result, prop.name);
      const existBlock = existingDescriptions.get(existingProp.name);
      if (newBlock && existBlock) {
        // Adjust the existing block to use the new property name's indentation
        result = result.replace(newBlock, existBlock);
      }
    }
  }

  return result;
}

/**
 * Extract all description blocks from YAML content
 * Returns map of property name (or '__module__' for module description) to description block
 */
function extractDescriptionBlocks(yamlContent: string): Map<string, string> {
  const blocks = new Map<string, string>();
  const lines = yamlContent.split('\n');

  // Find module-level description
  const moduleBlock = extractModuleDescriptionBlock(yamlContent);
  if (moduleBlock) {
    blocks.set('__module__', moduleBlock);
  }

  // Find property descriptions
  let currentPropName: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect property name (format: "  - name: propName")
    const propMatch = line.match(/^\s{2}- name:\s*(.+)$/);
    if (propMatch) {
      currentPropName = propMatch[1].trim();
      continue;
    }

    // Detect description start for current property (format: "    description: >")
    if (currentPropName && line.match(/^\s{4}description:\s*[>|][-+]?\s*$/)) {
      // Collect the full description block
      let block = line + '\n';
      let j = i + 1;

      // Description content has 6 spaces indentation
      while (j < lines.length) {
        const contentLine = lines[j];
        // Check if still part of description (6+ spaces or empty line within description)
        if (contentLine.match(/^\s{6}/) || contentLine.trim() === '') {
          block += contentLine + '\n';
          j++;
        } else {
          break;
        }
      }

      // Remove trailing empty lines but keep the last newline
      block = block.replace(/\n+$/, '\n');
      blocks.set(currentPropName, block);
    }
  }

  return blocks;
}

/**
 * Extract module-level description block from YAML
 */
function extractModuleDescriptionBlock(yamlContent: string): string | null {
  const lines = yamlContent.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Module description is at root level: "description: >"
    if (line.match(/^description:\s*[>|][-+]?\s*$/)) {
      let block = line + '\n';
      let j = i + 1;

      // Module description content has 2 spaces indentation
      while (j < lines.length) {
        const contentLine = lines[j];
        if (contentLine.match(/^\s{2}\S/) && !contentLine.match(/^\s{2}-/)) {
          // Part of the description (2 spaces + content, not a list item)
          block += contentLine + '\n';
          j++;
        } else if (contentLine.trim() === '') {
          // Empty line might be part of description
          j++;
        } else {
          break;
        }
      }

      block = block.replace(/\n+$/, '\n');
      return block;
    }
  }

  return null;
}

/**
 * Extract a specific property's description block from YAML
 */
function extractPropertyDescriptionBlock(
  yamlContent: string,
  propName: string,
): string | null {
  const lines = yamlContent.split('\n');
  let foundProp = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Find the property
    const propMatch = line.match(/^\s{2}- name:\s*(.+)$/);
    if (propMatch && propMatch[1].trim() === propName) {
      foundProp = true;
      continue;
    }

    // If we found the property and now see another property, stop
    if (foundProp && line.match(/^\s{2}- name:/)) {
      return null;
    }

    // Find description within the property
    if (foundProp && line.match(/^\s{4}description:\s*[>|][-+]?\s*$/)) {
      let block = line + '\n';
      let j = i + 1;

      while (j < lines.length) {
        const contentLine = lines[j];
        if (contentLine.match(/^\s{6}/) || contentLine.trim() === '') {
          block += contentLine + '\n';
          j++;
        } else {
          break;
        }
      }

      block = block.replace(/\n+$/, '\n');
      return block;
    }
  }

  return null;
}

/**
 * Convert kebab-case to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Map of spreadsheet headers to AuroraProperty field names
 * Used to determine which fields should be overwritten from spreadsheet
 */
const HEADER_TO_PROPERTY_FIELD: Record<string, keyof AuroraProperty> = {
  name: 'name',
  type: 'type',
  primaryKey: 'primaryKey',
  nullable: 'nullable',
  index: 'index',
  indexUsing: 'indexUsing',
  maxLength: 'maxLength',
  decimals: 'decimals',
  defaultValue: 'defaultValue',
  enumOptions: 'enumOptions',
  autoIncrement: 'autoIncrement',
  isI18n: 'isI18n',
  example: 'example',
  description: 'description',
  // Array options handled separately
  subtype: 'arrayOptions',
  values: 'enumOptions', // or arrayOptions.enumOptions or decimals
  'arrayOptions.type': 'arrayOptions',
  'arrayOptions.maxLength': 'arrayOptions',
  'arrayOptions.enumOptions': 'arrayOptions',
  // Relationship handled separately
  relationship: 'relationship',
  master: 'relationship',
  'rel.type': 'relationship',
  'rel.singularName': 'relationship',
  'rel.aggregateName': 'relationship',
  'rel.modulePath': 'relationship',
  'rel.key': 'relationship',
  'rel.field': 'relationship',
  'rel.avoidConstraint': 'relationship',
};

/**
 * Normalize text for comparison (remove extra whitespace, newlines)
 */
function normalizeText(text: string | undefined): string {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Normalize YAML content for comparison
 * Parses the YAML and re-dumps with consistent formatting to compare content
 */
function normalizeYamlForComparison(content: string): string {
  try {
    const parsed = yaml.load(content);
    // Dump with consistent, minimal formatting for comparison
    return yaml.dump(parsed, {
      indent: 2,
      lineWidth: -1, // No line wrapping
      noRefs: true,
      sortKeys: true, // Sort keys for consistent comparison
    });
  } catch {
    return content;
  }
}

/**
 * Compare two defaultValue values for equivalence
 * Handles different representations: array vs string, boolean vs string, etc.
 */
function areDefaultValuesEquivalent(
  existing: unknown,
  fromSheet: unknown,
): boolean {
  // Normalize both values to comparable format
  const normalizeValue = (val: unknown): string => {
    if (val === undefined || val === null) return '';
    if (Array.isArray(val)) {
      // Array like ["OTHER"] -> "OTHER" for comparison
      return val.map(String).join(',').toUpperCase();
    }
    if (typeof val === 'boolean') {
      return val ? 'TRUE' : 'FALSE';
    }
    return String(val).toUpperCase().trim();
  };

  return normalizeValue(existing) === normalizeValue(fromSheet);
}

/**
 * Merge existing property with sheet property
 * Preserves fields from existing that don't have a corresponding column in the sheet
 * Preserves exact description format if content is the same
 */
function mergeProperties(
  existing: AuroraProperty,
  fromSheet: AuroraProperty,
  headers: string[],
): AuroraProperty {
  // Start with existing property
  const merged: AuroraProperty = { ...existing };

  // Determine which top-level fields are controlled by the spreadsheet
  const sheetControlledFields = new Set<keyof AuroraProperty>();
  for (const header of headers) {
    const field = HEADER_TO_PROPERTY_FIELD[header];
    if (field) {
      sheetControlledFields.add(field);
    }
  }

  // Override fields that are controlled by the spreadsheet
  for (const field of sheetControlledFields) {
    if (field === 'arrayOptions') {
      // Special handling for arrayOptions - merge if both exist
      if (fromSheet.arrayOptions) {
        merged.arrayOptions = fromSheet.arrayOptions;
      } else if (
        headers.includes('subtype') ||
        headers.includes('arrayOptions.type')
      ) {
        // Sheet has array columns but no array data - remove from merged
        delete merged.arrayOptions;
      }
    } else if (field === 'relationship') {
      // Special handling for relationship - deep merge to preserve fields not in spreadsheet
      if (fromSheet.relationship) {
        if (existing.relationship) {
          // Merge: keep existing fields, override with sheet fields that have values
          merged.relationship = {
            ...existing.relationship,
            ...Object.fromEntries(
              Object.entries(fromSheet.relationship).filter(
                ([, v]) => v !== undefined && v !== null && v !== '',
              ),
            ),
          };
        } else {
          merged.relationship = fromSheet.relationship;
        }
      } else if (
        headers.includes('relationship') ||
        headers.includes('rel.type')
      ) {
        // Sheet has relationship columns but no relationship data - keep existing if any
        // Only remove if existing didn't have relationship either
        if (!existing.relationship) {
          delete merged.relationship;
        }
      }
    } else if (field === 'description') {
      // Special handling for description - preserve exact format if content is same
      const existingNorm = normalizeText(existing.description);
      const sheetNorm = normalizeText(fromSheet.description);
      if (existingNorm === sheetNorm && existing.description) {
        // Content is the same, keep original formatting
        merged.description = existing.description;
      } else if (fromSheet.description) {
        // Content changed, use new description
        merged.description = fromSheet.description;
      }
    } else if (field === 'defaultValue') {
      // Special handling for defaultValue - preserve original format if content is equivalent
      if (
        existing.defaultValue !== undefined &&
        fromSheet.defaultValue !== undefined
      ) {
        if (
          areDefaultValuesEquivalent(
            existing.defaultValue,
            fromSheet.defaultValue,
          )
        ) {
          // Content is equivalent, keep original format (array, boolean, string, etc.)
          merged.defaultValue = existing.defaultValue;
        } else {
          // Content changed, use new value
          merged.defaultValue = fromSheet.defaultValue;
        }
      } else if (fromSheet.defaultValue !== undefined) {
        merged.defaultValue = fromSheet.defaultValue;
      }
      // If sheet value is undefined/empty, preserve existing value
    } else {
      // For simple fields, take the sheet value if it has a value
      const sheetValue = fromSheet[field];
      if (sheetValue !== undefined) {
        (merged as unknown as Record<string, unknown>)[field] = sheetValue;
      }
      // If sheet value is undefined/empty, preserve existing value (don't delete)
    }
  }

  return merged;
}

/**
 * Parse a pivot section from rows
 */
function parsePivotSection(
  rows: string[][],
  startIdx: number,
): { pivot: AuroraPivot | null; endIdx: number } {
  const pivotName = extractPivotNameFromSeparator(rows[startIdx]);
  if (!pivotName) return { pivot: null, endIdx: startIdx + 1 };

  let i = startIdx + 1;
  const metadataRows: string[][] = [];
  let headerIdx = -1;

  // Collect metadata rows until we hit the property headers
  while (i < rows.length) {
    const row = rows[i];

    if (row[0] === 'name' && row[1] === 'type') {
      headerIdx = i;
      break;
    }

    if (row[0]?.trim() && !isPivotSeparator(row)) {
      metadataRows.push(row);
    }

    i++;
  }

  if (headerIdx === -1) return { pivot: null, endIdx: i };

  // Parse metadata
  const metadata = parsePivotMetadataRows(metadataRows);

  // Parse pivot properties
  const pivotProperties: AuroraProperty[] = [];
  const headers = rows[headerIdx] as (keyof SheetPropertyRow)[];
  i = headerIdx + 1;

  while (i < rows.length) {
    const row = rows[i];

    // Stop at next pivot or empty section
    if (isPivotSeparator(row) || (!row[0]?.trim() && !row[1]?.trim())) {
      break;
    }

    if (row[0]?.trim()) {
      const propObj: Record<string, string> = {};
      for (let j = 0; j < headers.length; j++) {
        propObj[headers[j]] = row[j] || '';
      }
      pivotProperties.push(
        sheetRowToProperty(propObj as unknown as SheetPropertyRow),
      );
    }

    i++;
  }

  const pivot: AuroraPivot = {
    boundedContextName: metadata.boundedContextName || '',
    moduleName: metadata.moduleName || pivotName,
    moduleNames: metadata.moduleNames || '',
    aggregateName: metadata.aggregateName || '',
    hasOAuth: metadata.hasOAuth,
    hasTenant: metadata.hasTenant,
    hasAuditing: metadata.hasAuditing,
    aggregateProperties: pivotProperties,
  };

  return { pivot, endIdx: i };
}

/**
 * Merge pivot data back into many-to-many relationship properties
 */
function mergePivotsIntoProperties(
  properties: AuroraProperty[],
  pivots: Map<string, AuroraPivot>,
): void {
  for (const prop of properties) {
    if (
      prop.relationship?.type === 'many-to-many' &&
      !prop.relationship.pivot
    ) {
      // Try to find matching pivot by conventional naming
      const possiblePivotNames = [
        `${prop.name}-${prop.relationship.aggregateName?.toLowerCase()}`,
        `${prop.relationship.aggregateName?.toLowerCase()}-${prop.name}`,
      ];

      for (const pivotName of possiblePivotNames) {
        const pivot = pivots.get(pivotName);
        if (pivot) {
          prop.relationship.pivot = pivot;
          break;
        }
      }

      // Also try direct match on modulePath hint
      for (const [name, pivot] of pivots) {
        if (
          pivot.aggregateProperties?.some(
            (p) => p.relationship?.modulePath === prop.relationship?.modulePath,
          )
        ) {
          prop.relationship.pivot = pivot;
          break;
        }
      }
    }
  }
}

/**
 * Create a backup of existing YAML files
 */
async function createBackup(
  config: SheetsConfigManager,
  boundedContextName: string,
): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupsPath = config.getBackupsPath();
  const backupDir = path.join(backupsPath, boundedContextName, timestamp);

  const cliterPath = config.getCliterPath();
  const sourcePath = path.join(cliterPath, boundedContextName);

  if (await fs.pathExists(sourcePath)) {
    await fs.ensureDir(backupDir);
    await fs.copy(sourcePath, backupDir);
  }

  return backupDir;
}

/**
 * Get list of module names from a spreadsheet
 */
export async function listModulesInSheet(
  auth: GoogleSheetsAuth,
  spreadsheetId: string,
): Promise<string[]> {
  const sheetsApi = auth.getSheetsApi();
  const spreadsheet = await sheetsApi.spreadsheets.get({ spreadsheetId });

  return (spreadsheet.data.sheets || [])
    .map((s) => s.properties?.title)
    .filter(
      (title): title is string => !!title && !EXCLUDED_SHEETS.includes(title),
    );
}
