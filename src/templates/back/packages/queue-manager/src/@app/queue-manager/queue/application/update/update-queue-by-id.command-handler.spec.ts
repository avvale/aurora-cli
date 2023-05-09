import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';
import { UpdateQueueByIdCommandHandler } from './update-queue-by-id.command-handler';
import { UpdateQueueByIdCommand } from './update-queue-by-id.command';
import { UpdateQueueByIdService } from './update-queue-by-id.service';

describe('UpdateQueueByIdCommandHandler', () =>
{
    let commandHandler: UpdateQueueByIdCommandHandler;
    let service: UpdateQueueByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateQueueByIdCommandHandler,
                {
                    provide : UpdateQueueByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpdateQueueByIdCommandHandler>(UpdateQueueByIdCommandHandler);
        service = module.get<UpdateQueueByIdService>(UpdateQueueByIdService);
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
                new UpdateQueueByIdCommand(
                    {
                        id: queues[0].id,
                        prefix: queues[0].prefix,
                        name: queues[0].name,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});