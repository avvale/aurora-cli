# Aurora Sheets Sync - Technical Context

## Purpose

Herramienta de sincronización bidireccional entre schemas Aurora YAML (`.aurora.yaml`) y Google Sheets. Permite edición colaborativa de schemas en formato tabular.

## Architecture

```
scripts/aurora-sheets-sync/
├── src/
│   ├── index.ts                 # CLI entry point (commander)
│   ├── types.ts                 # TypeScript interfaces and constants
│   ├── auth/
│   │   └── google-auth.ts       # Google Sheets API authentication
│   ├── config/
│   │   └── sheets-config.ts     # Configuration management
│   ├── sync/
│   │   ├── yaml-to-sheet.ts     # Push: YAML → Google Sheets
│   │   ├── sheet-to-yaml.ts     # Pull: Google Sheets → YAML
│   │   └── diff-engine.ts       # Comparison utilities
│   ├── transformers/
│   │   ├── property-transformer.ts  # Property ↔ Row conversion
│   │   ├── relationship-transformer.ts
│   │   └── pivot-transformer.ts     # Many-to-many pivot handling
│   └── validators/
│       └── schema-validator.ts
├── credentials/
│   └── service-account.json     # Google credentials (gitignored)
├── aurora-sheets.config.json    # Runtime config (gitignored)
└── aurora-sheets.config.example.json
```

## Data Flow

### Push (YAML → Sheet)

```
┌──────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  .aurora.yaml    │ ──► │ AuroraSchema    │ ──► │ Google Sheets   │
│  (file system)   │     │ (in memory)     │     │ (API)           │
└──────────────────┘     └─────────────────┘     └─────────────────┘
        │                        │                       │
        │                        ▼                       │
        │               propertyToSheetRow()             │
        │               - Transforms each property       │
        │               - Maps relationship types        │
        │               - Formats booleans as ✓          │
        │                        │                       │
        │                        ▼                       │
        │               updateModuleSheet()              │
        │               - Creates sheet if not exists    │
        │               - Writes headers + data rows     │
        └────────────────────────┴───────────────────────┘
```

### Pull (Sheet → YAML)

```
┌─────────────────┐     ┌─────────────────┐     ┌──────────────────┐
│ Google Sheets   │ ──► │ AuroraSchema    │ ──► │  .aurora.yaml    │
│ (API)           │     │ (in memory)     │     │  (file system)   │
└─────────────────┘     └─────────────────┘     └──────────────────┘
        │                       │                        │
        │                       ▼                        │
        │              readModuleSheet()                 │
        │              - Reads headers from row 1        │
        │              - Parses properties from row 2+   │
        │                       │                        │
        │                       ▼                        │
        │              sheetRowToProperty()              │
        │              - Transforms each row             │
        │              - Parses booleans (✓/TRUE)        │
        │                       │                        │
        │                       ▼                        │
        │              mergeProperties()                 │
        │              - Preserves fields not in sheet   │
        │              - Deep merge for relationships    │
        │                       │                        │
        │                       ▼                        │
        │              normalizeYamlForComparison()      │
        │              - Skip write if no content change │
        └───────────────────────┴────────────────────────┘
```

---

## Spreadsheet Structure

### System Sheets (excluded from sync)

| Sheet | Purpose |
|-------|---------|
| `DATA` | Dropdown values, validations (don't modify) |
| `TEMPLATE` | Template for new modules (duplicated on push) |
| `MODULES` | Index of all modules with hyperlinks |

### MODULES Sheet (Index)

Headers are read dynamically from row 1. Common headers:

| Header | Schema Path | Notes |
|--------|-------------|-------|
| `moduleName` | `moduleName` | HYPERLINK to module sheet |
| `hasAuth` | `hasOAuth` | Mapped via `HEADER_TO_SCHEMA_MAP` |
| `hasTenant` | `hasTenant` | |
| `front:outlineIcon` | `front.outlineIcon` | Uses `:` for nested paths |
| `front:solidIcon` | `front.solidIcon` | |
| `description` | `description` | |

**Boolean format**: `✓` (CHAR 9989) = true, empty = false

### Module Sheets

Row 1: Headers (dynamic, read from sheet)
Row 2+: Properties

---

## Field Mappings

### Property Headers

Defined in `types.ts` as `PROPERTY_HEADERS`:

```typescript
[
  'name', 'type', 'primaryKey', 'nullable', 'index', 'indexUsing',
  'maxLength', 'decimals', 'defaultValue', 'enumOptions',
  'arrayOptions.type', 'arrayOptions.maxLength', 'arrayOptions.enumOptions',
  'rel.type', 'rel.singularName', 'rel.aggregateName', 'rel.modulePath',
  'rel.key', 'rel.field', 'rel.avoidConstraint',
  'autoIncrement', 'isI18n', 'example', 'description'
]
```

### Relationship Type Mapping

| YAML | Sheet |
|------|-------|
| `one-to-one` | `1:1` |
| `many-to-one` | `N:1` |
| `one-to-many` | `1:N` |
| `many-to-many` | `N:N` |

### Boolean Mapping

| YAML | Sheet (write) | Sheet (read accepts) |
|------|---------------|----------------------|
| `true` | `✓` | `✓`, `TRUE`, `true` |
| `false` | (empty) | (empty), `FALSE`, `false` |

### Simplified Columns

The spreadsheet uses simplified columns that map to YAML fields:

| Sheet Column | YAML Field | Notes |
|--------------|------------|-------|
| `subtype` | `arrayOptions.type` | Only when `type=array` |
| `values` | Multiple | `enumOptions` for enum, `decimals` for decimal, `arrayOptions.enumOptions` for array+enum |
| `relationship` | `relationship.type` | Uses `1:1`, `N:1`, etc. format |
| `master` | `relationship.modulePath` | Extracted module name only |

---

## Critical Rules

### 1. Idempotency (Pull)

**Rule**: If no content changes in spreadsheet, YAML files must not be modified.

**Implementation** (`sheet-to-yaml.ts`):
```typescript
// Compare normalized content before writing
const existingNormalized = normalizeYamlForComparison(existingYamlContent);
const newNormalized = normalizeYamlForComparison(yamlContent);

if (existingNormalized === newNormalized) {
  // Skip write - preserves original formatting
  continue;
}
```

### 2. Preserve Fields Not in Spreadsheet

**Rule**: Fields in YAML that don't have corresponding spreadsheet columns must be preserved.

**Implementation** (`mergeProperties()`):
- Starts with existing property: `{ ...existing }`
- Only overwrites fields that have spreadsheet columns
- Deep merge for `relationship` object

**Common preserved fields**:
- `relationship.singularName`
- `relationship.aggregateName`
- `relationship.modulePath`
- `relationship.key`
- `relationship.field`
- `relationship.avoidConstraint`
- `webComponent`

### 3. Preserve Description Format

**Rule**: If description content is the same (normalized), preserve original formatting.

**Implementation**:
```typescript
const existingNorm = normalizeText(existing.description);
const sheetNorm = normalizeText(fromSheet.description);
if (existingNorm === sheetNorm && existing.description) {
  merged.description = existing.description;
}
```

### 4. Preserve defaultValue Type

**Rule**: `defaultValue` can be boolean, string, number, or array. Preserve original type if content is equivalent.

**Implementation** (`areDefaultValuesEquivalent()`):
```typescript
// ["OTHER"] ≡ "OTHER" (both represent OTHER)
// true ≡ "TRUE" ≡ "true" (all represent boolean true)
```

### 5. Array Format in YAML

**Rule**: Certain arrays use inline format `[A, B, C]` for compactness.

**Implementation** (`convertArraysToInlineFormat()`):
```typescript
// Inline format (compact)
const inlineArrayKeys = ['enumOptions', 'decimals', 'defaultValue'];

// Multi-line format (readability): excludedOperations, excludedFiles
```

### 6. Nullable Default Value

**Rule**: If `nullable` is not checked (✓) in spreadsheet, it defaults to `false`.

**Implementation** (`sheetRowToProperty()`):
```typescript
if (parseBooleanValue(row.nullable)) {
  property.nullable = true;
} else {
  property.nullable = false;  // Always set, never undefined
}
```

### 7. DefaultValue for Array Types

**Rule**: When property `type` is `array`, `defaultValue` is wrapped in an array.

**Implementation** (`sheetRowToProperty()`):
```typescript
if (row.type === 'array' && !Array.isArray(parsedDefault)) {
  property.defaultValue = [parsedDefault];  // "OTHER" → ["OTHER"]
}
```

### 8. Description Format Preservation

**Rule**: Preserve multi-line description format even when field is renamed.

**Implementation** (`restoreOriginalDescriptions()`):
- First tries to match by property name
- If no match, tries to match by normalized description content
- Preserves original `>` or `|` style formatting

### 9. Description YAML Style

**Rule**: Use folded style `>` (not `>-`) for descriptions.

**Implementation** (`normalizeDescriptions()`):
- Ensures descriptions end with `\n`
- `js-yaml` uses `>` when string ends with newline

---

## Casuísticas Especiales

### 1. Relationship Deep Merge

When spreadsheet has `relationship.type` but not other fields:

```yaml
# Original YAML
relationship:
  type: one-to-many
  singularName: contact
  aggregateName: BusinessPartnerPortalPartnerContact
  modulePath: business-partner-portal/partner-contact
  key: businessPartnerId
  field: businessPartner

# Spreadsheet only has: type=1:N

# After pull (CORRECT - preserves nested fields)
relationship:
  type: one-to-many
  singularName: contact
  aggregateName: BusinessPartnerPortalPartnerContact
  modulePath: business-partner-portal/partner-contact
  key: businessPartnerId
  field: businessPartner
```

### 2. Boolean defaultValue vs String

```yaml
# YAML has:
defaultValue: true        # boolean

# Spreadsheet has:
defaultValue: "TRUE"      # string

# After pull: preserves boolean (equivalent content)
defaultValue: true
```

### 3. Array defaultValue

```yaml
# YAML has:
defaultValue: ["OTHER"]   # array with quoted string

# Spreadsheet has:
defaultValue: OTHER       # plain string

# After pull: preserves array format (equivalent content)
defaultValue: ["OTHER"]
```

### 4. lineWidth for Descriptions

**Problem**: `js-yaml.dump()` re-wraps text at `lineWidth`.

**Solution**: Use large `lineWidth: 500` to avoid re-wrapping existing descriptions.

### 5. Nullable Field Handling

**Special case**: `nullable: false` must be preserved even if spreadsheet cell is empty.

```typescript
// Only delete nullable if sheet explicitly says it should be removed
// Empty cell = preserve existing value
if (sheetValue !== undefined) {
  merged[field] = sheetValue;
}
// NOT: if (!sheetValue) delete merged[field]
```

---

## Configuration

### aurora-sheets.config.json

```json
{
  "credentialsPath": "./scripts/aurora-sheets-sync/credentials/service-account.json",
  "boundedContexts": {
    "business-partner-portal": {
      "spreadsheetId": "1ABC...",
      "description": "Business Partner Portal"
    }
  },
  "backupsPath": "backups/aurora-schemas",
  "cliterPath": "cliter"
}
```

### Environment

- Credentials: `credentials/service-account.json` (gitignored)
- YAML files: `cliter/{boundedContext}/*.aurora.yaml`
- Backups: `backups/aurora-schemas/{bc}/{timestamp}/`

---

## Commands

```bash
# From scripts/aurora-sheets-sync/

# Push YAML to Sheet
npx ts-node src/index.ts push --bc business-partner-portal

# Pull Sheet to YAML
npx ts-node src/index.ts pull --bc business-partner-portal

# Validate connection
npx ts-node src/index.ts validate --bc business-partner-portal

# List bounded contexts
npx ts-node src/index.ts list

# Options
--all          # All bounded contexts
--dry-run      # Preview without changes
--no-backup    # Skip backup (pull only)
--verbose      # Detailed output
```

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `The caller does not have permission` | Sheet not shared | Share with service account email |
| `Google Sheets API has not been enabled` | API disabled | Enable in Google Cloud Console |
| `Could not load credentials` | Missing JSON | Check `credentialsPath` |
| `Skipped: X (empty or invalid)` | No headers or no `name`/`type` columns | Fix sheet structure |

---

## Testing Checklist

When modifying sync logic, verify:

1. **Push creates new sheet** from TEMPLATE when module doesn't exist
2. **Push updates MODULES index** with hyperlinks
3. **Pull is idempotent** - running twice produces same result
4. **Pull preserves fields** not in spreadsheet columns
5. **Pull preserves formatting** of unchanged descriptions
6. **Pull preserves types** (boolean vs string, array vs scalar)
7. **Relationship nested fields** are preserved on pull
8. **Boolean ✓ character** works in both directions
9. **excludedOperations** uses inline array format
10. **File ends with newline** after pull

---

## Dependencies

Key packages:
- `googleapis`: Google Sheets API client
- `js-yaml`: YAML parsing and serialization
- `commander`: CLI framework
- `fs-extra`: Enhanced file system operations

---

## Future Considerations

1. **Pivot tables**: Many-to-many relationships have pivot data embedded in module sheets
2. **Validation**: Could add schema validation before push
3. **Diff command**: Currently basic, could show detailed property-level changes
4. **Watch mode**: Could watch YAML files and auto-push on change
