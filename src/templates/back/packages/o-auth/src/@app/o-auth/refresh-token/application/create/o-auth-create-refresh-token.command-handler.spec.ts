import {
    OAuthCreateRefreshTokenCommand,
    oAuthMockRefreshTokenData,
} from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';
import { OAuthCreateRefreshTokenCommandHandler } from './o-auth-create-refresh-token.command-handler';
import { OAuthCreateRefreshTokenService } from './o-auth-create-refresh-token.service';

describe('OAuthCreateRefreshTokenCommandHandler', () => {
    let commandHandler: OAuthCreateRefreshTokenCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateRefreshTokenCommandHandler,
                {
                    provide: OAuthCreateRefreshTokenService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<OAuthCreateRefreshTokenCommandHandler>(
            OAuthCreateRefreshTokenCommandHandler,
        );
    });

    describe('main', () => {
        test('CreateRefreshTokenCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the OAuthCreateRefreshTokenService', async () => {
            expect(
                await commandHandler.execute(
                    new OAuthCreateRefreshTokenCommand(
                        {
                            id: oAuthMockRefreshTokenData[0].id,
                            rowId: oAuthMockRefreshTokenData[0].rowId,
                            accessTokenId:
                                oAuthMockRefreshTokenData[0].accessTokenId,
                            token: oAuthMockRefreshTokenData[0].token,
                            isRevoked: oAuthMockRefreshTokenData[0].isRevoked,
                            expiresAt: oAuthMockRefreshTokenData[0].expiresAt,
                        },
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
