/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteLangByIdController, CommonDeleteLangByIdHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteLangByIdController', () =>
{
    let controller: CommonDeleteLangByIdController;
    let handler: CommonDeleteLangByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteLangByIdController,
            ],
            providers: [
                {
                    provide : CommonDeleteLangByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteLangByIdController>(CommonDeleteLangByIdController);
        handler = module.get<CommonDeleteLangByIdHandler>(CommonDeleteLangByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteLangByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an lang deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await controller.main(commonMockLangData[0].id)).toBe(commonMockLangData[0]);
        });
    });
});
