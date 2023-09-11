import { oAuthMockApplicationClientData, OAuthUpdateApplicationsClientsCommand } from '@app/o-auth/application-client';
import { OAuthUpdateApplicationsClientsCommandHandler } from '@app/o-auth/application-client/application/update/o-auth-update-applications-clients.command-handler';
import { OAuthUpdateApplicationsClientsService } from '@app/o-auth/application-client/application/update/o-auth-update-applications-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationsClientsCommandHandler', () =>
{
    let commandHandler: OAuthUpdateApplicationsClientsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateApplicationsClientsCommandHandler,
                {
                    provide : OAuthUpdateApplicationsClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateApplicationsClientsCommandHandler>(OAuthUpdateApplicationsClientsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateApplicationsClientsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationsClients updated', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthUpdateApplicationsClientsCommand(
                    {
                        applicationId: oAuthMockApplicationClientData[0].applicationId,
                        clientId: oAuthMockApplicationClientData[0].clientId,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
