import {
    QueueManagerIQueueRepository,
    QueueManagerMockQueueRepository,
} from '@app/queue-manager/queue';
import { QueueManagerFindQueueService } from '@app/queue-manager/queue/application/find/queue-manager-find-queue.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindQueueService', () => {
    let service: QueueManagerFindQueueService;
    let repository: QueueManagerIQueueRepository;
    let mockRepository: QueueManagerMockQueueRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerFindQueueService,
                QueueManagerMockQueueRepository,
                {
                    provide: QueueManagerIQueueRepository,
                    useValue: {
                        find: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(QueueManagerFindQueueService);
        repository = module.get(QueueManagerIQueueRepository);
        mockRepository = module.get(QueueManagerMockQueueRepository);
    });

    describe('main', () => {
        test('QueueManagerFindQueueService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find queue', async () => {
            jest.spyOn(repository, 'find').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource[0],
            );
        });
    });
});
