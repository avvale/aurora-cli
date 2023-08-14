/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { QueueManagerDeleteQueuesService } from './queue-manager-delete-queues.service';
import { QueueManagerIQueueRepository } from '../../domain/queue-manager-queue.repository';
import { QueueManagerMockQueueRepository } from '../../infrastructure/mock/queue-manager-mock-queue.repository';

describe('QueueManagerDeleteQueuesService', () =>
{
    let service: QueueManagerDeleteQueuesService;
    let repository: QueueManagerIQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerDeleteQueuesService,
                QueueManagerMockQueueRepository,
                {
                    provide : QueueManagerIQueueRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerDeleteQueuesService);
        repository = module.get(QueueManagerIQueueRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteQueuesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete queue and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
