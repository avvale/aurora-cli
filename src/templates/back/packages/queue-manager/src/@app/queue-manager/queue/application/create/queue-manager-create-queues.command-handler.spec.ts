import { QueueManagerCreateQueuesCommand, queueManagerMockQueueData } from '@app/queue-manager/queue';
import { QueueManagerCreateQueuesCommandHandler } from '@app/queue-manager/queue/application/create/queue-manager-create-queues.command-handler';
import { QueueManagerCreateQueuesService } from '@app/queue-manager/queue/application/create/queue-manager-create-queues.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('queueManagerCreateQueuesCommandHandler', () =>
{
    let commandHandler: QueueManagerCreateQueuesCommandHandler;

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
    });

    describe('main', () =>
    {
        test('QueueManagerCreateQueuesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return QueueManagerMockQueueData created', async () =>
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
