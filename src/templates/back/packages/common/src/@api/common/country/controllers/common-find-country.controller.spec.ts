import { CommonFindCountryController, CommonFindCountryHandler } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindCountryController', () =>
{
    let controller: CommonFindCountryController;
    let handler: CommonFindCountryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonFindCountryController,
            ],
            providers: [
                {
                    provide : CommonFindCountryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindCountryController>(CommonFindCountryController);
        handler = module.get<CommonFindCountryHandler>(CommonFindCountryHandler);
    });

    describe('main', () =>
    {
        test('CommonFindCountryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a country', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(await controller.main()).toBe(commonMockCountryData[0]);
        });
    });
});
