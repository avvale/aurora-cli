/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token/infrastructure/mock/o-auth-mock-access-token.data';
import { OAuthCreateAccessTokenService } from './o-auth-create-access-token.service';
import {
    OAuthAccessTokenId,
    OAuthAccessTokenClientId,
    OAuthAccessTokenAccountId,
    OAuthAccessTokenToken,
    OAuthAccessTokenName,
    OAuthAccessTokenIsRevoked,
    OAuthAccessTokenExpiresAt,
    OAuthAccessTokenCreatedAt,
    OAuthAccessTokenUpdatedAt,
    OAuthAccessTokenDeletedAt,
} from '../../domain/value-objects';
import { OAuthIAccessTokenRepository } from '../../domain/o-auth-access-token.repository';
import { OAuthMockAccessTokenRepository } from '../../infrastructure/mock/o-auth-mock-access-token.repository';

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
