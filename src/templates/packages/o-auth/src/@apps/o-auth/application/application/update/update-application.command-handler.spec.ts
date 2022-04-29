import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { applications } from '../../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';
import { UpdateApplicationCommandHandler } from './update-application.command-handler';
import { UpdateApplicationCommand } from './update-application.command';
import { UpdateApplicationService } from './update-application.service';

describe('UpdateApplicationCommandHandler', () =>
{
    let commandHandler: UpdateApplicationCommandHandler;
    let service: UpdateApplicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateApplicationCommandHandler,
                {
                    provide : UpdateApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<UpdateApplicationCommandHandler>(UpdateApplicationCommandHandler);
        service         = module.get<UpdateApplicationService>(UpdateApplicationService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateApplicationCommand(
                    {
                        id: applications[0].id,
                        name: applications[0].name,
                        code: applications[0].code,
                        secret: applications[0].secret,
                        isMaster: applications[0].isMaster,
                        clientIds: applications[0].clientIds,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});