import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { langs } from '../../../../../@apps/common/lang/infrastructure/seeds/lang.seed';
import { UpdateLangCommandHandler } from './update-lang.command-handler';
import { UpdateLangCommand } from './update-lang.command';
import { UpdateLangService } from './update-lang.service';

describe('UpdateLangCommandHandler', () =>
{
    let commandHandler: UpdateLangCommandHandler;
    let service: UpdateLangService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateLangCommandHandler,
                {
                    provide : UpdateLangService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateLangCommandHandler>(UpdateLangCommandHandler);
        service         = module.get<UpdateLangService>(UpdateLangService);
    });

    describe('main', () =>
    {
        test('UpdateLangCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an lang created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateLangCommand(
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
                    { timezone: process.env.TZ }
                )
            )).toBe(undefined);
        });
    });
});