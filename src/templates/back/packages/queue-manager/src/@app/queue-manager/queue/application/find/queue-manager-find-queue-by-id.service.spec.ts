import {
    QueueManagerIQueueRepository,
    queueManagerMockQueueData,
    QueueManagerMockQueueRepository,
} from '@app/queue-manager/queue';
import { QueueManagerFindQueueByIdService } from '@app/queue-manager/queue/application/find/queue-manager-find-queue-by-id.service';
import { QueueManagerQueueId } from '@app/queue-manager/queue/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindQueueByIdService', () => {
    let service: QueueManagerFindQueueByIdService;
    let repository: QueueManagerIQueueRepository;
    let mockRepository: QueueManagerMockQueueRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerFindQueueByIdService,
                QueueManagerMockQueueRepository,
                {
                    provide: QueueManagerIQueueRepository,
                    useValue: {
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(QueueManagerFindQueueByIdService);
        repository = module.get(QueueManagerIQueueRepository);
        mockRepository = module.get(QueueManagerMockQueueRepository);
    });

    describe('main', () => {
        test('FindQueueByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find queue by id', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new QueueManagerQueueId(queueManagerMockQueueData[0].id),
                ),
            ).toBe(mockRepository.collectionSource[0]);
        });
    });
});
