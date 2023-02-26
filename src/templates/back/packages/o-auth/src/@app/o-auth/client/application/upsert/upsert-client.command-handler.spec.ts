import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { clients } from '@app/o-auth/client/infrastructure/mock/mock-client.data';
import { UpsertClientCommandHandler } from './upsert-client.command-handler';
import { UpsertClientCommand } from './upsert-client.command';
import { UpsertClientService } from './upsert-client.service';

describe('UpsertClientCommandHandler', () =>
{
    let commandHandler: UpsertClientCommandHandler;
    let service: UpsertClientService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertClientCommandHandler,
                {
                    provide : UpsertClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertClientCommandHandler>(UpsertClientCommandHandler);
        service         = module.get<UpsertClientService>(UpsertClientService);
    });

    describe('main', () =>
    {
        test('UpsertClientCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertClientService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertClientCommand(
                    {
                        id: clients[0].id,
                        grantType: clients[0].grantType,
                        name: clients[0].name,
                        secret: clients[0].secret,
                        authUrl: clients[0].authUrl,
                        redirect: clients[0].redirect,
                        scopeOptions: clients[0].scopeOptions,
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