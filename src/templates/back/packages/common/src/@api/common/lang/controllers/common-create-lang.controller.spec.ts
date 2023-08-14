import { CommonCreateLangController, CommonCreateLangHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateLangController', () =>
{
    let controller: CommonCreateLangController;
    let handler: CommonCreateLangHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonCreateLangController,
            ],
            providers: [
                {
                    provide : CommonCreateLangHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateLangController>(CommonCreateLangController);
        handler = module.get<CommonCreateLangHandler>(CommonCreateLangHandler);
    });

    describe('main', () =>
    {
        test('CommonCreateLangController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an lang created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(
                await controller.main(
                    commonMockLangData[0],
                ),
            )
                .toBe(commonMockLangData[0]);
        });
    });
});
