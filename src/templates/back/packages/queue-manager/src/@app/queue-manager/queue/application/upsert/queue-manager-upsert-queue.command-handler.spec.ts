import { queueManagerMockQueueData, QueueManagerUpsertQueueCommand } from '@app/queue-manager/queue';
import { QueueManagerUpsertQueueCommandHandler } from '@app/queue-manager/queue/application/upsert/queue-manager-upsert-queue.command-handler';
import { QueueManagerUpsertQueueService } from '@app/queue-manager/queue/application/upsert/queue-manager-upsert-queue.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpsertQueueCommandHandler', () =>
{
    let commandHandler: QueueManagerUpsertQueueCommandHandler;
    let service: QueueManagerUpsertQueueService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerUpsertQueueCommandHandler,
                {
                    provide : QueueManagerUpsertQueueService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerUpsertQueueCommandHandler>(QueueManagerUpsertQueueCommandHandler);
        service = module.get<QueueManagerUpsertQueueService>(QueueManagerUpsertQueueService);
    });

    describe('main', () =>
    {
        test('UpsertQueueCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the QueueManagerUpsertQueueService', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerUpsertQueueCommand(
                    {
                        id: queueManagerMockQueueData[0].id,
                        prefix: queueManagerMockQueueData[0].prefix,
                        name: queueManagerMockQueueData[0].name,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
