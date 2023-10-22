/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerIQueueRepository, queueManagerMockQueueData, QueueManagerMockQueueRepository } from '@app/queue-manager/queue';
import { QueueManagerUpdateQueueByIdService } from '@app/queue-manager/queue/application/update/queue-manager-update-queue-by-id.service';
import {
    QueueManagerQueueId,
    QueueManagerQueueName,
    QueueManagerQueuePrefix,
} from '@app/queue-manager/queue/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateQueueByIdService', () =>
{
    let service: QueueManagerUpdateQueueByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerUpdateQueueByIdService,
                QueueManagerMockQueueRepository,
                {
                    provide : QueueManagerIQueueRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerUpdateQueueByIdService);
    });

    describe('main', () =>
    {
        test('QueueManagerUpdateQueueByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a queue and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new QueueManagerQueueId(queueManagerMockQueueData[0].id),
                        prefix: new QueueManagerQueuePrefix(queueManagerMockQueueData[0].prefix),
                        name: new QueueManagerQueueName(queueManagerMockQueueData[0].name),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
