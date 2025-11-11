/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthIClientRepository,
    oAuthMockClientData,
    OAuthMockClientRepository,
} from '@app/o-auth/client';
import { OAuthCreateClientService } from '@app/o-auth/client/application/create/o-auth-create-client.service';
import {
    OAuthClientApplicationIds,
    OAuthClientAuthUrl,
    OAuthClientExpiredAccessToken,
    OAuthClientExpiredRefreshToken,
    OAuthClientGrantType,
    OAuthClientId,
    OAuthClientIsActive,
    OAuthClientIsMaster,
    OAuthClientName,
    OAuthClientRedirect,
    OAuthClientRowId,
    OAuthClientScopeOptions,
    OAuthClientSecret,
} from '@app/o-auth/client/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateClientService', () => {
    let service: OAuthCreateClientService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthCreateClientService,
                OAuthMockClientRepository,
                {
                    provide: OAuthIClientRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthCreateClientService);
    });

    describe('main', () => {
        test('OAuthCreateClientService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a client and emit event', async () => {
            expect(
                await service.main({
                    id: new OAuthClientId(oAuthMockClientData[0].id),
                    rowId: new OAuthClientRowId(oAuthMockClientData[0].rowId),
                    grantType: new OAuthClientGrantType(
                        oAuthMockClientData[0].grantType,
                    ),
                    name: new OAuthClientName(oAuthMockClientData[0].name),
                    secret: new OAuthClientSecret(
                        oAuthMockClientData[0].secret,
                    ),
                    authUrl: new OAuthClientAuthUrl(
                        oAuthMockClientData[0].authUrl,
                    ),
                    redirect: new OAuthClientRedirect(
                        oAuthMockClientData[0].redirect,
                    ),
                    scopeOptions: new OAuthClientScopeOptions(
                        oAuthMockClientData[0].scopeOptions,
                    ),
                    expiredAccessToken: new OAuthClientExpiredAccessToken(
                        oAuthMockClientData[0].expiredAccessToken,
                    ),
                    expiredRefreshToken: new OAuthClientExpiredRefreshToken(
                        oAuthMockClientData[0].expiredRefreshToken,
                    ),
                    isActive: new OAuthClientIsActive(
                        oAuthMockClientData[0].isActive,
                    ),
                    isMaster: new OAuthClientIsMaster(
                        oAuthMockClientData[0].isMaster,
                    ),
                    applicationIds: new OAuthClientApplicationIds(
                        oAuthMockClientData[0].applicationIds,
                    ),
                }),
            ).toBe(undefined);
        });
    });
});
