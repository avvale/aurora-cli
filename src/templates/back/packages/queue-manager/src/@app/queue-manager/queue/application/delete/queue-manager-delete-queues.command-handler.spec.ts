import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerDeleteQueuesCommandHandler } from './queue-manager-delete-queues.command-handler';
import { QueueManagerDeleteQueuesCommand } from './queue-manager-delete-queues.command';
import { QueueManagerDeleteQueuesService } from './queue-manager-delete-queues.service';

describe('QueueManagerDeleteQueuesCommandHandler', () =>
{
    let commandHandler: QueueManagerDeleteQueuesCommandHandler;
    let service: QueueManagerDeleteQueuesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerDeleteQueuesCommandHandler,
                {
                    provide : QueueManagerDeleteQueuesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<QueueManagerDeleteQueuesCommandHandler>(QueueManagerDeleteQueuesCommandHandler);
        service = module.get<QueueManagerDeleteQueuesService>(QueueManagerDeleteQueuesService);
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteQueuesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new QueueManagerDeleteQueuesCommand(),
            )).toBe(undefined);
        });
    });
});
