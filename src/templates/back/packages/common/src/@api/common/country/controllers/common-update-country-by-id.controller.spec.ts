import { CommonUpdateCountryByIdController, CommonUpdateCountryByIdHandler } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateCountryByIdController', () =>
{
    let controller: CommonUpdateCountryByIdController;
    let handler: CommonUpdateCountryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonUpdateCountryByIdController,
            ],
            providers: [
                {
                    provide : CommonUpdateCountryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateCountryByIdController>(CommonUpdateCountryByIdController);
        handler = module.get<CommonUpdateCountryByIdHandler>(CommonUpdateCountryByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateCountryByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a country updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(await controller.main(commonMockCountryData[0])).toBe(commonMockCountryData[0]);
        });
    });
});
