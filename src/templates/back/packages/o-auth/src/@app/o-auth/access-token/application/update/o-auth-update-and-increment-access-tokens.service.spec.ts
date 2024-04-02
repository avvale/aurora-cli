/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIAccessTokenRepository, oAuthMockAccessTokenData, OAuthMockAccessTokenRepository } from '@app/o-auth/access-token';
import { OAuthUpdateAndIncrementAccessTokensService } from '@app/o-auth/access-token/application/update/o-auth-update-and-increment-access-tokens.service';
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

describe('OAuthUpdateAndIncrementAccessTokensService', () =>
{
    let service: OAuthUpdateAndIncrementAccessTokensService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpdateAndIncrementAccessTokensService,
                OAuthMockAccessTokenRepository,
                {
                    provide : OAuthIAccessTokenRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpdateAndIncrementAccessTokensService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementAccessTokensService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a accessTokens and emit event', async () =>
        {
            /* eslint-disable key-spacing */
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
                    {},
                    {},
                ),
            )
                .toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
