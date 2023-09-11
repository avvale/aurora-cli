/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIRefreshTokenRepository, oAuthMockRefreshTokenData, OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token';
import { OAuthCreateRefreshTokenService } from '@app/o-auth/refresh-token/application/create/o-auth-create-refresh-token.service';
import {
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenId,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenToken,
} from '@app/o-auth/refresh-token/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateRefreshTokenService', () =>

{
    let service: OAuthCreateRefreshTokenService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthCreateRefreshTokenService,
                OAuthMockRefreshTokenRepository,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthCreateRefreshTokenService);
    });

    describe('main', () =>
    {
        test('OAuthCreateRefreshTokenService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a refreshToken and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new OAuthRefreshTokenId(oAuthMockRefreshTokenData[0].id),
                        accessTokenId: new OAuthRefreshTokenAccessTokenId(oAuthMockRefreshTokenData[0].accessTokenId),
                        expiredRefreshToken: new OAuthRefreshTokenExpiredRefreshToken(oAuthMockRefreshTokenData[0].expiredRefreshToken),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
