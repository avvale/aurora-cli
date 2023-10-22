/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerIQueueRepository, queueManagerMockQueueData, QueueManagerMockQueueRepository } from '@app/queue-manager/queue';
import { QueueManagerUpsertQueueService } from '@app/queue-manager/queue/application/upsert/queue-manager-upsert-queue.service';
import {
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
} from '@app/queue-manager/queue/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpsertQueueService', () =>

{
    let service: QueueManagerUpsertQueueService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerUpsertQueueService,
                QueueManagerMockQueueRepository,
                {
                    provide : QueueManagerIQueueRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerUpsertQueueService);
    });

    describe('main', () =>
    {
        test('QueueManagerUpsertQueueService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a queue and emit event', async () =>
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
