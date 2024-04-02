import { oAuthMockAccessTokenData, OAuthUpdateAndIncrementAccessTokensCommand } from '@app/o-auth/access-token';
import { OAuthUpdateAndIncrementAccessTokensCommandHandler } from '@app/o-auth/access-token/application/update/o-auth-update-and-increment-access-tokens.command-handler';
import { OAuthUpdateAndIncrementAccessTokensService } from '@app/o-auth/access-token/application/update/o-auth-update-and-increment-access-tokens.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateAndIncrementAccessTokensCommandHandler', () =>
{
    let commandHandler: OAuthUpdateAndIncrementAccessTokensCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateAndIncrementAccessTokensCommandHandler,
                {
                    provide : OAuthUpdateAndIncrementAccessTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateAndIncrementAccessTokensCommandHandler>(OAuthUpdateAndIncrementAccessTokensCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementAccessTokensCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an accessTokens updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new OAuthUpdateAndIncrementAccessTokensCommand(
                    {
                        id: oAuthMockAccessTokenData[0].id,
                        clientId: oAuthMockAccessTokenData[0].clientId,
                        accountId: oAuthMockAccessTokenData[0].accountId,
                        token: oAuthMockAccessTokenData[0].token,
                        name: oAuthMockAccessTokenData[0].name,
                        isRevoked: oAuthMockAccessTokenData[0].isRevoked,
                        expiresAt: oAuthMockAccessTokenData[0].expiresAt,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
