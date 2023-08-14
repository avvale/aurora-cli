import { CommonCreateResourceController, CommonCreateResourceHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateResourceController', () =>
{
    let controller: CommonCreateResourceController;
    let handler: CommonCreateResourceHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonCreateResourceController,
            ],
            providers: [
                {
                    provide : CommonCreateResourceHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateResourceController>(CommonCreateResourceController);
        handler = module.get<CommonCreateResourceHandler>(CommonCreateResourceHandler);
    });

    describe('main', () =>
    {
        test('CommonCreateResourceController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an resource created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData[0])));
            expect(
                await controller.main(
                    commonMockResourceData[0],
                ),
            )
                .toBe(commonMockResourceData[0]);
        });
    });
});
