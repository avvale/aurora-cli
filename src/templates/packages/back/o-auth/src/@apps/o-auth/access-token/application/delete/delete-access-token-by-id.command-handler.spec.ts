import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAccessTokenByIdCommandHandler } from './delete-access-token-by-id.command-handler';
import { accessTokens } from '@app/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { DeleteAccessTokenByIdCommand } from './delete-access-token-by-id.command';
import { DeleteAccessTokenByIdService } from './delete-access-token-by-id.service';

describe('DeleteAccessTokenByIdCommandHandler', () =>
{
    let commandHandler: DeleteAccessTokenByIdCommandHandler;
    let service: DeleteAccessTokenByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAccessTokenByIdCommandHandler,
                {
                    provide : DeleteAccessTokenByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteAccessTokenByIdCommandHandler>(DeleteAccessTokenByIdCommandHandler);
        service         = module.get<DeleteAccessTokenByIdService>(DeleteAccessTokenByIdService);
    });

    describe('main', () =>
    {
        test('DeleteAccessTokenByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteAccessTokenByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAccessTokenByIdCommand(
                    accessTokens[0].id,
                ),
            )).toBe(undefined);
        });
    });
});