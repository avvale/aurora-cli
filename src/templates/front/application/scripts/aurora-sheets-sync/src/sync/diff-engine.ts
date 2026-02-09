import * as crypto from 'crypto';
import { AuroraProperty, AuroraSchema } from '../types';

export interface PropertyDiff {
  name: string;
  type: 'added' | 'removed' | 'modified';
  yamlValue?: AuroraProperty;
  sheetValue?: AuroraProperty;
  changes?: Record<string, { yaml: unknown; sheet: unknown }>;
}

export interface SchemaDiff {
  moduleName: string;
  hasChanges: boolean;
  metadataChanges: Record<string, { yaml: unknown; sheet: unknown }>;
  propertiesAdded: PropertyDiff[];
  propertiesRemoved: PropertyDiff[];
  propertiesModified: PropertyDiff[];
  pivotsChanged: string[];
}

/**
 * Generate MD5 hash for a property to detect changes
 */
export function hashProperty(property: AuroraProperty): string {
  const normalized = normalizeProperty(property);
  const json = JSON.stringify(normalized, Object.keys(normalized).sort());
  return crypto.createHash('md5').update(json).digest('hex');
}

/**
 * Normalize a property for comparison (remove undefined values, sort keys)
 */
function normalizeProperty(property: AuroraProperty): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(property)) {
    if (value === undefined || value === null || value === '') continue;

    if (typeof value === 'object' && !Array.isArray(value)) {
      // Recursively normalize nested objects
      const nestedNormalized: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        if (v !== undefined && v !== null && v !== '') {
          nestedNormalized[k] = v;
        }
      }
      if (Object.keys(nestedNormalized).length > 0) {
        normalized[key] = nestedNormalized;
      }
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        normalized[key] = value;
      }
    } else {
      normalized[key] = value;
    }
  }

  return normalized;
}

/**
 * Compare two schemas and return the differences
 */
export function diffSchemas(
  yamlSchema: AuroraSchema,
  sheetSchema: AuroraSchema,
): SchemaDiff {
  const diff: SchemaDiff = {
    moduleName: yamlSchema.moduleName,
    hasChanges: false,
    metadataChanges: {},
    propertiesAdded: [],
    propertiesRemoved: [],
    propertiesModified: [],
    pivotsChanged: [],
  };

  // Compare metadata
  const metadataKeys: (keyof AuroraSchema)[] = [
    'version',
    'moduleName',
    'moduleNames',
    'aggregateName',
    'boundedContextName',
    'hasOAuth',
    'hasTenant',
    'hasAuditing',
    'description',
  ];

  for (const key of metadataKeys) {
    const yamlVal = yamlSchema[key];
    const sheetVal = sheetSchema[key];

    if (normalizeValue(yamlVal) !== normalizeValue(sheetVal)) {
      diff.metadataChanges[key] = { yaml: yamlVal, sheet: sheetVal };
      diff.hasChanges = true;
    }
  }

  // Compare properties
  const yamlProps = new Map<string, AuroraProperty>();
  const sheetProps = new Map<string, AuroraProperty>();

  for (const prop of yamlSchema.aggregateProperties || []) {
    yamlProps.set(prop.name, prop);
  }

  for (const prop of sheetSchema.aggregateProperties || []) {
    sheetProps.set(prop.name, prop);
  }

  // Find added properties (in sheet but not in YAML)
  for (const [name, sheetProp] of sheetProps) {
    if (!yamlProps.has(name)) {
      diff.propertiesAdded.push({
        name,
        type: 'added',
        sheetValue: sheetProp,
      });
      diff.hasChanges = true;
    }
  }

  // Find removed properties (in YAML but not in sheet)
  for (const [name, yamlProp] of yamlProps) {
    if (!sheetProps.has(name)) {
      diff.propertiesRemoved.push({
        name,
        type: 'removed',
        yamlValue: yamlProp,
      });
      diff.hasChanges = true;
    }
  }

  // Find modified properties
  for (const [name, yamlProp] of yamlProps) {
    const sheetProp = sheetProps.get(name);
    if (!sheetProp) continue;

    const yamlHash = hashProperty(yamlProp);
    const sheetHash = hashProperty(sheetProp);

    if (yamlHash !== sheetHash) {
      const changes = findPropertyChanges(yamlProp, sheetProp);
      diff.propertiesModified.push({
        name,
        type: 'modified',
        yamlValue: yamlProp,
        sheetValue: sheetProp,
        changes,
      });
      diff.hasChanges = true;
    }
  }

  return diff;
}

/**
 * Find specific changes between two property versions
 */
function findPropertyChanges(
  yamlProp: AuroraProperty,
  sheetProp: AuroraProperty,
): Record<string, { yaml: unknown; sheet: unknown }> {
  const changes: Record<string, { yaml: unknown; sheet: unknown }> = {};

  const allKeys = new Set([
    ...Object.keys(yamlProp),
    ...Object.keys(sheetProp),
  ]);

  for (const key of allKeys) {
    const yamlVal = (yamlProp as unknown as Record<string, unknown>)[key];
    const sheetVal = (sheetProp as unknown as Record<string, unknown>)[key];

    if (normalizeValue(yamlVal) !== normalizeValue(sheetVal)) {
      changes[key] = { yaml: yamlVal, sheet: sheetVal };
    }
  }

  return changes;
}

/**
 * Normalize a value for comparison
 */
function normalizeValue(value: unknown): string {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/**
 * Format diff for display
 */
export function formatDiff(diff: SchemaDiff): string {
  const lines: string[] = [];

  if (!diff.hasChanges) {
    lines.push(`✓ ${diff.moduleName}: No changes detected`);
    return lines.join('\n');
  }

  lines.push(`\n═══ ${diff.moduleName} ═══`);

  // Metadata changes
  if (Object.keys(diff.metadataChanges).length > 0) {
    lines.push('\nMetadata Changes:');
    for (const [key, { yaml, sheet }] of Object.entries(diff.metadataChanges)) {
      lines.push(`  ${key}:`);
      lines.push(`    YAML:  ${formatValue(yaml)}`);
      lines.push(`    Sheet: ${formatValue(sheet)}`);
    }
  }

  // Added properties
  if (diff.propertiesAdded.length > 0) {
    lines.push('\n+ Added Properties (in Sheet, not in YAML):');
    for (const prop of diff.propertiesAdded) {
      lines.push(`  + ${prop.name} (${prop.sheetValue?.type})`);
    }
  }

  // Removed properties
  if (diff.propertiesRemoved.length > 0) {
    lines.push('\n- Removed Properties (in YAML, not in Sheet):');
    for (const prop of diff.propertiesRemoved) {
      lines.push(`  - ${prop.name} (${prop.yamlValue?.type})`);
    }
  }

  // Modified properties
  if (diff.propertiesModified.length > 0) {
    lines.push('\n~ Modified Properties:');
    for (const prop of diff.propertiesModified) {
      lines.push(`  ~ ${prop.name}:`);
      if (prop.changes) {
        for (const [key, { yaml, sheet }] of Object.entries(prop.changes)) {
          lines.push(
            `      ${key}: "${formatValue(yaml)}" → "${formatValue(sheet)}"`,
          );
        }
      }
    }
  }

  return lines.join('\n');
}

function formatValue(value: unknown): string {
  if (value === undefined || value === null) return '(empty)';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/**
 * Generate summary of all module diffs
 */
export function formatDiffSummary(diffs: SchemaDiff[]): string {
  const lines: string[] = [];
  const changed = diffs.filter((d) => d.hasChanges);
  const unchanged = diffs.filter((d) => !d.hasChanges);

  lines.push('\n══════════════════════════════════════');
  lines.push('           DIFF SUMMARY');
  lines.push('══════════════════════════════════════\n');

  lines.push(`Total modules: ${diffs.length}`);
  lines.push(`Changed: ${changed.length}`);
  lines.push(`Unchanged: ${unchanged.length}`);

  if (changed.length > 0) {
    lines.push('\nModules with changes:');
    for (const diff of changed) {
      const adds = diff.propertiesAdded.length;
      const removes = diff.propertiesRemoved.length;
      const mods = diff.propertiesModified.length;
      const meta = Object.keys(diff.metadataChanges).length;

      const parts: string[] = [];
      if (adds) parts.push(`+${adds}`);
      if (removes) parts.push(`-${removes}`);
      if (mods) parts.push(`~${mods}`);
      if (meta) parts.push(`meta:${meta}`);

      lines.push(`  • ${diff.moduleName}: ${parts.join(', ')}`);
    }
  }

  return lines.join('\n');
}
