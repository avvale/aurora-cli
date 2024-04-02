/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIRefreshTokenRepository, oAuthMockRefreshTokenData, OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token';
import { OAuthUpdateAndIncrementRefreshTokensService } from '@app/o-auth/refresh-token/application/update/o-auth-update-and-increment-refresh-tokens.service';
import {
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenId,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenToken,
} from '@app/o-auth/refresh-token/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateAndIncrementRefreshTokensService', () =>
{
    let service: OAuthUpdateAndIncrementRefreshTokensService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpdateAndIncrementRefreshTokensService,
                OAuthMockRefreshTokenRepository,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpdateAndIncrementRefreshTokensService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementRefreshTokensService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a refreshTokens and emit event', async () =>
        {
            /* eslint-disable key-spacing */
            expect(
                await service.main(
                    {
                        id: new OAuthRefreshTokenId(oAuthMockRefreshTokenData[0].id),
                        accessTokenId: new OAuthRefreshTokenAccessTokenId(oAuthMockRefreshTokenData[0].accessTokenId),
                        token: new OAuthRefreshTokenToken(oAuthMockRefreshTokenData[0].token),
                        isRevoked: new OAuthRefreshTokenIsRevoked(oAuthMockRefreshTokenData[0].isRevoked),
                        expiresAt: new OAuthRefreshTokenExpiresAt(oAuthMockRefreshTokenData[0].expiresAt),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
