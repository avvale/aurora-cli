import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { applications } from '@apps/o-auth/application/infrastructure/seeds/application.seed';
import { UpdateApplicationByIdCommandHandler } from './update-application-by-id.command-handler';
import { UpdateApplicationByIdCommand } from './update-application-by-id.command';
import { UpdateApplicationByIdService } from './update-application-by-id.service';

describe('UpdateApplicationByIdCommandHandler', () =>
{
    let commandHandler: UpdateApplicationByIdCommandHandler;
    let service: UpdateApplicationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateApplicationByIdCommandHandler,
                {
                    provide : UpdateApplicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateApplicationByIdCommandHandler>(UpdateApplicationByIdCommandHandler);
        service         = module.get<UpdateApplicationByIdService>(UpdateApplicationByIdService);
    });

    describe('main', () =>
    {
        test('UpdateApplicationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateApplicationByIdCommand(
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