# Merge Rules by File Type

## Mapper Files (`*.mapper.ts`)

**Most common merge scenario.** Mappers have both generated and custom zones.

**Custom zones to PRESERVE:**
- Class-level properties
- Logic in public methods (`mapModelToAggregate`, `mapModelsToAggregates`, `mapAggregateToResponse`, `mapAggregatesToResponses`)
- Custom helper methods
- Constructor modifications

**Generated zones to UPDATE from .origin:**
- Imports (new Value Object imports)
- `makeAggregate()` method — new Value Object instantiations
- `makeResponse()` method — new `.value` property accesses
- Eager loading blocks (new related mappers)

**Example — Adding `observations` field:**

```typescript
// 1. ADD new import (from .origin)
import {
  ProductionPlanningProductionOrderHeaderObservations, // ← NEW
} from '@app/.../domain/value-objects';

// 2. ADD in makeAggregate() — after rowId, before next field
private makeAggregate(...) {
  return ProductionOrderHeader.register(
    new Id(model.id, { undefinable: true }),
    new RowId(model.rowId, { undefinable: true }),
    new Observations(model.observations, { undefinable: true }), // ← NEW
    new ProductionCenterId(model.productionCenterId, { undefinable: true }),
  );
}

// 3. ADD in makeResponse() — same position as makeAggregate
private makeResponse(header) {
  return new Response(
    header.id.value,
    header.rowId.value,
    header.observations.value, // ← NEW
    header.productionCenterId.value,
  );
}
```

**CRITICAL: Parameter order in `register()` and `Response()` MUST match the field order defined in the `.aurora.yaml` file.**

---

## Command Handler Files (`*command-handler.ts`)

**Custom zones to PRESERVE:**
- Constructor injected dependencies
- ALL logic in `execute()` method body
- Custom helper methods and decorators

**Generated zones to UPDATE from .origin:**
- Command payload destructuring (new fields)
- Value Object instantiations in service call
- New imports for Value Objects

---

## Query Handler Files (`*query-handler.ts`)

Same pattern as Command Handlers. Preserve custom logic, update generated query parameters.

---

## Aggregate Files (`*.aggregate.ts`)

**Normally fully generated — should NOT have custom code.**

If custom code exists (rare), merge:
- New properties
- New parameters in `register()` static method
- New parameters in `constructor()`
- New fields in `created()`, `updated()`, `deleted()` event methods
- New fields in `toDTO()` and `toRepository()`

---

## Response Files (`*-response.ts`)

**Normally fully generated.** If custom code exists, merge new constructor parameters in correct position.

---

## Model Files (`*.model.ts`) — Sequelize

**Normally fully generated.** If custom code exists (hooks, virtual fields, scopes), merge:
- New `@Column` decorators
- New `@BelongsTo`, `@HasMany`, `@BelongsToMany` associations
- New lifecycle hooks

---

## Service Files (`*service.ts` in `@app/`)

**Normally fully generated.** Business logic belongs in handlers, NOT services.

---

## API Handler Files (`*.handler.ts` in `@api/`)

**Can be heavily customized** (500+ lines of custom code). Be extremely careful:
1. Read the ENTIRE existing file
2. Read the ENTIRE .origin file
3. Identify ONLY the schema-delta lines
4. Add them without touching any custom logic

---

## Resolver/Controller Files (`@api/`)

**Custom zones to PRESERVE:**
- Custom decorators (`@UseGuards`, `@UseInterceptors`)
- Custom parameter decorators
- Pre/post processing logic

**Generated zones to UPDATE from .origin:**
- New input/output type references
- New field mappings in payload construction

---

## DTO / Input Files

**Normally fully generated.** If custom validation decorators were added, preserve them and merge new fields.

---

## Event Files (`*.event.ts`, `*event-handler.ts`)

**Normally fully generated.** Merge new event properties from .origin.

---

## Seeder Files (`*.seeder.ts`)

**Often customized** with specific seed data. Merge new field entries preserving custom seed values.

---

## Conflict Resolution

### Scenario: .origin restructures code that custom code also modified

1. Identify the NEW lines in .origin (the schema delta)
2. Insert those lines into YOUR customized version
3. Keep your conditional logic intact

```typescript
// YOUR custom makeAggregate (existing)
private makeAggregate(model, cQMetadata) {
  const status = model.status === 'LEGACY'
    ? ProductStatus.MIGRATED
    : model.status;

  return Product.register(
    new ProductId(model.id, { undefinable: true }),
    new ProductStatus(status, { undefinable: true }), // CUSTOM
  );
}

// ✅ MERGED: custom logic preserved + new field added
private makeAggregate(model, cQMetadata) {
  const status = model.status === 'LEGACY'
    ? ProductStatus.MIGRATED
    : model.status;

  return Product.register(
    new ProductId(model.id, { undefinable: true }),
    new ProductObservations(model.observations, { undefinable: true }), // ← NEW
    new ProductStatus(status, { undefinable: true }), // CUSTOM preserved
  );
}
```

### Scenario: Field exists in .origin but NOT in existing file

**Check the YAML delta from Step 0:**
- **Field IS in the YAML delta (new)** → Merge it from `.origin`
- **Field is NOT in the YAML delta** → It was intentionally removed. **DO NOT add it.**

### Scenario: Multiple .origin files from one regeneration

Process them ALL. Each .origin corresponds to exactly one existing file.

### Scenario: .origin file for a file you don't recognize

If the existing file has no meaningful custom code (just a stale hash), replace it entirely with the .origin content.
