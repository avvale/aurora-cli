import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';
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
        service = module.get<CommonUpdateLangByIdService>(CommonUpdateLangByIdService);
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
