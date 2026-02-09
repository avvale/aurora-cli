# Aurora-Specific Testing Patterns

## Testing Value Objects

```typescript
import { TeslaYear } from './tesla-year.value-object';

describe('TeslaYear', () => {
    it('should create valid year', () => {
        const year = new TeslaYear(2023);
        expect(year.value).toBe(2023);
    });

    it('should throw when year is before 2008', () => {
        expect(() => new TeslaYear(2005)).toThrow(
            'Tesla first car was released in 2008',
        );
    });

    it('should throw when year is in future', () => {
        const futureYear = new Date().getFullYear() + 5;
        expect(() => new TeslaYear(futureYear)).toThrow(
            'Year cannot be in the future',
        );
    });
});
```

## Testing Aggregates

```typescript
import { Tesla } from './tesla.aggregate';
import { TeslaCreatedEvent } from './events/tesla-created.event';

describe('Tesla Aggregate', () => {
    describe('register', () => {
        it('should create new tesla and emit TeslaCreatedEvent', () => {
            const tesla = Tesla.register({
                id: 'tesla-uuid',
                model: 'Model S',
                year: 2023,
                price: 79990,
                isActive: true,
            });

            expect(tesla.id.value).toBe('tesla-uuid');
            expect(tesla.model.value).toBe('Model S');
            expect(tesla.getUncommittedEvents()).toHaveLength(1);
            expect(tesla.getUncommittedEvents()[0]).toBeInstanceOf(TeslaCreatedEvent);
        });
    });

    describe('update', () => {
        it('should update tesla and emit TeslaUpdatedEvent', () => {
            const tesla = Tesla.register({
                id: 'tesla-uuid',
                model: 'Model S',
                year: 2023,
                price: 79990,
                isActive: true,
            });

            tesla.commit(); // Clear events

            tesla.update({ price: 89990 });

            expect(tesla.price.value).toBe(89990);
            expect(tesla.getUncommittedEvents()).toHaveLength(1);
        });
    });
});
```

## Test Organization

```
src/@core/tesla/
├── application/
│   ├── commands/
│   │   ├── create-tesla.command-handler.spec.ts
│   │   └── update-tesla.command-handler.spec.ts
│   └── queries/
│       ├── find-tesla-by-id.query-handler.spec.ts
│       └── paginate-teslas.query-handler.spec.ts
├── domain/
│   ├── tesla.aggregate.spec.ts
│   └── value-objects/
│       ├── tesla-year.spec.ts
│       └── tesla-price.spec.ts
└── infrastructure/
    └── mock/
        └── tesla.mock-repository.ts

test/
└── e2e/
    ├── tesla/
    │   ├── tesla.controller.e2e-spec.ts
    │   └── tesla.resolver.e2e-spec.ts
    └── fixtures/
        └── tesla.fixtures.ts
```
