import { oAuthMockApplicationClientData, OAuthUpdateAndIncrementApplicationsClientsCommand } from '@app/o-auth/application-client';
import { OAuthUpdateAndIncrementApplicationsClientsCommandHandler } from '@app/o-auth/application-client/application/update/o-auth-update-and-increment-applications-clients.command-handler';
import { OAuthUpdateAndIncrementApplicationsClientsService } from '@app/o-auth/application-client/application/update/o-auth-update-and-increment-applications-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateAndIncrementApplicationsClientsCommandHandler', () =>
{
    let commandHandler: OAuthUpdateAndIncrementApplicationsClientsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateAndIncrementApplicationsClientsCommandHandler,
                {
                    provide : OAuthUpdateAndIncrementApplicationsClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthUpdateAndIncrementApplicationsClientsCommandHandler>(OAuthUpdateAndIncrementApplicationsClientsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementApplicationsClientsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applicationsClients updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new OAuthUpdateAndIncrementApplicationsClientsCommand(
                    {
                        applicationId: oAuthMockApplicationClientData[0].applicationId,
                        clientId: oAuthMockApplicationClientData[0].clientId,
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
