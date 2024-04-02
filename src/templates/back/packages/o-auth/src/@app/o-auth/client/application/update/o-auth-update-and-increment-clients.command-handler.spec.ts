import { oAuthMockClientData, OAuthUpdateAndIncrementClientsCommand } from '@app/o-auth/client';
import { OAuthUpdateAndIncrementClientsCommandHandler } from '@app/o-auth/client/application/update/o-auth-update-and-increment-clients.command-handler';
import { OAuthUpdateAndIncrementClientsService } from '@app/o-auth/client/application/update/o-auth-update-and-increment-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateAndIncrementClientsCommandHandler', () =>
{
    let commandHandler: OAuthUpdateAndIncrementClientsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateAndIncrementClientsCommandHandler,
                {
                    provide : OAuthUpdateAndIncrementClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateAndIncrementClientsCommandHandler>(OAuthUpdateAndIncrementClientsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementClientsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an clients updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new OAuthUpdateAndIncrementClientsCommand(
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
            /* eslint-enable key-spacing */
        });
    });
});
