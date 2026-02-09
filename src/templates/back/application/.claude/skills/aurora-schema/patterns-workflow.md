# Patterns & Workflow Reference

## Common Patterns

### Status Fields with Enum

```yaml
- name: status
  type: enum
  enumOptions: [PENDING, APPROVED, REJECTED, CANCELLED]
  defaultValue: PENDING
  description: >
    Workflow status. PENDING: Awaiting review. APPROVED: Accepted and active.
    REJECTED: Denied (see rejectionReason). CANCELLED: Withdrawn by user.
```

### Soft Delete Pattern

```yaml
- name: deletedAt
  type: timestamp
  nullable: true
  description: >
    Soft delete timestamp. NULL means active record. When set, record is
    excluded from normal queries. Enables audit trail and recovery.
```

### Money Fields

```yaml
- name: amount
  type: decimal
  decimals: [12, 2]
  description: >
    Monetary amount in smallest currency unit with 2 decimal places. Currency
    determined by currencyCode field.

- name: currencyCode
  type: char
  length: 3
  description: >
    ISO 4217 currency code (USD, EUR, GBP). Must be valid and supported.
```

### Sort Order Fields

```yaml
- name: sort
  type: smallint
  unsigned: true
  nullable: true
  description: >
    Sort order for displaying records in user interfaces. Lower numbers appear
    first. NULL indicates no specific order preference (alphabetical fallback).
```

**Note:** Always use `sort` instead of `displayOrder`, `order`, `position`, or `sortOrder`.

### URL-Friendly Slugs

```yaml
- name: slug
  type: varchar
  maxLength: 2046
  index: unique
  description: >
    URL-friendly identifier. Lowercase, hyphenated. Auto-generated from name if
    not provided. Example: "my-awesome-product". Max 2046 chars for URL
    compatibility.
```

## Analysis Workflow

### 1. Locate YAML Files

```bash
fd -e yaml -e yml aurora
fd "book.aurora.yaml"
```

### 2. Read and Analyze

Check for:

- [ ] Module has `description` before `aggregateProperties`
- [ ] **Has `rowId` field (after `id`)**
- [ ] **Has `createdAt`, `updatedAt`, `deletedAt` fields**
- [ ] All fields have meaningful descriptions
- [ ] Field names follow conventions (camelCase, boolean prefixes)
- [ ] No `id` type fields have `length` property
- [ ] Descriptions explain WHY, not WHAT
- [ ] Enum values are documented
- [ ] Types are appropriate for use case
- [ ] Consistency with similar modules
- [ ] No duplicate relationship definitions
- [ ] **Indexed fields have index name ≤ 63 chars**

### 3. Generate Report

```markdown
## Analysis of [module].aurora.yaml

### Summary
- Total fields: X
- Fields without description: Y
- Module has description: Yes/No

### Missing Mandatory Fields ❌ (if any)
| Field | Position | Status |
|-------|----------|--------|
| rowId | After id | Missing |

### Fields Without Description ❌
| Field | Type | Suggested Description |
|-------|------|----------------------|

### Naming Improvements ⚠️
| Current | Suggested | Reason |
|---------|-----------|--------|
```

## Editing Workflow

### Creating Fields

```yaml
- name: publishedAt
  type: timestamp
  nullable: true
  description: >
      Timestamp when the book was published. NULL indicates unpublished.
```

**Checklist:**
- [ ] Name follows camelCase convention
- [ ] Boolean names have is*/has*/can\* prefix
- [ ] Type is appropriate for use case
- [ ] Description explains context and usage
- [ ] No `length` property on `id` type fields
- [ ] If field has `index`: calculate index name length. If > 63 chars → add `indexName`
- [ ] If new module: includes `rowId` and timestamp fields

### Editing Fields

```yaml
# Before
- name: status
  type: varchar

# After (changing to enum)
- name: status
  type: enum
  enumOptions: [DRAFT, PUBLISHED, ARCHIVED]
  description: >
    Current publication status. DRAFT: Not ready. PUBLISHED: Available.
    ARCHIVED: Preserved but no longer available.
```

### Deleting Fields

```bash
# Search for field references first
rg "fieldName" cliter/ -g "*.aurora.yaml"
```

## Change Log Template

```markdown
## Schema Changes - YYYY-MM-DD

### bc/module.aurora.yaml

#### Created
- `isActive` (boolean) - Flag to indicate if model is currently available

#### Modified
- `status`: Changed type from `varchar` to `enum`

#### Deleted
- `legacyCode` (varchar) - Removed after confirming no dependencies

#### Fixed
- `id`: Removed `length: 36` property
```

## Commands

```bash
# Find all Aurora YAMLs
fd -e yaml aurora

# Search for fields without descriptions
rg -A1 "^  - name:" cliter/ -g "*.aurora.yaml" | rg -v "description:"

# Find id fields with length (incorrect)
rg -A2 "type: id" cliter/ -g "*.aurora.yaml" | rg "length:"

# Check for missing module descriptions
rg -L "^description:" cliter/ -g "*.aurora.yaml"

# Check for missing mandatory fields
rg -L "name: rowId" cliter/ -g "*.aurora.yaml"
```
