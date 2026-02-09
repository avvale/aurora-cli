# Commands & Queries Reference

## Commands

### Command Structure

```typescript
export class CreateTeslaModelCommand {
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            status: string;
            year: number;
            isActive: boolean;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
```

**Characteristics:**

- Immutable (readonly)
- Contains payload (data to create/update)
- Contains cQMetadata (context: timezone, user, tenant, etc.)
- Represents an intention to change state

### Command Types

```typescript
// Create single record
CreateTeslaModelCommand;

// Create multiple records
CreateTeslaModelsCommand;

// Update by ID
UpdateTeslaModelByIdCommand;

// Update multiple (by query)
UpdateTeslaModelsCommand;

// Delete by ID
DeleteTeslaModelByIdCommand;

// Delete multiple (by query)
DeleteTeslaModelsCommand;

// Upsert (insert or update)
UpsertTeslaModelCommand;

// Custom command with increment
UpdateAndIncrementTeslaModelsCommand;
```

## Command Handlers

### Basic Structure

```typescript
@CommandHandler(CreateTeslaModelCommand)
export class CreateTeslaModelCommandHandler implements ICommandHandler<CreateTeslaModelCommand> {
    constructor(private readonly service: CreateTeslaModelService) {}

    async execute(command: CreateTeslaModelCommand): Promise<void> {
        // ✅ EDITABLE ZONE - Add custom logic here

        // Call the service (generated)
        await this.service.main(
            {
                id: new TeslaModelId(command.payload.id),
                name: new TeslaModelName(command.payload.name),
                status: new TeslaModelStatus(command.payload.status),
                year: new TeslaModelYear(command.payload.year),
                isActive: new TeslaModelIsActive(command.payload.isActive),
            },
            command.cQMetadata,
        );
    }
}
```

### Handler with Custom Logic

```typescript
@CommandHandler(CreateTeslaModelCommand)
export class CreateTeslaModelCommandHandler implements ICommandHandler<CreateTeslaModelCommand> {
    constructor(
        private readonly service: CreateTeslaModelService,
        private readonly validator: TeslaModelValidator, // Custom service
        private readonly notifier: NotificationService, // Custom service
    ) {}

    async execute(command: CreateTeslaModelCommand): Promise<void> {
        /* #region AI-generated code */
        // Step 1: Custom validation
        await this.validator.validate(command.payload);

        // Step 2: Business rule
        if (command.payload.year < 2008) {
            throw new TeslaYearInvalidException(
                'Tesla first production car (Roadster) was in 2008',
            );
        }

        // Step 3: Check duplicates (custom logic)
        const exists = await this.service.repository.find({
            queryStatement: {
                where: { name: command.payload.name },
            },
        });

        if (exists) {
            throw new TeslaModelAlreadyExistsException();
        }
        /* #endregion AI-generated code */

        // Step 4: Execute service (generated)
        await this.service.main(
            {
                id: new TeslaModelId(command.payload.id),
                name: new TeslaModelName(command.payload.name),
                status: new TeslaModelStatus(command.payload.status),
                year: new TeslaModelYear(command.payload.year),
                isActive: new TeslaModelIsActive(command.payload.isActive),
            },
            command.cQMetadata,
        );

        /* #region AI-generated code */
        // Step 5: Post-creation actions
        await this.notifier.notifyNewModel(command.payload);
        /* #endregion AI-generated code */
    }
}
```

### Handler with Return Value

```typescript
// Some handlers return data (like upsert, update)
@CommandHandler(UpsertTeslaModelCommand)
export class UpsertTeslaModelCommandHandler implements ICommandHandler<UpsertTeslaModelCommand> {
    async execute(
        command: UpsertTeslaModelCommand,
    ): Promise<TeslaModelResponse> {
        const model = await this.service.main(payload, command.cQMetadata);

        return this.mapper.mapAggregateToResponse(model);
    }
}
```

## Queries

### Query Structure

```typescript
export class GetTeslaModelsQuery {
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
```

**Characteristics:**

- Contains queryStatement (user filters, pagination, sorting)
- Contains constraint (system/security filters)
- Contains cQMetadata (context)
- Used for read operations

### Query Types

```typescript
// Find single record
FindTeslaModelQuery;

// Find by ID
FindTeslaModelByIdQuery;

// Get multiple records
GetTeslaModelsQuery;

// Paginate records
PaginateTeslaModelsQuery;

// Count records
CountTeslaModelQuery;

// Max value
MaxTeslaModelQuery;

// Min value
MinTeslaModelQuery;

// Sum values
SumTeslaModelQuery;

// Raw SQL
RawSQLTeslaModelsQuery;
```

## Query Handlers

### Basic Structure

```typescript
@QueryHandler(GetTeslaModelsQuery)
export class GetTeslaModelsQueryHandler implements IQueryHandler<GetTeslaModelsQuery> {
    private readonly mapper: TeslaModelMapper = new TeslaModelMapper();

    constructor(private readonly service: GetTeslaModelsService) {}

    async execute(query: GetTeslaModelsQuery): Promise<TeslaModelResponse[]> {
        // Get models from service
        const models = await this.service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        // Skip mapping if requested
        if (query.cQMetadata?.excludeMapModelToAggregate) {
            return models;
        }

        // Map aggregates to responses
        return this.mapper.mapAggregatesToResponses(models);
    }
}
```

### Handler with Custom Logic

```typescript
@QueryHandler(GetTeslaModelsQuery)
export class GetTeslaModelsQueryHandler implements IQueryHandler<GetTeslaModelsQuery> {
    private readonly mapper: TeslaModelMapper = new TeslaModelMapper();

    constructor(
        private readonly service: GetTeslaModelsService,
        private readonly cache: CacheService, // Custom service
    ) {}

    async execute(query: GetTeslaModelsQuery): Promise<TeslaModelResponse[]> {
        /* #region AI-generated code */
        // Try cache first
        const cacheKey = this.buildCacheKey(query);
        const cached = await this.cache.get(cacheKey);
        if (cached) return cached;
        /* #endregion AI-generated code */

        // Get from database
        const models = await this.service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) {
            return models;
        }

        const responses = this.mapper.mapAggregatesToResponses(models);

        /* #region AI-generated code */
        // Cache results
        await this.cache.set(cacheKey, responses, 3600);
        /* #endregion AI-generated code */

        return responses;
    }
}
```
