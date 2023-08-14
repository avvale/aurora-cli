import { CommonCreateResourcesController, CommonCreateResourcesHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateResourcesController', () =>
{
    let controller: CommonCreateResourcesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CommonCreateResourcesController,
            ],
            providers: [
                {
                    provide : CommonCreateResourcesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateResourcesController>(CommonCreateResourcesController);
    });

    describe('main', () =>
    {
        test('CommonCreateResourcesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockResourceData created', async () =>
        {
            expect(
                await controller.main(
                    commonMockResourceData,
                ),
            )
                .toBe(undefined);
        });
    });
});
