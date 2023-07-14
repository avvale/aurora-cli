import { CommonUpsertLangController, CommonUpsertLangHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertLangController', () =>
{
    let controller: CommonUpsertLangController;
    let handler: CommonUpsertLangHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpsertLangController,
            ],
            providers: [
                {
                    provide : CommonUpsertLangHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpsertLangController>(CommonUpsertLangController);
        handler = module.get<CommonUpsertLangHandler>(CommonUpsertLangHandler);
    });

    describe('main', () =>
    {
        test('CommonUpsertLangController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an lang upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await controller.main(commonMockLangData[0])).toBe(commonMockLangData[0]);
        });
    });
});
