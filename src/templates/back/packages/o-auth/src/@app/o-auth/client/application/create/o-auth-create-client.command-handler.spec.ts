import { OAuthCreateClientCommandHandler } from './o-auth-create-client.command-handler';
import { OAuthCreateClientService } from './o-auth-create-client.service';
import { OAuthCreateClientCommand, oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateClientCommandHandler', () =>
{
    let commandHandler: OAuthCreateClientCommandHandler;
    let service: OAuthCreateClientService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateClientCommandHandler,
                {
                    provide : OAuthCreateClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthCreateClientCommandHandler>(OAuthCreateClientCommandHandler);
        service = module.get<OAuthCreateClientService>(OAuthCreateClientService);
    });

    describe('main', () =>
    {
        test('CreateClientCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the OAuthCreateClientService', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthCreateClientCommand(
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
