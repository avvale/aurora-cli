import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';
import { CommonUpdateLangsCommandHandler } from './common-update-langs.command-handler';
import { CommonUpdateLangsCommand } from './common-update-langs.command';
import { CommonUpdateLangsService } from './common-update-langs.service';

describe('CommonUpdateLangsCommandHandler', () =>
{
    let commandHandler: CommonUpdateLangsCommandHandler;
    let service: CommonUpdateLangsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateLangsCommandHandler,
                {
                    provide : CommonUpdateLangsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateLangsCommandHandler>(CommonUpdateLangsCommandHandler);
        service = module.get<CommonUpdateLangsService>(CommonUpdateLangsService);
    });

    describe('main', () =>
    {
        test('UpdateLangsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an langs updated', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateLangsCommand(
                    {
                        id: commonMockLangData[0].id,
                        name: commonMockLangData[0].name,
                        image: commonMockLangData[0].image,
                        iso6392: commonMockLangData[0].iso6392,
                        iso6393: commonMockLangData[0].iso6393,
                        ietf: commonMockLangData[0].ietf,
                        customCode: commonMockLangData[0].customCode,
                        dir: commonMockLangData[0].dir,
                        sort: commonMockLangData[0].sort,
                        isActive: commonMockLangData[0].isActive,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});