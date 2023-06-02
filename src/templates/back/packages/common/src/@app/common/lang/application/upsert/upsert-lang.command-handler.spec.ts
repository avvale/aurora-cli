import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { UpsertLangCommandHandler } from './upsert-lang.command-handler';
import { UpsertLangCommand } from './upsert-lang.command';
import { UpsertLangService } from './upsert-lang.service';

describe('UpsertLangCommandHandler', () =>
{
    let commandHandler: UpsertLangCommandHandler;
    let service: UpsertLangService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertLangCommandHandler,
                {
                    provide : UpsertLangService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpsertLangCommandHandler>(UpsertLangCommandHandler);
        service = module.get<UpsertLangService>(UpsertLangService);
    });

    describe('main', () =>
    {
        test('UpsertLangCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertLangService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertLangCommand(
                    {
                        id: langs[0].id,
                        name: langs[0].name,
                        image: langs[0].image,
                        iso6392: langs[0].iso6392,
                        iso6393: langs[0].iso6393,
                        ietf: langs[0].ietf,
                        customCode: langs[0].customCode,
                        dir: langs[0].dir,
                        sort: langs[0].sort,
                        isActive: langs[0].isActive,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});