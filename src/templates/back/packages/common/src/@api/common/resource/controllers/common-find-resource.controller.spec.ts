import { CommonFindResourceController, CommonFindResourceHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindResourceController', () =>
{
    let controller: CommonFindResourceController;
    let handler: CommonFindResourceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindResourceController,
            ],
            providers: [
                {
                    provide : CommonFindResourceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindResourceController>(CommonFindResourceController);
        handler = module.get<CommonFindResourceHandler>(CommonFindResourceHandler);
    });

    describe('main', () =>
    {
        test('CommonFindResourceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a resource', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData[0])));
            expect(await controller.main()).toBe(commonMockResourceData[0]);
        });
    });
});
