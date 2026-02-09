# Services Reference

## Command Service Structure

```typescript
@Injectable()
export class CreateTeslaModelService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: TeslaIModelRepository,
    ) {}

    async main(
        payload: {
            id: TeslaModelId;
            name: TeslaModelName;
            status: TeslaModelStatus;
            year: TeslaModelYear;
            isActive: TeslaModelIsActive;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // 1. Create aggregate with factory pattern
        const model = TeslaModel.register(
            payload.id,
            payload.name,
            payload.status,
            payload.year,
            payload.isActive,
            new TeslaModelCreatedAt({ currentTimestamp: true }),
            new TeslaModelUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // 2. Persist to database
        await this.repository.create(model, {
            createOptions: cQMetadata?.repositoryOptions,
        });

        // 3. Merge EventBus with aggregate
        const modelRegister = this.publisher.mergeObjectContext(model);

        // 4. Apply and commit events
        modelRegister.created({
            payload: model,
            cQMetadata,
        });
        modelRegister.commit();
    }
}
```

## Query Service Structure

```typescript
@Injectable()
export class GetTeslaModelsService {
    constructor(private readonly repository: TeslaIModelRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<TeslaModel[]> {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
```

## Custom Service (Not Generated)

```typescript
@Injectable()
export class TeslaModelValidator {
    constructor(private readonly repository: TeslaIModelRepository) {}

    async validate(payload: any): Promise<void> {
        // Custom validation logic
        if (!payload.name || payload.name.length < 3) {
            throw new TeslaModelNameInvalidException();
        }

        // Check unique constraints
        const exists = await this.repository.find({
            queryStatement: {
                where: { name: payload.name },
            },
        });

        if (exists) {
            throw new TeslaModelAlreadyExistsException();
        }
    }
}
```
