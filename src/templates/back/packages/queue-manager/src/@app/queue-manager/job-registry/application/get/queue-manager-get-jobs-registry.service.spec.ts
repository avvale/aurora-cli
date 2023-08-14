import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { QueueManagerGetJobsRegistryService } from './queue-manager-get-jobs-registry.service';
import { QueueManagerIJobRegistryRepository } from '../../domain/queue-manager-job-registry.repository';
import { QueueManagerMockJobRegistryRepository } from '../../infrastructure/mock/queue-manager-mock-job-registry.repository';

describe('QueueManagerGetJobsRegistryService', () =>
{
    let service: QueueManagerGetJobsRegistryService;
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
                QueueManagerGetJobsRegistryService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerGetJobsRegistryService);
        repository = module.get(QueueManagerIJobRegistryRepository);
        mockRepository = module.get(QueueManagerMockJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('GetJobsRegistryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get jobsRegistry', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
