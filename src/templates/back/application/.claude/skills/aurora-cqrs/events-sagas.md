# Events & Sagas Reference

## Event Structure

```typescript
export class CreatedTeslaModelEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                name: string;
                status: string;
                year: number;
                isActive: boolean;
                createdAt?: string;
                updatedAt?: string;
                deletedAt?: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
```

## Aggregate Event Methods

```typescript
export class TeslaModel extends AggregateRoot {
    // Apply created event
    created(event: { payload: TeslaModel; cQMetadata?: CQMetadata }): void {
        this.apply(
            new CreatedTeslaModelEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    status: event.payload.status.value,
                    year: event.payload.year.value,
                    isActive: event.payload.isActive.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    // Apply updated event
    updated(event: { payload: TeslaModel; cQMetadata?: CQMetadata }): void {
        this.apply(new UpdatedTeslaModelEvent({...}));
    }

    // Apply deleted event
    deleted(event: { payload: TeslaModel; cQMetadata?: CQMetadata }): void {
        this.apply(new DeletedTeslaModelEvent({...}));
    }
}
```

## Event Handlers

### Basic Structure

```typescript
@EventsHandler(CreatedTeslaModelEvent)
export class CreatedTeslaModelEventHandler implements IEventHandler<CreatedTeslaModelEvent> {
    handle(event: CreatedTeslaModelEvent): void {
        // ✅ EDITABLE ZONE - Implement event reaction here
        console.log('Tesla model created:', event.event.payload.id);
    }
}
```

### Handler with Custom Logic

```typescript
@EventsHandler(CreatedTeslaModelEvent)
export class CreatedTeslaModelEventHandler implements IEventHandler<CreatedTeslaModelEvent> {
    constructor(
        private readonly notifier: NotificationService,
        private readonly analytics: AnalyticsService,
    ) {}

    async handle(event: CreatedTeslaModelEvent): Promise<void> {
        /* #region AI-generated code */
        // Send notification
        await this.notifier.notify({
            type: 'MODEL_CREATED',
            data: event.event.payload,
        });

        // Track analytics
        await this.analytics.track('model.created', {
            modelId: event.event.payload.id,
            modelName: event.event.payload.name,
        });

        // Log to audit system
        console.log('New Tesla model created:', {
            id: event.event.payload.id,
            name: event.event.payload.name,
            timestamp: new Date().toISOString(),
        });
        /* #endregion AI-generated code */
    }
}
```

## Sagas

### Saga Structure

```typescript
@Injectable()
export class TeslaModelSagas {
    // Example saga: When model is created, create initial inventory
    @Saga()
    modelCreated = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(CreatedTeslaModelEvent),
            delay(1000),
            map((event) => {
                // Return command to execute
                return new CreateInitialInventoryCommand({
                    modelId: event.event.payload.id,
                    quantity: 0,
                });
            }),
        );
    };

    // Example saga: When model is deleted, delete related records
    @Saga()
    modelDeleted = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(DeletedTeslaModelEvent),
            map((event) => {
                return new DeleteUnitsCommand({
                    modelId: event.event.payload.id,
                });
            }),
        );
    };
}
```
