import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteClientsCommandHandler } from './delete-clients.command-handler';
import { DeleteClientsCommand } from './delete-clients.command';
import { DeleteClientsService } from './delete-clients.service';

describe('DeleteClientsCommandHandler', () =>
{
    let commandHandler: DeleteClientsCommandHandler;
    let service: DeleteClientsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteClientsCommandHandler,
                {
                    provide : DeleteClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<DeleteClientsCommandHandler>(DeleteClientsCommandHandler);
        service         = module.get<DeleteClientsService>(DeleteClientsService);
    });

    describe('main', () =>
    {
        test('DeleteClientsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteClientsCommand(),
            )).toBe(undefined);
        });
    });
});