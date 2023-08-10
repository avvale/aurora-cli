import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerDeleteQueueByIdCommandHandler } from './queue-manager-delete-queue-by-id.command-handler';
import { queueManagerMockQueueData } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.data';
import { QueueManagerDeleteQueueByIdCommand } from './queue-manager-delete-queue-by-id.command';
import { QueueManagerDeleteQueueByIdService } from './queue-manager-delete-queue-by-id.service';

describe('QueueManagerDeleteQueueByIdCommandHandler', () =>
{
    let commandHandler: QueueManagerDeleteQueueByIdCommandHandler;
    let service: QueueManagerDeleteQueueByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerDeleteQueueByIdCommandHandler,
                {
                    provide : QueueManagerDeleteQueueByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerDeleteQueueByIdCommandHandler>(QueueManagerDeleteQueueByIdCommandHandler);
        service = module.get<QueueManagerDeleteQueueByIdService>(QueueManagerDeleteQueueByIdService);
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteQueueByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the QueueManagerDeleteQueueByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerDeleteQueueByIdCommand(
                    queueManagerMockQueueData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
