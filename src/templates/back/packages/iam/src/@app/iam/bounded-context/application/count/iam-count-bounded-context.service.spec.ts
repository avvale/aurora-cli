import { IamIBoundedContextRepository, IamMockBoundedContextRepository } from '@app/iam/bounded-context';
import { IamCountBoundedContextService } from '@app/iam/bounded-context/application/count/iam-count-bounded-context.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountBoundedContextService', () =>
{
    let service: IamCountBoundedContextService;
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
                IamCountBoundedContextService,
                IamMockBoundedContextRepository,
                {
                    provide : IamIBoundedContextRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCountBoundedContextService);
        repository = module.get(IamIBoundedContextRepository);
        mockRepository = module.get(IamMockBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('IamCountBoundedContextService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () =>
        {
            jest.spyOn(repository, 'count').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource.length)));
            expect(await service.main()).toBe(mockRepository.collectionSource.length);
        });
    });
});
