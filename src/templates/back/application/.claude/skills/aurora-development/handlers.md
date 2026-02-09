# Handler Examples Reference

## Command Handler

```typescript
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from '@infrastructure/user/repositories/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly service: CreateUserService,
        private readonly repository: UserRepository, // Inject if needed for validations
    ) {}

    async execute(command: CreateUserCommand): Promise<void> {
        const { payload } = command;

        /* #region AI-generated code */
        // Business validation: Check duplicates
        const existingUser = await this.repository.find({
            queryStatement: {
                where: { email: payload.email },
            },
        });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        // Business rule: isLocked=true → isActive=false
        if (payload.isLocked === true) {
            payload.isActive = false;
        }
        /* #endregion AI-generated code */

        // Call service (only persistence)
        await this.service.main(payload, command.cQMetadata);
    }
}
```

## Query Handler

```typescript
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { UserMapper } from '@domain/user/user.mapper';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    private readonly mapper: UserMapper = new UserMapper();

    constructor(
        private readonly service: GetUsersService,
        private readonly cache: CacheService, // Custom service
    ) {}

    async execute(query: GetUsersQuery): Promise<UserResponse[]> {
        /* #region AI-generated code */
        // Try cache first
        const cacheKey = `users:${JSON.stringify(query.queryStatement)}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) return cached;
        /* #endregion AI-generated code */

        const users = await this.service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) {
            return users;
        }

        const responses = this.mapper.mapAggregatesToResponses(users);

        /* #region AI-generated code */
        // Cache results for 1 hour
        await this.cache.set(cacheKey, responses, 3600);
        /* #endregion AI-generated code */

        return responses;
    }
}
```

## Business Logic Placement Example

```typescript
@CommandHandler(CreateMaintenanceHistoryCommand)
export class CreateMaintenanceHistoryCommandHandler {
    constructor(
        private readonly service: CreateMaintenanceHistoryService,
        private readonly repository: TeslaIMaintenanceHistoryRepository,
    ) {}

    async execute(command: CreateMaintenanceHistoryCommand): Promise<void> {
        /* #region AI-generated code */
        // ✅ CORRECT: Business validation BEFORE service call
        const lastMaintenance = await this.repository.find({
            queryStatement: {
                where: { unitId: { '[eq]': command.payload.unitId } },
                order: [{ workshopEntryDate: 'desc' }],
                limit: 1,
            },
            cQMetadata: command.cQMetadata,
        });

        if (lastMaintenance) {
            const daysDiff = calculateDaysDifference(
                lastMaintenance.workshopEntryDate.value,
            );
            if (daysDiff > 365) {
                throw new TeslaUnitNotRevisedInOneYearException(
                    'Unit has not been serviced in over a year',
                );
            }
        }
        /* #endregion AI-generated code */

        // Call service (only persistence)
        await this.service.main(payload, command.cQMetadata);
    }
}
```

## Service (main method) — What NOT to Put Here

```typescript
@Injectable()
export class CreateMaintenanceHistoryService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: TeslaIMaintenanceHistoryRepository,
    ) {}

    async main(payload, cQMetadata): Promise<void> {
        // ✅ ONLY persistence and events (NO business logic)
        const maintenanceHistory = TeslaMaintenanceHistory.register(
            payload.id,
            payload.unitId,
            payload.workshopEntryDate,
            payload.workshopExitDate,
            new TeslaMaintenanceHistoryCreatedAt({ currentTimestamp: true }),
            new TeslaMaintenanceHistoryUpdatedAt({ currentTimestamp: true }),
            null,
        );

        await this.repository.create(maintenanceHistory, {
            createOptions: cQMetadata?.repositoryOptions,
        });

        const register = this.publisher.mergeObjectContext(maintenanceHistory);
        register.created({ payload: maintenanceHistory, cQMetadata });
        register.commit();
    }
}
```
