import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { applications } from '@apps/o-auth/application/infrastructure/seeds/application.seed';
import { UpdateApplicationsCommandHandler } from './update-applications.command-handler';
import { UpdateApplicationsCommand } from './update-applications.command';
import { UpdateApplicationsService } from './update-applications.service';

describe('UpdateApplicationsCommandHandler', () =>
{
    let commandHandler: UpdateApplicationsCommandHandler;
    let service: UpdateApplicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateApplicationsCommandHandler,
                {
                    provide : UpdateApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateApplicationsCommandHandler>(UpdateApplicationsCommandHandler);
        service         = module.get<UpdateApplicationsService>(UpdateApplicationsService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an applications updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateApplicationsCommand(
                    {
                        id: applications[0].id,
                        name: applications[0].name,
                        code: applications[0].code,
                        secret: applications[0].secret,
                        isMaster: applications[0].isMaster,
                        clientIds: applications[0].clientIds,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});