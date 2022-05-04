import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { clients } from '../../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';
import { UpdateClientCommandHandler } from './update-client.command-handler';
import { UpdateClientCommand } from './update-client.command';
import { UpdateClientService } from './update-client.service';

describe('UpdateClientCommandHandler', () =>
{
    let commandHandler: UpdateClientCommandHandler;
    let service: UpdateClientService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateClientCommandHandler,
                {
                    provide : UpdateClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<UpdateClientCommandHandler>(UpdateClientCommandHandler);
        service         = module.get<UpdateClientService>(UpdateClientService);
    });

    describe('main', () =>
    {
        test('UpdateClientCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an client created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateClientCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});