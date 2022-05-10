import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';
import { UpdateClientsCommandHandler } from './update-clients.command-handler';
import { UpdateClientsCommand } from './update-clients.command';
import { UpdateClientsService } from './update-clients.service';

describe('UpdateClientsCommandHandler', () =>
{
    let commandHandler: UpdateClientsCommandHandler;
    let service: UpdateClientsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateClientsCommandHandler,
                {
                    provide : UpdateClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateClientsCommandHandler>(UpdateClientsCommandHandler);
        service         = module.get<UpdateClientsService>(UpdateClientsService);
    });

    describe('main', () =>
    {
        test('UpdateClientsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an clients updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateClientsCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});