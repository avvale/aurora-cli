/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { oAuthMockClientData } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.data';
import { OAuthCreateClientsCommandHandler } from './o-auth-create-clients.command-handler';
import { OAuthCreateClientsCommand } from './o-auth-create-clients.command';
import { OAuthCreateClientsService } from './o-auth-create-clients.service';

describe('oAuthCreateClientsCommandHandler', () =>
{
    let commandHandler: OAuthCreateClientsCommandHandler;
    let service: OAuthCreateClientsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateClientsCommandHandler,
                {
                    provide : OAuthCreateClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthCreateClientsCommandHandler>(OAuthCreateClientsCommandHandler);
        service = module.get<OAuthCreateClientsService>(OAuthCreateClientsService);
    });

    describe('main', () =>
    {
        test('OAuthCreateClientsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return OAuthMockClientData createds', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthCreateClientsCommand(
                    oAuthMockClientData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
