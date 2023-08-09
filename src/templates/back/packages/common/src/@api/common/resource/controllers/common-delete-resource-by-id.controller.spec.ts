/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteResourceByIdController, CommonDeleteResourceByIdHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteResourceByIdController', () =>
{
    let controller: CommonDeleteResourceByIdController;
    let handler: CommonDeleteResourceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteResourceByIdController,
            ],
            providers: [
                {
                    provide : CommonDeleteResourceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteResourceByIdController>(CommonDeleteResourceByIdController);
        handler = module.get<CommonDeleteResourceByIdHandler>(CommonDeleteResourceByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteResourceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an resource deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData[0])));
            expect(await controller.main(commonMockResourceData[0].id)).toBe(commonMockResourceData[0]);
        });
    });
});
