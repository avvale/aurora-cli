/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIAccessTokenRepository, oAuthMockAccessTokenData, OAuthMockAccessTokenRepository } from '@app/o-auth/access-token';
import { OAuthCreateAccessTokenService } from '@app/o-auth/access-token/application/create/o-auth-create-access-token.service';
import {
    OAuthAccessTokenAccountId,
    OAuthAccessTokenClientId,
    OAuthAccessTokenExpiresAt,
    OAuthAccessTokenId,
    OAuthAccessTokenIsRevoked,
    OAuthAccessTokenName,
    OAuthAccessTokenToken,
} from '@app/o-auth/access-token/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateAccessTokenService', () =>

{
    let service: OAuthCreateAccessTokenService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthCreateAccessTokenService,
                OAuthMockAccessTokenRepository,
                {
                    provide : OAuthIAccessTokenRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthCreateAccessTokenService);
    });

    describe('main', () =>
    {
        test('OAuthCreateAccessTokenService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a accessToken and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new OAuthAccessTokenId(oAuthMockAccessTokenData[0].id),
                        clientId: new OAuthAccessTokenClientId(oAuthMockAccessTokenData[0].clientId),
                        accountId: new OAuthAccessTokenAccountId(oAuthMockAccessTokenData[0].accountId),
                        token: new OAuthAccessTokenToken(oAuthMockAccessTokenData[0].token),
                        name: new OAuthAccessTokenName(oAuthMockAccessTokenData[0].name),
                        isRevoked: new OAuthAccessTokenIsRevoked(oAuthMockAccessTokenData[0].isRevoked),
                        expiresAt: new OAuthAccessTokenExpiresAt(oAuthMockAccessTokenData[0].expiresAt),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
