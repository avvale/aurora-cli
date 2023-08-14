/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { QueueManagerCreateQueuesService } from './queue-manager-create-queues.service';
import { QueueManagerIQueueRepository } from '../../domain/queue-manager-queue.repository';
import { QueueManagerMockQueueRepository } from '../../infrastructure/mock/queue-manager-mock-queue.repository';

describe('QueueManagerCreateQueuesService', () =>
{
    let service: QueueManagerCreateQueuesService;
    let mockRepository: QueueManagerMockQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerCreateQueuesService,
                QueueManagerMockQueueRepository,
                {
                    provide : QueueManagerIQueueRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerCreateQueuesService);
        mockRepository = module.get(QueueManagerMockQueueRepository);
    });

    describe('main', () =>
    {
        test('CreateQueuesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create queues and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
