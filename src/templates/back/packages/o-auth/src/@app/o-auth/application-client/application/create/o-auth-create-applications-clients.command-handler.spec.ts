import {
    OAuthCreateApplicationsClientsCommand,
    oAuthMockApplicationClientData,
} from '@app/o-auth/application-client';
import { OAuthCreateApplicationsClientsCommandHandler } from '@app/o-auth/application-client/application/create/o-auth-create-applications-clients.command-handler';
import { OAuthCreateApplicationsClientsService } from '@app/o-auth/application-client/application/create/o-auth-create-applications-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('oAuthCreateApplicationsClientsCommandHandler', () => {
    let commandHandler: OAuthCreateApplicationsClientsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateApplicationsClientsCommandHandler,
                {
                    provide: OAuthCreateApplicationsClientsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler =
            module.get<OAuthCreateApplicationsClientsCommandHandler>(
                OAuthCreateApplicationsClientsCommandHandler,
            );
    });

    describe('main', () => {
        test('OAuthCreateApplicationsClientsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return OAuthMockApplicationClientData created', async () => {
            expect(
                await commandHandler.execute(
                    new OAuthCreateApplicationsClientsCommand(
                        oAuthMockApplicationClientData,
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
