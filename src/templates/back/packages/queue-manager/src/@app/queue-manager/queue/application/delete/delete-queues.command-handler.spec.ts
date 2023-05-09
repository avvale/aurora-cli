import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteQueuesCommandHandler } from './delete-queues.command-handler';
import { DeleteQueuesCommand } from './delete-queues.command';
import { DeleteQueuesService } from './delete-queues.service';

describe('DeleteQueuesCommandHandler', () =>
{
    let commandHandler: DeleteQueuesCommandHandler;
    let service: DeleteQueuesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteQueuesCommandHandler,
                {
                    provide : DeleteQueuesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<DeleteQueuesCommandHandler>(DeleteQueuesCommandHandler);
        service = module.get<DeleteQueuesService>(DeleteQueuesService);
    });

    describe('main', () =>
    {
        test('DeleteQueuesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteQueuesCommand(),
            )).toBe(undefined);
        });
    });
});