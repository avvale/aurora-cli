import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteClientByIdCommandHandler } from './delete-client-by-id.command-handler';
import { clients } from '../../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';
import { DeleteClientByIdCommand } from './delete-client-by-id.command';
import { DeleteClientByIdService } from './delete-client-by-id.service';

describe('DeleteClientByIdCommandHandler', () =>
{
    let commandHandler: DeleteClientByIdCommandHandler;
    let service: DeleteClientByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteClientByIdCommandHandler,
                {
                    provide : DeleteClientByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteClientByIdCommandHandler>(DeleteClientByIdCommandHandler);
        service         = module.get<DeleteClientByIdService>(DeleteClientByIdService);
    });

    describe('main', () =>
    {
        test('DeleteClientByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteClientByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteClientByIdCommand(
                    clients[0].id,
                ),
            )).toBe(undefined);
        });
    });
});