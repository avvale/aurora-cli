import { QueueManagerIQueueRepository, QueueManagerMockQueueRepository } from '@app/queue-manager/queue';
import { QueueManagerMaxQueueService } from '@app/queue-manager/queue/application/max/queue-manager-max-queue.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerMaxQueueService', () =>
{
    let service: QueueManagerMaxQueueService;
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
                QueueManagerMaxQueueService,
                QueueManagerMockQueueRepository,
                {
                    provide : QueueManagerIQueueRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerMaxQueueService);
        repository = module.get(QueueManagerIQueueRepository);
        mockRepository = module.get(QueueManagerMockQueueRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerMaxQueueService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(repository, 'max').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.max(column))));
            expect(await service.main('id')).toBe(mockRepository.max('id'));
        });
    });
});
