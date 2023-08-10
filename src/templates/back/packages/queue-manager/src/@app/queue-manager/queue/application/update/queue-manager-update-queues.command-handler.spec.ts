import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { queueManagerMockQueueData } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.data';
import { QueueManagerUpdateQueuesCommandHandler } from './queue-manager-update-queues.command-handler';
import { QueueManagerUpdateQueuesCommand } from './queue-manager-update-queues.command';
import { QueueManagerUpdateQueuesService } from './queue-manager-update-queues.service';

describe('QueueManagerUpdateQueuesCommandHandler', () =>
{
    let commandHandler: QueueManagerUpdateQueuesCommandHandler;
    let service: QueueManagerUpdateQueuesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerUpdateQueuesCommandHandler,
                {
                    provide : QueueManagerUpdateQueuesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerUpdateQueuesCommandHandler>(QueueManagerUpdateQueuesCommandHandler);
        service = module.get<QueueManagerUpdateQueuesService>(QueueManagerUpdateQueuesService);
    });

    describe('main', () =>
    {
        test('UpdateQueuesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an queues updated', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerUpdateQueuesCommand(
                    {
                        id: queueManagerMockQueueData[0].id,
                        prefix: queueManagerMockQueueData[0].prefix,
                        name: queueManagerMockQueueData[0].name,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
