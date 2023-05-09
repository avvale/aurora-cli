import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteQueueByIdCommandHandler } from './delete-queue-by-id.command-handler';
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';
import { DeleteQueueByIdCommand } from './delete-queue-by-id.command';
import { DeleteQueueByIdService } from './delete-queue-by-id.service';

describe('DeleteQueueByIdCommandHandler', () =>
{
    let commandHandler: DeleteQueueByIdCommandHandler;
    let service: DeleteQueueByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteQueueByIdCommandHandler,
                {
                    provide : DeleteQueueByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<DeleteQueueByIdCommandHandler>(DeleteQueueByIdCommandHandler);
        service = module.get<DeleteQueueByIdService>(DeleteQueueByIdService);
    });

    describe('main', () =>
    {
        test('DeleteQueueByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteQueueByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteQueueByIdCommand(
                    queues[0].id,
                ),
            )).toBe(undefined);
        });
    });
});