# Common Patterns Reference

## Pattern 1: Command with Validation

```typescript
@CommandHandler(CreateTeslaModelCommand)
export class CreateTeslaModelCommandHandler {
    constructor(
        private readonly service: CreateTeslaModelService,
        private readonly validator: TeslaValidator,
    ) {}

    async execute(command: CreateTeslaModelCommand): Promise<void> {
        /* #region AI-generated code */
        // Pre-validation
        await this.validator.validate(command.payload);
        /* #endregion AI-generated code */

        // Execute service
        await this.service.main(payload, command.cQMetadata);
    }
}
```

## Pattern 2: Query with Cache

```typescript
@QueryHandler(GetTeslaModelsQuery)
export class GetTeslaModelsQueryHandler {
    constructor(
        private readonly service: GetTeslaModelsService,
        private readonly cache: CacheService,
    ) {}

    async execute(query: GetTeslaModelsQuery): Promise<TeslaModelResponse[]> {
        /* #region AI-generated code */
        const cached = await this.cache.get(key);
        if (cached) return cached;
        /* #endregion AI-generated code */

        const models = await this.service.main(...);
        const responses = this.mapper.mapAggregatesToResponses(models);

        /* #region AI-generated code */
        await this.cache.set(key, responses);
        /* #endregion AI-generated code */

        return responses;
    }
}
```

## Pattern 3: Event Handler with Side Effects

```typescript
@EventsHandler(CreatedTeslaModelEvent)
export class CreatedTeslaModelEventHandler {
    constructor(private readonly notifier: NotificationService) {}

    async handle(event: CreatedTeslaModelEvent): Promise<void> {
        /* #region AI-generated code */
        await this.notifier.sendEmail({
            to: 'admin@tesla.com',
            subject: 'New Model Created',
            body: `Model ${event.event.payload.name} created`,
        });
        /* #endregion AI-generated code */
    }
}
```

## Pattern 4: Saga Coordination

```typescript
@Injectable()
export class TeslaModelSagas {
    @Saga()
    createRelatedRecords = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(CreatedTeslaModelEvent),
            mergeMap((event) => [
                new CreateInventoryCommand({ modelId: event.event.payload.id }),
                new CreatePricingCommand({ modelId: event.event.payload.id }),
            ]),
        );
    };
}
```
