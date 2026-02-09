# Unit Testing Patterns

## Testing Command Handlers

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';

describe('CreateTeslaCommandHandler', () => {
    let handler: CreateTeslaCommandHandler;
    let repository: ITeslaRepository;
    let publisher: EventPublisher;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTeslaCommandHandler,
                {
                    provide: ITeslaRepository,
                    useClass: TeslaMockRepository,
                },
                {
                    provide: EventPublisher,
                    useValue: {
                        mergeObjectContext: jest.fn().mockReturnValue({
                            commit: jest.fn(),
                        }),
                    },
                },
            ],
        }).compile();

        handler = module.get<CreateTeslaCommandHandler>(CreateTeslaCommandHandler);
        repository = module.get<ITeslaRepository>(ITeslaRepository);
        publisher = module.get<EventPublisher>(EventPublisher);
    });

    describe('execute', () => {
        it('should create tesla with valid data', async () => {
            const command = new CreateTeslaCommand({
                payload: {
                    id: 'tesla-uuid',
                    model: 'Model S',
                    year: 2023,
                    price: 79990,
                    isActive: true,
                },
            });

            const createSpy = jest.spyOn(repository, 'create');
            await handler.execute(command);

            expect(createSpy).toHaveBeenCalledTimes(1);
            expect(createSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: expect.any(Object),
                    model: expect.any(Object),
                }),
            );
        });

        it('should throw exception when price is invalid', async () => {
            const command = new CreateTeslaCommand({
                payload: { id: 'uuid', model: 'Model S', year: 2023, price: -100, isActive: true },
            });

            await expect(handler.execute(command)).rejects.toThrow(
                'Price must be greater than 0',
            );
        });
    });
});
```

## Testing Query Handlers

```typescript
describe('FindTeslaByIdQueryHandler', () => {
    let handler: FindTeslaByIdQueryHandler;
    let repository: ITeslaRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindTeslaByIdQueryHandler,
                { provide: ITeslaRepository, useClass: TeslaMockRepository },
            ],
        }).compile();

        handler = module.get<FindTeslaByIdQueryHandler>(FindTeslaByIdQueryHandler);
        repository = module.get<ITeslaRepository>(ITeslaRepository);
    });

    it('should return tesla when found', async () => {
        const teslaMock = Tesla.register({ id: 'uuid', model: 'Model 3', year: 2023, price: 42990, isActive: true });
        jest.spyOn(repository, 'findById').mockResolvedValue(teslaMock);

        const query = new FindTeslaByIdQuery({ id: 'uuid' });
        const result = await handler.execute(query);

        expect(result).toBe(teslaMock);
        expect(repository.findById).toHaveBeenCalledWith('uuid');
    });

    it('should return null when not found', async () => {
        jest.spyOn(repository, 'findById').mockResolvedValue(null);
        const result = await handler.execute(new FindTeslaByIdQuery({ id: 'non-existent' }));
        expect(result).toBeNull();
    });
});
```

## Mocking Repositories

```typescript
@Injectable()
export class TeslaMockRepository implements ITeslaRepository {
    private teslas: Tesla[] = [];

    async create(tesla: Tesla): Promise<void> {
        this.teslas.push(tesla);
    }

    async findById(id: TeslaId): Promise<Tesla | null> {
        return this.teslas.find(t => t.id.value === id.value) || null;
    }

    async update(tesla: Tesla): Promise<void> {
        const index = this.teslas.findIndex(t => t.id.value === tesla.id.value);
        if (index !== -1) this.teslas[index] = tesla;
    }

    async delete(id: TeslaId): Promise<void> {
        this.teslas = this.teslas.filter(t => t.id.value !== id.value);
    }

    async find(query: any): Promise<Tesla[]> {
        return this.teslas;
    }
}
```

## Mocking External Services

```typescript
describe('CreateOrderCommandHandler', () => {
    let handler: CreateOrderCommandHandler;
    let paymentService: PaymentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateOrderCommandHandler,
                {
                    provide: PaymentService,
                    useValue: {
                        processPayment: jest.fn(),
                        refund: jest.fn(),
                    },
                },
            ],
        }).compile();

        handler = module.get(CreateOrderCommandHandler);
        paymentService = module.get(PaymentService);
    });

    it('should process payment when creating order', async () => {
        jest.spyOn(paymentService, 'processPayment').mockResolvedValue({
            transactionId: 'txn-123',
            status: 'success',
        });

        await handler.execute(new CreateOrderCommand({ amount: 1000 }));
        expect(paymentService.processPayment).toHaveBeenCalledWith({ amount: 1000 });
    });

    it('should handle payment failure', async () => {
        jest.spyOn(paymentService, 'processPayment').mockRejectedValue(
            new Error('Payment declined'),
        );

        await expect(handler.execute(new CreateOrderCommand({ amount: 1000 }))).rejects.toThrow('Payment declined');
    });
});
```

## Common Mocking Patterns

### EventBus Mock

```typescript
{ provide: EventBus, useValue: { publish: jest.fn() } }
```

### QueryBus Mock

```typescript
{ provide: QueryBus, useValue: { execute: jest.fn() } }
```

### CommandBus Mock

```typescript
{ provide: CommandBus, useValue: { execute: jest.fn() } }
```
