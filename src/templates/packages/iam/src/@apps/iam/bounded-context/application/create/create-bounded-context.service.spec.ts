/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { boundedContexts } from '../../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { CreateBoundedContextService } from './create-bounded-context.service';
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

describe('CreateBoundedContextService', () =>

{
    let service: CreateBoundedContextService;
    let repository: IBoundedContextRepository;
    let mockRepository: MockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateBoundedContextService,
                MockBoundedContextRepository,
                {
                    provide : IBoundedContextRepository,
                    useValue: {
                        create: (item) => { /**/ },
                    },
                },
            ],
        }).compile();

        service         = module.get(CreateBoundedContextService);
        repository      = module.get(IBoundedContextRepository);
        mockRepository  = module.get(MockBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('CreateBoundedContextService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a boundedContext and emit event', async () =>
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