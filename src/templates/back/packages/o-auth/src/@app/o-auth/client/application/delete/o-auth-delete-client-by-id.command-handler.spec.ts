import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteClientByIdCommandHandler } from './o-auth-delete-client-by-id.command-handler';
import { oAuthMockClientData } from '@app/o-auth/client/infrastructure/mock/o-auth-mock-client.data';
import { OAuthDeleteClientByIdCommand } from './o-auth-delete-client-by-id.command';
import { OAuthDeleteClientByIdService } from './o-auth-delete-client-by-id.service';

describe('OAuthDeleteClientByIdCommandHandler', () =>
{
    let commandHandler: OAuthDeleteClientByIdCommandHandler;
    let service: OAuthDeleteClientByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteClientByIdCommandHandler,
                {
                    provide : OAuthDeleteClientByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<OAuthDeleteClientByIdCommandHandler>(OAuthDeleteClientByIdCommandHandler);
        service = module.get<OAuthDeleteClientByIdService>(OAuthDeleteClientByIdService);
    });

    describe('main', () =>
    {
        test('OAuthDeleteClientByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the OAuthDeleteClientByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new OAuthDeleteClientByIdCommand(
                    oAuthMockClientData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
