import { OAuthCreateAccessTokenCommandHandler } from './o-auth-create-access-token.command-handler';
import { OAuthCreateAccessTokenService } from './o-auth-create-access-token.service';
import { OAuthCreateAccessTokenCommand, oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateAccessTokenCommandHandler', () =>
{
    let commandHandler: OAuthCreateAccessTokenCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateAccessTokenCommandHandler,
                {
                    provide : OAuthCreateAccessTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthCreateAccessTokenCommandHandler>(OAuthCreateAccessTokenCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateAccessTokenCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the OAuthCreateAccessTokenService', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthCreateAccessTokenCommand(
                    {
                        id: oAuthMockAccessTokenData[0].id,
                        clientId: oAuthMockAccessTokenData[0].clientId,
                        accountId: oAuthMockAccessTokenData[0].accountId,
                        token: oAuthMockAccessTokenData[0].token,
                        name: oAuthMockAccessTokenData[0].name,
                        isRevoked: oAuthMockAccessTokenData[0].isRevoked,
                        expiresAt: oAuthMockAccessTokenData[0].expiresAt,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
