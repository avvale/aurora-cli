/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { clients } from '../../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';
import { CreateClientsCommandHandler } from './create-clients.command-handler';
import { CreateClientsCommand } from './create-clients.command';
import { CreateClientsService } from './create-clients.service';

describe('CreateClientsCommandHandler', () =>
{
    let commandHandler: CreateClientsCommandHandler;
    let service: CreateClientsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateClientsCommandHandler,
                {
                    provide : CreateClientsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateClientsCommandHandler>(CreateClientsCommandHandler);
        service         = module.get<CreateClientsService>(CreateClientsService);
    });

    describe('main', () =>
    {
        test('CreateClientsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return clients createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateClientsCommand(
                    clients,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});