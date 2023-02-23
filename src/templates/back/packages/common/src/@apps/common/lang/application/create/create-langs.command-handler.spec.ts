/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';
import { CreateLangsCommandHandler } from './create-langs.command-handler';
import { CreateLangsCommand } from './create-langs.command';
import { CreateLangsService } from './create-langs.service';

describe('CreateLangsCommandHandler', () =>
{
    let commandHandler: CreateLangsCommandHandler;
    let service: CreateLangsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateLangsCommandHandler,
                {
                    provide : CreateLangsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateLangsCommandHandler>(CreateLangsCommandHandler);
        service         = module.get<CreateLangsService>(CreateLangsService);
    });

    describe('main', () =>
    {
        test('CreateLangsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return langs createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateLangsCommand(
                    langs,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});