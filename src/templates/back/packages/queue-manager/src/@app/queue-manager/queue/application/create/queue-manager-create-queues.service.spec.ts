/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    QueueManagerIQueueRepository,
    QueueManagerMockQueueRepository,
} from '@app/queue-manager/queue';
import { QueueManagerCreateQueuesService } from '@app/queue-manager/queue/application/create/queue-manager-create-queues.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateQueuesService', () => {
    let service: QueueManagerCreateQueuesService;
    let mockRepository: QueueManagerMockQueueRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerCreateQueuesService,
                QueueManagerMockQueueRepository,
                {
                    provide: QueueManagerIQueueRepository,
                    useValue: {
                        insert: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(QueueManagerCreateQueuesService);
        mockRepository = module.get(QueueManagerMockQueueRepository);
    });

    describe('main', () => {
        test('CreateQueuesService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create queues and emit event', async () => {
            expect(await service.main(mockRepository.collectionSource)).toBe(
                undefined,
            );
        });
    });
});
