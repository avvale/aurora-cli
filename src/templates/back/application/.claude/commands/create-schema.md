Analyze or create Aurora YAML schemas: $ARGUMENTS

Use the aurora-schema-manager agent to handle the request based on $ARGUMENTS:

## Mode 1: Analyze Existing Schema

If $ARGUMENTS is a module path (e.g., "library/book"):

1. Read and analyze that specific YAML file
2. Generate a report with:
   - Missing mandatory fields (rowId, createdAt, updatedAt, deletedAt)
   - Fields without descriptions
   - Names that could be improved
   - Type recommendations
3. Propose an improved YAML

## Mode 2: List Available Schemas

If $ARGUMENTS is empty:

1. List all available YAMLs in the project
2. Ask the user which one to review

## Mode 3: Analyze All Schemas

If $ARGUMENTS is "all":

1. Analyze all YAMLs in the project
2. Generate a summary report for each module

## Mode 4: Generate New Schema Proposal

If $ARGUMENTS describes an application or domain (e.g., "una aplicación de
gestión de biblioteca", "e-commerce platform", "CRM system"):

1. **Analyze the domain** - Identify the main entities and their relationships
2. **Propose modules** - Create a list of suggested modules with:
   - Module name (singular/plural)
   - Brief description of purpose
   - Key relationships with other modules
3. **Generate YAML definitions** for each module including:
   - Module header (boundedContextName, moduleName, description, etc.)
   - **Mandatory fields** (id, rowId, createdAt, updatedAt, deletedAt)
   - Domain-specific fields with:
     - Appropriate types (following byte-optimized varchar lengths)
     - Meaningful descriptions explaining purpose
     - Proper indexes and constraints
   - Relationships between modules
4. **Present the proposal** in a structured format:

```markdown
## Proposed Schema: [Application Name]

### Bounded Context: [name]

### Modules Overview

| Module | Description                | Key Relationships      |
| ------ | -------------------------- | ---------------------- |
| book   | Catalog of available books | author, category, loan |
| author | Book authors information   | book (one-to-many)     |
| ...    | ...                        | ...                    |

### Module Definitions

#### 1. [module-name].aurora.yaml

[Complete YAML definition]

#### 2. [next-module].aurora.yaml

[Complete YAML definition]
```

5. **Ask for confirmation** before creating any files
6. If user approves, create the YAML files in the appropriate location

### Guidelines for Schema Generation

- Use English for all field names and descriptions
- Follow naming conventions (camelCase, is*/has* for booleans, \*At for
  timestamps)
- Include comprehensive descriptions that explain the WHY, not the WHAT
- Use byte-optimized varchar lengths (64, 128, 255, 510, 1022, 2046)
- Define proper relationships (many-to-one with FK, one-to-many as navigation)
- Consider soft delete pattern (deletedAt) for all entities
- Add appropriate indexes for frequently queried fields
- Document enum options with their meanings

### Example Request

User: `/create-schema sistema de gestión de inventario para una tienda`

Response should propose:

- `inventory/product` - Products in the store
- `inventory/category` - Product categories
- `inventory/supplier` - Product suppliers
- `inventory/stock-movement` - Stock entries and exits
- `inventory/warehouse` - Storage locations

Each with complete YAML definitions ready to use.
