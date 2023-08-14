import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamGetBoundedContextsService } from './iam-get-bounded-contexts.service';
import { IamIBoundedContextRepository } from '../../domain/iam-bounded-context.repository';
import { IamMockBoundedContextRepository } from '../../infrastructure/mock/iam-mock-bounded-context.repository';

describe('IamGetBoundedContextsService', () =>
{
    let service: IamGetBoundedContextsService;
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
                IamGetBoundedContextsService,
                IamMockBoundedContextRepository,
                {
                    provide : IamIBoundedContextRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamGetBoundedContextsService);
        repository = module.get(IamIBoundedContextRepository);
        mockRepository = module.get(IamMockBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('GetBoundedContextsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get boundedContexts', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
