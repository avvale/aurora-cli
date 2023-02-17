import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteHttpCommunicationsCommandHandler } from './delete-http-communications.command-handler';
import { DeleteHttpCommunicationsCommand } from './delete-http-communications.command';
import { DeleteHttpCommunicationsService } from './delete-http-communications.service';

describe('DeleteHttpCommunicationsCommandHandler', () =>
{
    let commandHandler: DeleteHttpCommunicationsCommandHandler;
    let service: DeleteHttpCommunicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteHttpCommunicationsCommandHandler,
                {
                    provide : DeleteHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteHttpCommunicationsCommandHandler>(DeleteHttpCommunicationsCommandHandler);
        service         = module.get<DeleteHttpCommunicationsService>(DeleteHttpCommunicationsService);
    });

    describe('main', () =>
    {
        test('DeleteHttpCommunicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteHttpCommunicationsCommand(),
            )).toBe(undefined);
        });
    });
});