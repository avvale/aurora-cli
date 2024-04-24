import { QueueManagerIQueueRepository, QueueManagerMockQueueRepository } from '@app/queue-manager/queue';
import { QueueManagerSumQueueService } from '@app/queue-manager/queue/application/sum/queue-manager-sum-queue.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerSumQueueService', () =>
{
    let service: QueueManagerSumQueueService;
    let repository: QueueManagerIQueueRepository;
    let mockRepository: QueueManagerMockQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerSumQueueService,
                QueueManagerMockQueueRepository,
                {
                    provide : QueueManagerIQueueRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerSumQueueService);
        repository = module.get(QueueManagerIQueueRepository);
        mockRepository = module.get(QueueManagerMockQueueRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerSumQueueService should be defined', () =>
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
