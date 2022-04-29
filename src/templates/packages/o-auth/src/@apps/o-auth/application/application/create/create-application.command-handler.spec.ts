import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { applications } from '../../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';
import { CreateApplicationCommandHandler } from './create-application.command-handler';
import { CreateApplicationCommand } from './create-application.command';
import { CreateApplicationService } from './create-application.service';

describe('CreateApplicationCommandHandler', () =>
{
    let commandHandler: CreateApplicationCommandHandler;
    let service: CreateApplicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateApplicationCommandHandler,
                {
                    provide : CreateApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateApplicationCommandHandler>(CreateApplicationCommandHandler);
        service         = module.get<CreateApplicationService>(CreateApplicationService);
    });

    describe('main', () =>
    {
        test('CreateApplicationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateApplicationService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateApplicationCommand(
                    {
                        id: applications[0].id,
                        name: applications[0].name,
                        code: applications[0].code,
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