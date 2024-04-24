/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerIQueueRepository, queueManagerMockQueueData, QueueManagerMockQueueRepository } from '@app/queue-manager/queue';
import { QueueManagerUpdateAndIncrementQueuesService } from '@app/queue-manager/queue/application/update/queue-manager-update-and-increment-queues.service';
import {
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
} from '@app/queue-manager/queue/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateAndIncrementQueuesService', () =>
{
    let service: QueueManagerUpdateAndIncrementQueuesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerUpdateAndIncrementQueuesService,
                QueueManagerMockQueueRepository,
                {
                    provide : QueueManagerIQueueRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerUpdateAndIncrementQueuesService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementQueuesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a queues and emit event', async () =>
        {
            /* eslint-disable key-spacing */
            expect(
                await service.main(
                    {
                        id: new QueueManagerQueueId(queueManagerMockQueueData[0].id),
                        prefix: new QueueManagerQueuePrefix(queueManagerMockQueueData[0].prefix),
                        name: new QueueManagerQueueName(queueManagerMockQueueData[0].name),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
