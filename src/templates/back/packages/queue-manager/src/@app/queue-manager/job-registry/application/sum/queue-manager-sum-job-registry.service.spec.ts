import { QueueManagerIJobRegistryRepository, QueueManagerMockJobRegistryRepository } from '@app/queue-manager/job-registry';
import { QueueManagerSumJobRegistryService } from '@app/queue-manager/job-registry/application/sum/queue-manager-sum-job-registry.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerSumJobRegistryService', () =>
{
    let service: QueueManagerSumJobRegistryService;
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
                QueueManagerSumJobRegistryService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerSumJobRegistryService);
        repository = module.get(QueueManagerIJobRegistryRepository);
        mockRepository = module.get(QueueManagerMockJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerSumJobRegistryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(repository, 'sum').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.sum(column))));
            expect(await service.main('id')).toBe(mockRepository.sum('id'));
        });
    });
});
