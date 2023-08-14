import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamFindBoundedContextService } from './iam-find-bounded-context.service';
import { IamIBoundedContextRepository } from '../../domain/iam-bounded-context.repository';
import { IamMockBoundedContextRepository } from '../../infrastructure/mock/iam-mock-bounded-context.repository';

describe('IamFindBoundedContextService', () =>
{
    let service: IamFindBoundedContextService;
    let repository: IamIBoundedContextRepository;
    let mockRepository: IamMockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindBoundedContextService,
                IamMockBoundedContextRepository,
                {
                    provide : IamIBoundedContextRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamFindBoundedContextService);
        repository = module.get(IamIBoundedContextRepository);
        mockRepository = module.get(IamMockBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('IamFindBoundedContextService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find boundedContext', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
