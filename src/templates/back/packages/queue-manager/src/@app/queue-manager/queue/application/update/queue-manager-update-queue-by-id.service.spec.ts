/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { queueManagerMockQueueData } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.data';
import { QueueManagerUpdateQueueByIdService } from './queue-manager-update-queue-by-id.service';
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
