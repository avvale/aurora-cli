import { CommonDeleteResourcesController, CommonDeleteResourcesHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteResourcesController', () =>
{
    let controller: CommonDeleteResourcesController;
    let handler: CommonDeleteResourcesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteResourcesController,
            ],
            providers: [
                {
                    provide : CommonDeleteResourcesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteResourcesController>(CommonDeleteResourcesController);
        handler = module.get<CommonDeleteResourcesHandler>(CommonDeleteResourcesHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteResourcesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockResourceData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData)));
            expect(await controller.main()).toBe(commonMockResourceData);
        });
    });
});
