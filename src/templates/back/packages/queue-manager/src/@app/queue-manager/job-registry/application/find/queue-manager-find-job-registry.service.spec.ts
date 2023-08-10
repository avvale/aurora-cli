import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { QueueManagerFindJobRegistryService } from './queue-manager-find-job-registry.service';
import { QueueManagerIJobRegistryRepository } from '../../domain/queue-manager-job-registry.repository';
import { QueueManagerMockJobRegistryRepository } from '../../infrastructure/mock/queue-manager-mock-job-registry.repository';

describe('QueueManagerFindJobRegistryService', () =>
{
    let service: QueueManagerFindJobRegistryService;
    let repository: QueueManagerIJobRegistryRepository;
    let mockRepository: QueueManagerMockJobRegistryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerFindJobRegistryService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerFindJobRegistryService);
        repository = module.get(QueueManagerIJobRegistryRepository);
        mockRepository = module.get(QueueManagerMockJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerFindJobRegistryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find jobRegistry', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
