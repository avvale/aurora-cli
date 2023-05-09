import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';
import { CreateQueueCommandHandler } from './create-queue.command-handler';
import { CreateQueueCommand } from './create-queue.command';
import { CreateQueueService } from './create-queue.service';

describe('CreateQueueCommandHandler', () =>
{
    let commandHandler: CreateQueueCommandHandler;
    let service: CreateQueueService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateQueueCommandHandler,
                {
                    provide : CreateQueueService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CreateQueueCommandHandler>(CreateQueueCommandHandler);
        service = module.get<CreateQueueService>(CreateQueueService);
    });

    describe('main', () =>
    {
        test('CreateQueueCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateQueueService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateQueueCommand(
                    {
                        id: queues[0].id,
                        prefix: queues[0].prefix,
                        name: queues[0].name,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});