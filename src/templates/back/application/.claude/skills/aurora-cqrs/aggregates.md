# Aggregates, Repositories & Mappers Reference

## Aggregate Structure

```typescript
export class TeslaModel extends AggregateRoot {
    // Properties (Value Objects)
    id: TeslaModelId;
    name: TeslaModelName;
    status: TeslaModelStatus;
    year: TeslaModelYear;
    isActive: TeslaModelIsActive;
    createdAt: TeslaModelCreatedAt;
    updatedAt: TeslaModelUpdatedAt;
    deletedAt: TeslaModelDeletedAt;

    constructor(...) {
        super();
        // Assign properties
    }

    // Factory method
    static register(...): TeslaModel {
        return new TeslaModel(...);
    }

    // Event methods
    created(event: {...}): void { this.apply(new CreatedEvent(...)); }
    updated(event: {...}): void { this.apply(new UpdatedEvent(...)); }
    deleted(event: {...}): void { this.apply(new DeletedEvent(...)); }
}
```

## Repository Interface

```typescript
export abstract class TeslaIModelRepository implements IRepository<TeslaModel> {
    abstract readonly repository: any;

    // Query methods
    abstract paginate(options?: {...}): Promise<Pagination<TeslaModel>>;
    abstract find(options?: {...}): Promise<TeslaModel | null>;
    abstract findById(id: TeslaModelId, options?: {...}): Promise<TeslaModel | null>;
    abstract get(options?: {...}): Promise<TeslaModel[]>;
    abstract count(options?: {...}): Promise<number>;
    abstract max(column: string, options?: {...}): Promise<number>;
    abstract min(column: string, options?: {...}): Promise<number>;
    abstract sum(column: string, options?: {...}): Promise<number>;

    // Command methods
    abstract create(model: TeslaModel, options?: {...}): Promise<void>;
    abstract insert(models: TeslaModel[], options?: {...}): Promise<void>;
    abstract updateById(model: TeslaModel, options?: {...}): Promise<void>;
    abstract update(model: TeslaModel, options?: {...}): Promise<void>;
    abstract upsert(model: TeslaModel, options?: {...}): Promise<void>;
    abstract deleteById(id: TeslaModelId, options?: {...}): Promise<void>;
    abstract delete(options?: {...}): Promise<void>;
}
```

## Mapper Structure

```typescript
export class TeslaModelMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    // Model (DB) → Aggregate (Domain)
    mapModelToAggregate(
        model: LiteralObject,
        cQMetadata?: CQMetadata,
    ): TeslaModel {
        return TeslaModel.register(
            new TeslaModelId(model.id),
            new TeslaModelName(model.name),
            new TeslaModelStatus(model.status),
            new TeslaModelYear(model.year),
            new TeslaModelIsActive(model.isActive),
            new TeslaModelCreatedAt(model.createdAt),
            new TeslaModelUpdatedAt(model.updatedAt),
            new TeslaModelDeletedAt(model.deletedAt),
        );
    }

    // Aggregate (Domain) → Response (DTO)
    mapAggregateToResponse(model: TeslaModel): TeslaModelResponse {
        return {
            id: model.id.value,
            name: model.name.value,
            status: model.status.value,
            year: model.year.value,
            isActive: model.isActive.value,
            createdAt: model.createdAt?.value,
            updatedAt: model.updatedAt?.value,
            deletedAt: model.deletedAt?.value,
        };
    }
}
```
