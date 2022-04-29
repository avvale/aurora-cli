import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { boundedContexts } from '../../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { FindBoundedContextByIdService } from './find-bounded-context-by-id.service';
import { BoundedContextId } from '../../domain/value-objects';
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';
import { MockBoundedContextRepository } from '../../infrastructure/mock/mock-bounded-context.repository';

describe('FindBoundedContextByIdService', () =>
{
    let service: FindBoundedContextByIdService;
    let repository: IBoundedContextRepository;
    let mockRepository: MockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindBoundedContextByIdService,
                MockBoundedContextRepository,
                {
                    provide: IBoundedContextRepository,
                    useValue: {
                        findById: id => { /**/ }
                    }
                }
            ]
        }).compile();

        service         = module.get(FindBoundedContextByIdService);
        repository      = module.get(IBoundedContextRepository);
        mockRepository  = module.get(MockBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('FindBoundedContextByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find boundedContext by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new BoundedContextId(boundedContexts[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});