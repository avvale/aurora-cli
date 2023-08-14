import { CommonFindResourceByIdController, CommonFindResourceByIdHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindResourceByIdController', () =>
{
    let controller: CommonFindResourceByIdController;
    let handler: CommonFindResourceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindResourceByIdController,
            ],
            providers: [
                {
                    provide : CommonFindResourceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindResourceByIdController>(CommonFindResourceByIdController);
        handler = module.get<CommonFindResourceByIdHandler>(CommonFindResourceByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonFindResourceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an resource by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData[0])));
            expect(await controller.main(commonMockResourceData[0].id)).toBe(commonMockResourceData[0]);
        });
    });
});
