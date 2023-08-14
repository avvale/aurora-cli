/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { queueManagerMockQueueData } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.data';
import { QueueManagerUpsertQueueService } from './queue-manager-upsert-queue.service';
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
