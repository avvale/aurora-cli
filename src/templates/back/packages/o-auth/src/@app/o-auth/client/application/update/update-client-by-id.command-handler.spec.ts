import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { clients } from '@app/o-auth/client/infrastructure/mock/mock-client.data';
import { UpdateClientByIdCommandHandler } from './update-client-by-id.command-handler';
import { UpdateClientByIdCommand } from './update-client-by-id.command';
import { UpdateClientByIdService } from './update-client-by-id.service';

describe('UpdateClientByIdCommandHandler', () =>
{
    let commandHandler: UpdateClientByIdCommandHandler;
    let service: UpdateClientByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateClientByIdCommandHandler,
                {
                    provide : UpdateClientByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateClientByIdCommandHandler>(UpdateClientByIdCommandHandler);
        service         = module.get<UpdateClientByIdService>(UpdateClientByIdService);
    });

    describe('main', () =>
    {
        test('UpdateClientByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an client created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateClientByIdCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});