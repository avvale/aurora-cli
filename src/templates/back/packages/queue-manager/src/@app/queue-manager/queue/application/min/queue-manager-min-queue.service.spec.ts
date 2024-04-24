import { QueueManagerIQueueRepository, QueueManagerMockQueueRepository } from '@app/queue-manager/queue';
import { QueueManagerMinQueueService } from '@app/queue-manager/queue/application/min/queue-manager-min-queue.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerMinQueueService', () =>
{
    let service: QueueManagerMinQueueService;
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
                QueueManagerMinQueueService,
                QueueManagerMockQueueRepository,
                {
                    provide : QueueManagerIQueueRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerMinQueueService);
        repository = module.get(QueueManagerIQueueRepository);
        mockRepository = module.get(QueueManagerMockQueueRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerMinQueueService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(repository, 'min').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.min(column))));
            expect(await service.main('id')).toBe(mockRepository.min('id'));
        });
    });
});
