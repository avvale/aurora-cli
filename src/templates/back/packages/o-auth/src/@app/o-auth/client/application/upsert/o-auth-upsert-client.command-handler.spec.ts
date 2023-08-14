import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { oAuthMockClientData } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.data';
import { OAuthUpsertClientCommandHandler } from './o-auth-upsert-client.command-handler';
import { OAuthUpsertClientCommand } from './o-auth-upsert-client.command';
import { OAuthUpsertClientService } from './o-auth-upsert-client.service';

describe('OAuthUpsertClientCommandHandler', () =>
{
    let commandHandler: OAuthUpsertClientCommandHandler;
    let service: OAuthUpsertClientService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpsertClientCommandHandler,
                {
                    provide : OAuthUpsertClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpsertClientCommandHandler>(OAuthUpsertClientCommandHandler);
        service = module.get<OAuthUpsertClientService>(OAuthUpsertClientService);
    });

    describe('main', () =>
    {
        test('UpsertClientCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the OAuthUpsertClientService', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthUpsertClientCommand(
                    {
                        id: oAuthMockClientData[0].id,
                        grantType: oAuthMockClientData[0].grantType,
                        name: oAuthMockClientData[0].name,
                        secret: oAuthMockClientData[0].secret,
                        authUrl: oAuthMockClientData[0].authUrl,
                        redirect: oAuthMockClientData[0].redirect,
                        scopeOptions: oAuthMockClientData[0].scopeOptions,
                        expiredAccessToken: oAuthMockClientData[0].expiredAccessToken,
                        expiredRefreshToken: oAuthMockClientData[0].expiredRefreshToken,
                        isActive: oAuthMockClientData[0].isActive,
                        isMaster: oAuthMockClientData[0].isMaster,
                        applicationIds: oAuthMockClientData[0].applicationIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
