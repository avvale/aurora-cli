import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteClientsCommandHandler } from './o-auth-delete-clients.command-handler';
import { OAuthDeleteClientsCommand } from './o-auth-delete-clients.command';
import { OAuthDeleteClientsService } from './o-auth-delete-clients.service';

describe('OAuthDeleteClientsCommandHandler', () =>
{
    let commandHandler: OAuthDeleteClientsCommandHandler;
    let service: OAuthDeleteClientsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteClientsCommandHandler,
                {
                    provide : OAuthDeleteClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthDeleteClientsCommandHandler>(OAuthDeleteClientsCommandHandler);
        service = module.get<OAuthDeleteClientsService>(OAuthDeleteClientsService);
    });

    describe('main', () =>
    {
        test('OAuthDeleteClientsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthDeleteClientsCommand(),
            )).toBe(undefined);
        });
    });
});
