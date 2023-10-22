import { queueManagerMockQueueData, QueueManagerUpdateQueueByIdCommand } from '@app/queue-manager/queue';
import { QueueManagerUpdateQueueByIdCommandHandler } from '@app/queue-manager/queue/application/update/queue-manager-update-queue-by-id.command-handler';
import { QueueManagerUpdateQueueByIdService } from '@app/queue-manager/queue/application/update/queue-manager-update-queue-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpdateQueueByIdCommandHandler', () =>
{
    let commandHandler: QueueManagerUpdateQueueByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerUpdateQueueByIdCommandHandler,
                {
                    provide : QueueManagerUpdateQueueByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerUpdateQueueByIdCommandHandler>(QueueManagerUpdateQueueByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateQueueByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an queue created', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerUpdateQueueByIdCommand(
                    {
                        id: queueManagerMockQueueData[0].id,
                        prefix: queueManagerMockQueueData[0].prefix,
                        name: queueManagerMockQueueData[0].name,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
