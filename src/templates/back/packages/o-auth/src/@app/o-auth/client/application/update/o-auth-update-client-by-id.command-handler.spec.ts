import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { oAuthMockClientData } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.data';
import { OAuthUpdateClientByIdCommandHandler } from './o-auth-update-client-by-id.command-handler';
import { OAuthUpdateClientByIdCommand } from './o-auth-update-client-by-id.command';
import { OAuthUpdateClientByIdService } from './o-auth-update-client-by-id.service';

describe('OAuthUpdateClientByIdCommandHandler', () =>
{
    let commandHandler: OAuthUpdateClientByIdCommandHandler;
    let service: OAuthUpdateClientByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateClientByIdCommandHandler,
                {
                    provide : OAuthUpdateClientByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateClientByIdCommandHandler>(OAuthUpdateClientByIdCommandHandler);
        service = module.get<OAuthUpdateClientByIdService>(OAuthUpdateClientByIdService);
    });

    describe('main', () =>
    {
        test('UpdateClientByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an client created', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthUpdateClientByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
