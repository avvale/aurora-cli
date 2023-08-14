import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { oAuthMockClientData } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.data';
import { OAuthUpdateClientsCommandHandler } from './o-auth-update-clients.command-handler';
import { OAuthUpdateClientsCommand } from './o-auth-update-clients.command';
import { OAuthUpdateClientsService } from './o-auth-update-clients.service';

describe('OAuthUpdateClientsCommandHandler', () =>
{
    let commandHandler: OAuthUpdateClientsCommandHandler;
    let service: OAuthUpdateClientsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateClientsCommandHandler,
                {
                    provide : OAuthUpdateClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateClientsCommandHandler>(OAuthUpdateClientsCommandHandler);
        service = module.get<OAuthUpdateClientsService>(OAuthUpdateClientsService);
    });

    describe('main', () =>
    {
        test('UpdateClientsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an clients updated', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthUpdateClientsCommand(
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
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
