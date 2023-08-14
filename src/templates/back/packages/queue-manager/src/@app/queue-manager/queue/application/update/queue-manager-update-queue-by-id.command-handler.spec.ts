import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { queueManagerMockQueueData } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.data';
import { QueueManagerUpdateQueueByIdCommandHandler } from './queue-manager-update-queue-by-id.command-handler';
import { QueueManagerUpdateQueueByIdCommand } from './queue-manager-update-queue-by-id.command';
import { QueueManagerUpdateQueueByIdService } from './queue-manager-update-queue-by-id.service';

describe('QueueManagerUpdateQueueByIdCommandHandler', () =>
{
    let commandHandler: QueueManagerUpdateQueueByIdCommandHandler;
    let service: QueueManagerUpdateQueueByIdService;

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
        service = module.get<QueueManagerUpdateQueueByIdService>(QueueManagerUpdateQueueByIdService);
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
