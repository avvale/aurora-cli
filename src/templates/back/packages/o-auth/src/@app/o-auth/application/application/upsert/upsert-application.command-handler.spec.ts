import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { applications } from '@app/o-auth/application/infrastructure/mock/mock-application.data';
import { UpsertApplicationCommandHandler } from './upsert-application.command-handler';
import { UpsertApplicationCommand } from './upsert-application.command';
import { UpsertApplicationService } from './upsert-application.service';

describe('UpsertApplicationCommandHandler', () =>
{
    let commandHandler: UpsertApplicationCommandHandler;
    let service: UpsertApplicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertApplicationCommandHandler,
                {
                    provide : UpsertApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertApplicationCommandHandler>(UpsertApplicationCommandHandler);
        service         = module.get<UpsertApplicationService>(UpsertApplicationService);
    });

    describe('main', () =>
    {
        test('UpsertApplicationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertApplicationService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertApplicationCommand(
                    {
                        id: applications[0].id,
                        code: applications[0].code,
                        name: applications[0].name,
                        secret: applications[0].secret,
                        isMaster: applications[0].isMaster,
                        clientIds: applications[0].clientIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});