import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteAccessTokenByIdCommandHandler } from './o-auth-delete-access-token-by-id.command-handler';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token/infrastructure/mock/o-auth-mock-access-token.data';
import { OAuthDeleteAccessTokenByIdCommand } from './o-auth-delete-access-token-by-id.command';
import { OAuthDeleteAccessTokenByIdService } from './o-auth-delete-access-token-by-id.service';

describe('OAuthDeleteAccessTokenByIdCommandHandler', () =>
{
    let commandHandler: OAuthDeleteAccessTokenByIdCommandHandler;
    let service: OAuthDeleteAccessTokenByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteAccessTokenByIdCommandHandler,
                {
                    provide : OAuthDeleteAccessTokenByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthDeleteAccessTokenByIdCommandHandler>(OAuthDeleteAccessTokenByIdCommandHandler);
        service = module.get<OAuthDeleteAccessTokenByIdService>(OAuthDeleteAccessTokenByIdService);
    });

    describe('main', () =>
    {
        test('OAuthDeleteAccessTokenByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the OAuthDeleteAccessTokenByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthDeleteAccessTokenByIdCommand(
                    oAuthMockAccessTokenData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
