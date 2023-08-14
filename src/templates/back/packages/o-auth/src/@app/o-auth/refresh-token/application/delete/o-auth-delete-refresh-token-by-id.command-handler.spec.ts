import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteRefreshTokenByIdCommandHandler } from './o-auth-delete-refresh-token-by-id.command-handler';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token/infrastructure/mock/o-auth-mock-refresh-token.data';
import { OAuthDeleteRefreshTokenByIdCommand } from './o-auth-delete-refresh-token-by-id.command';
import { OAuthDeleteRefreshTokenByIdService } from './o-auth-delete-refresh-token-by-id.service';

describe('OAuthDeleteRefreshTokenByIdCommandHandler', () =>
{
    let commandHandler: OAuthDeleteRefreshTokenByIdCommandHandler;
    let service: OAuthDeleteRefreshTokenByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteRefreshTokenByIdCommandHandler,
                {
                    provide : OAuthDeleteRefreshTokenByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthDeleteRefreshTokenByIdCommandHandler>(OAuthDeleteRefreshTokenByIdCommandHandler);
        service = module.get<OAuthDeleteRefreshTokenByIdService>(OAuthDeleteRefreshTokenByIdService);
    });

    describe('main', () =>
    {
        test('OAuthDeleteRefreshTokenByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the OAuthDeleteRefreshTokenByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthDeleteRefreshTokenByIdCommand(
                    oAuthMockRefreshTokenData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
