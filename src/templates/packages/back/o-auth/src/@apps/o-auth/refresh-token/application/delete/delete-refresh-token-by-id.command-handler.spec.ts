import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteRefreshTokenByIdCommandHandler } from './delete-refresh-token-by-id.command-handler';
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { DeleteRefreshTokenByIdCommand } from './delete-refresh-token-by-id.command';
import { DeleteRefreshTokenByIdService } from './delete-refresh-token-by-id.service';

describe('DeleteRefreshTokenByIdCommandHandler', () =>
{
    let commandHandler: DeleteRefreshTokenByIdCommandHandler;
    let service: DeleteRefreshTokenByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteRefreshTokenByIdCommandHandler,
                {
                    provide : DeleteRefreshTokenByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<DeleteRefreshTokenByIdCommandHandler>(DeleteRefreshTokenByIdCommandHandler);
        service         = module.get<DeleteRefreshTokenByIdService>(DeleteRefreshTokenByIdService);
    });

    describe('main', () =>
    {
        test('DeleteRefreshTokenByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteRefreshTokenByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteRefreshTokenByIdCommand(
                    refreshTokens[0].id,
                ),
            )).toBe(undefined);
        });
    });
});