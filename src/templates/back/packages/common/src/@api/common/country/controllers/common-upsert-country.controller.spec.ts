import { CommonUpsertCountryController, CommonUpsertCountryHandler } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertCountryController', () =>
{
    let controller: CommonUpsertCountryController;
    let handler: CommonUpsertCountryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonUpsertCountryController,
            ],
            providers: [
                {
                    provide : CommonUpsertCountryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpsertCountryController>(CommonUpsertCountryController);
        handler = module.get<CommonUpsertCountryHandler>(CommonUpsertCountryHandler);
    });

    describe('main', () =>
    {
        test('CommonUpsertCountryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an country upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(await controller.main(commonMockCountryData[0])).toBe(commonMockCountryData[0]);
        });
    });
});
