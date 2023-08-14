import { CommonUpdateResourcesController, CommonUpdateResourcesHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateResourcesController', () =>
{
    let controller: CommonUpdateResourcesController;
    let handler: CommonUpdateResourcesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateResourcesController,
            ],
            providers: [
                {
                    provide : CommonUpdateResourcesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateResourcesController>(CommonUpdateResourcesController);
        handler = module.get<CommonUpdateResourcesHandler>(CommonUpdateResourcesHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateResourcesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a resources updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData[0])));
            expect(await controller.main(commonMockResourceData[0])).toBe(commonMockResourceData[0]);
        });
    });
});
