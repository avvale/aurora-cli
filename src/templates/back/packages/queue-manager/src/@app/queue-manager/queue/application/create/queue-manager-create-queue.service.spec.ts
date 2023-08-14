/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { queueManagerMockQueueData } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.data';
import { QueueManagerCreateQueueService } from './queue-manager-create-queue.service';
import {
    QueueManagerQueueId,
    QueueManagerQueuePrefix,
    QueueManagerQueueName,
    QueueManagerQueueCreatedAt,
    QueueManagerQueueUpdatedAt,
    QueueManagerQueueDeletedAt,
} from '../../domain/value-objects';
import { QueueManagerIQueueRepository } from '../../domain/queue-manager-queue.repository';
import { QueueManagerMockQueueRepository } from '../../infrastructure/mock/queue-manager-mock-queue.repository';

describe('QueueManagerCreateQueueService', () =>

{
    let service: QueueManagerCreateQueueService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerCreateQueueService,
                QueueManagerMockQueueRepository,
                {
                    provide : QueueManagerIQueueRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerCreateQueueService);
    });

    describe('main', () =>
    {
        test('QueueManagerCreateQueueService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a queue and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new QueueManagerQueueId(queueManagerMockQueueData[0].id),
                        prefix: new QueueManagerQueuePrefix(queueManagerMockQueueData[0].prefix),
                        name: new QueueManagerQueueName(queueManagerMockQueueData[0].name),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
