import { commonMockLangData, CommonUpsertLangCommand } from '@app/common/lang';
import { CommonUpsertLangCommandHandler } from '@app/common/lang/application/upsert/common-upsert-lang.command-handler';
import { CommonUpsertLangService } from '@app/common/lang/application/upsert/common-upsert-lang.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertLangCommandHandler', () =>
{
    let commandHandler: CommonUpsertLangCommandHandler;
    let service: CommonUpsertLangService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpsertLangCommandHandler,
                {
                    provide : CommonUpsertLangService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpsertLangCommandHandler>(CommonUpsertLangCommandHandler);
        service = module.get<CommonUpsertLangService>(CommonUpsertLangService);
    });

    describe('main', () =>
    {
        test('UpsertLangCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the CommonUpsertLangService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpsertLangCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
