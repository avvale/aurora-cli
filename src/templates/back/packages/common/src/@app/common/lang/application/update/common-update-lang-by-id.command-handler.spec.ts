import { commonMockLangData, CommonUpdateLangByIdCommand } from '@app/common/lang';
import { CommonUpdateLangByIdCommandHandler } from '@app/common/lang/application/update/common-update-lang-by-id.command-handler';
import { CommonUpdateLangByIdService } from '@app/common/lang/application/update/common-update-lang-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateLangByIdCommandHandler', () =>
{
    let commandHandler: CommonUpdateLangByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateLangByIdCommandHandler,
                {
                    provide : CommonUpdateLangByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateLangByIdCommandHandler>(CommonUpdateLangByIdCommandHandler);
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
                new CommonUpdateLangByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
