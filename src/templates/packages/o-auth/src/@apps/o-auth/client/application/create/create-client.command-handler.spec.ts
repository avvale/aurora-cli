import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { clients } from '../../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';
import { CreateClientCommandHandler } from './create-client.command-handler';
import { CreateClientCommand } from './create-client.command';
import { CreateClientService } from './create-client.service';

describe('CreateClientCommandHandler', () =>
{
    let commandHandler: CreateClientCommandHandler;
    let service: CreateClientService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateClientCommandHandler,
                {
                    provide : CreateClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateClientCommandHandler>(CreateClientCommandHandler);
        service         = module.get<CreateClientService>(CreateClientService);
    });

    describe('main', () =>
    {
        test('CreateClientCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateClientService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateClientCommand(
                    {
                        id: clients[0].id,
                        grantType: clients[0].grantType,
                        name: clients[0].name,
                        secret: clients[0].secret,
                        authUrl: clients[0].authUrl,
                        redirect: clients[0].redirect,
                        scopes: clients[0].scopes,
                        expiredAccessToken: clients[0].expiredAccessToken,
                        expiredRefreshToken: clients[0].expiredRefreshToken,
                        isActive: clients[0].isActive,
                        isMaster: clients[0].isMaster,
                        applicationIds: clients[0].applicationIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});