/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { queueManagerMockQueueData } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.data';
import { QueueManagerCreateQueuesCommandHandler } from './queue-manager-create-queues.command-handler';
import { QueueManagerCreateQueuesCommand } from './queue-manager-create-queues.command';
import { QueueManagerCreateQueuesService } from './queue-manager-create-queues.service';

describe('queueManagerCreateQueuesCommandHandler', () =>
{
    let commandHandler: QueueManagerCreateQueuesCommandHandler;
    let service: QueueManagerCreateQueuesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerCreateQueuesCommandHandler,
                {
                    provide : QueueManagerCreateQueuesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerCreateQueuesCommandHandler>(QueueManagerCreateQueuesCommandHandler);
        service = module.get<QueueManagerCreateQueuesService>(QueueManagerCreateQueuesService);
    });

    describe('main', () =>
    {
        test('QueueManagerCreateQueuesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return QueueManagerMockQueueData createds', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerCreateQueuesCommand(
                    queueManagerMockQueueData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
