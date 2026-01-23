# Kitchen Sink

## Purpose

Demonstration and testing bounded context showcasing Aurora framework capabilities. Contains example modules demonstrating various features: relationships (one-to-many, many-to-many), enum types, arrays, JSON fields, custom APIs, and UI components. Not intended for production use.

## Modules

| Module | Responsibility |
|--------|----------------|
| my-module | Example aggregate demonstrating multiple Aurora features: enum types, relationships (many-to-one to other-module, one-to-many to fields, many-to-many to roles), array fields with tags, JSONB metadata, and custom API endpoints. |

## Key Business Rules

- **Demo Only**: This bounded context is for learning and testing Aurora features, not production use.
- **No OAuth/Auditing**: hasOAuth=false and hasAuditing=false to demonstrate minimal configuration.
- **Denormalized Relationships**: roles relationship uses isDenormalized=true demonstrating denormalization patterns.
- **Feature Showcase**: Demonstrates enum (OPTION_1/OPTION_2), unique constraints, relationships, arrays, and JSONB.

## Main Flows

1. **Explore Features**: Review my-module schema -> Understand relationship types -> Study UI component configurations.
2. **Test Custom API**: Call my-custom-process mutation -> Observe custom business logic execution.
3. **Test Relationships**: Create my-module -> Add roles (many-to-many) -> Add fields (one-to-many) -> Query with eager loading.

## Dependencies

- **Uses**: None (self-contained demo)
- **Used by**: None (demo/test context)

## Technical Notes

- **Web Components**: Demonstrates various UI components: grid-elements-manager for fields, multiple-select for tags, async-search-multiple-select for roles.
- **Pivot Table**: my-module-role pivot demonstrates many-to-many with custom aggregate.
- **Missing Modules**: References to other-module, field, and role exist but may not have .aurora.yaml files (partial demo setup).
- **Excluded Files**: Some resolver files excluded demonstrating file exclusion patterns.
- **Example Values**: Note the typo in email example ("gmial.com") - demo data, not production.
