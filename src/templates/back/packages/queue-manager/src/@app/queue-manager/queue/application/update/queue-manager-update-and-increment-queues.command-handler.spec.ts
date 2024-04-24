import { queueManagerMockQueueData, QueueManagerUpdateAndIncrementQueuesCommand } from '@app/queue-manager/queue';
import { QueueManagerUpdateAndIncrementQueuesCommandHandler } from '@app/queue-manager/queue/application/update/queue-manager-update-and-increment-queues.command-handler';
import { QueueManagerUpdateAndIncrementQueuesService } from '@app/queue-manager/queue/application/update/queue-manager-update-and-increment-queues.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateAndIncrementQueuesCommandHandler', () =>
{
    let commandHandler: QueueManagerUpdateAndIncrementQueuesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerUpdateAndIncrementQueuesCommandHandler,
                {
                    provide : QueueManagerUpdateAndIncrementQueuesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerUpdateAndIncrementQueuesCommandHandler>(QueueManagerUpdateAndIncrementQueuesCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementQueuesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an queues updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new QueueManagerUpdateAndIncrementQueuesCommand(
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
            /* eslint-enable key-spacing */
        });
    });
});
