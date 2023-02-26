/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { boundedContexts } from '@app/iam/bounded-context/infrastructure/mock/mock-bounded-context.data';
import { UpsertBoundedContextService } from './upsert-bounded-context.service';
import {
    BoundedContextId,
    BoundedContextName,
    BoundedContextRoot,
    BoundedContextSort,
    BoundedContextIsActive,
    BoundedContextCreatedAt,
    BoundedContextUpdatedAt,
    BoundedContextDeletedAt,
} from '../../domain/value-objects';
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';
import { MockBoundedContextRepository } from '../../infrastructure/mock/mock-bounded-context.repository';

describe('UpsertBoundedContextService', () =>

{
    let service: UpsertBoundedContextService;
    let repository: IBoundedContextRepository;
    let mockRepository: MockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpsertBoundedContextService,
                MockBoundedContextRepository,
                {
                    provide : IBoundedContextRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpsertBoundedContextService);
        repository      = module.get(IBoundedContextRepository);
        mockRepository  = module.get(MockBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('UpsertBoundedContextService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a boundedContext and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new BoundedContextId(boundedContexts[0].id),
                    name: new BoundedContextName(boundedContexts[0].name),
                    root: new BoundedContextRoot(boundedContexts[0].root),
                    sort: new BoundedContextSort(boundedContexts[0].sort),
                    isActive: new BoundedContextIsActive(boundedContexts[0].isActive),
                },
            )).toBe(undefined);
        });
    });
});