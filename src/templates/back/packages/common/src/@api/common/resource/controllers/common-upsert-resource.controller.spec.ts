import { CommonUpsertResourceController, CommonUpsertResourceHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertResourceController', () =>
{
    let controller: CommonUpsertResourceController;
    let handler: CommonUpsertResourceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpsertResourceController,
            ],
            providers: [
                {
                    provide : CommonUpsertResourceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpsertResourceController>(CommonUpsertResourceController);
        handler = module.get<CommonUpsertResourceHandler>(CommonUpsertResourceHandler);
    });

    describe('main', () =>
    {
        test('CommonUpsertResourceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an resource upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData[0])));
            expect(await controller.main(commonMockResourceData[0])).toBe(commonMockResourceData[0]);
        });
    });
});
