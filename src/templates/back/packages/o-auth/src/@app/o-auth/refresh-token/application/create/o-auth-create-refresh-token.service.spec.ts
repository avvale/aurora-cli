/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token/infrastructure/mock/o-auth-mock-refresh-token.data';
import { OAuthCreateRefreshTokenService } from './o-auth-create-refresh-token.service';
import {
    OAuthRefreshTokenId,
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenToken,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenCreatedAt,
    OAuthRefreshTokenUpdatedAt,
    OAuthRefreshTokenDeletedAt,
    OAuthRefreshTokenExpiredRefreshToken,
} from '../../domain/value-objects';
import { OAuthIRefreshTokenRepository } from '../../domain/o-auth-refresh-token.repository';
import { OAuthMockRefreshTokenRepository } from '../../infrastructure/mock/o-auth-mock-refresh-token.repository';

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
