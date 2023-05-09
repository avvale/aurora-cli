/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';
import { UpdateQueuesService } from './update-queues.service';
import {
    QueueId,
    QueuePrefix,
    QueueName,
    QueueCreatedAt,
    QueueUpdatedAt,
    QueueDeletedAt,
} from '../../domain/value-objects';
import { IQueueRepository } from '../../domain/queue.repository';
import { MockQueueRepository } from '../../infrastructure/mock/mock-queue.repository';

describe('UpdateQueuesService', () =>
{
    let service: UpdateQueuesService;
    let repository: IQueueRepository;
    let mockRepository: MockQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateQueuesService,
                MockQueueRepository,
                {
                    provide : IQueueRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(UpdateQueuesService);
        repository = module.get(IQueueRepository);
        mockRepository = module.get(MockQueueRepository);
    });

    describe('main', () =>
    {
        test('UpdateQueuesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a queues and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new QueueId(queues[0].id),
                    prefix: new QueuePrefix(queues[0].prefix),
                    name: new QueueName(queues[0].name),
                },
            )).toBe(undefined);
        });
    });
});