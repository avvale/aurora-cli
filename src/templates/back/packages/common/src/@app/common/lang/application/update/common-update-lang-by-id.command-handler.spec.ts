import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { CommonUpdateLangByIdCommandHandler } from './common-update-lang-by-id.command-handler';
import { CommonUpdateLangByIdCommand } from './common-update-lang-by-id.command';
import { CommonUpdateLangByIdService } from './common-update-lang-by-id.service';

describe('CommonUpdateLangByIdCommandHandler', () =>
{
    let commandHandler: CommonUpdateLangByIdCommandHandler;
    let service: CommonUpdateLangByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateLangByIdCommandHandler,
                {
                    provide : UpdateLangByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpdateLangByIdCommandHandler>(UpdateLangByIdCommandHandler);
        service = module.get<UpdateLangByIdService>(UpdateLangByIdService);
    });

    describe('main', () =>
    {
        test('UpdateLangByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an lang created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateLangByIdCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});