import { oAuthMockRefreshTokenData, OAuthUpdateAndIncrementRefreshTokensCommand } from '@app/o-auth/refresh-token';
import { OAuthUpdateAndIncrementRefreshTokensCommandHandler } from '@app/o-auth/refresh-token/application/update/o-auth-update-and-increment-refresh-tokens.command-handler';
import { OAuthUpdateAndIncrementRefreshTokensService } from '@app/o-auth/refresh-token/application/update/o-auth-update-and-increment-refresh-tokens.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateAndIncrementRefreshTokensCommandHandler', () =>
{
    let commandHandler: OAuthUpdateAndIncrementRefreshTokensCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateAndIncrementRefreshTokensCommandHandler,
                {
                    provide : OAuthUpdateAndIncrementRefreshTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateAndIncrementRefreshTokensCommandHandler>(OAuthUpdateAndIncrementRefreshTokensCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementRefreshTokensCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an refreshTokens updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new OAuthUpdateAndIncrementRefreshTokensCommand(
                    {
                        id: oAuthMockRefreshTokenData[0].id,
                        accessTokenId: oAuthMockRefreshTokenData[0].accessTokenId,
                        token: oAuthMockRefreshTokenData[0].token,
                        isRevoked: oAuthMockRefreshTokenData[0].isRevoked,
                        expiresAt: oAuthMockRefreshTokenData[0].expiresAt,
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
