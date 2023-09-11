import { OAuthCreateClientsCommand, oAuthMockClientData } from '@app/o-auth/client';
import { OAuthCreateClientsCommandHandler } from '@app/o-auth/client/application/create/o-auth-create-clients.command-handler';
import { OAuthCreateClientsService } from '@app/o-auth/client/application/create/o-auth-create-clients.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('oAuthCreateClientsCommandHandler', () =>
{
    let commandHandler: OAuthCreateClientsCommandHandler;

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
    });

    describe('main', () =>
    {
        test('OAuthCreateClientsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return OAuthMockClientData created', async () =>
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
