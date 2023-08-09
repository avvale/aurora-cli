import { CommonUpdateResourceByIdController, CommonUpdateResourceByIdHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateResourceByIdController', () =>
{
    let controller: CommonUpdateResourceByIdController;
    let handler: CommonUpdateResourceByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateResourceByIdController,
            ],
            providers: [
                {
                    provide : CommonUpdateResourceByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateResourceByIdController>(CommonUpdateResourceByIdController);
        handler = module.get<CommonUpdateResourceByIdHandler>(CommonUpdateResourceByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateResourceByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a resource updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData[0])));
            expect(await controller.main(commonMockResourceData[0])).toBe(commonMockResourceData[0]);
        });
    });
});
