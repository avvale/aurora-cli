/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteCountriesHandler, CommonDeleteCountriesResolver } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteCountriesResolver', () =>
{
    let resolver: CommonDeleteCountriesResolver;
    let handler: CommonDeleteCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonDeleteCountriesResolver,
                {
                    provide : CommonDeleteCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteCountriesResolver>(CommonDeleteCountriesResolver);
        handler = module.get<CommonDeleteCountriesHandler>(CommonDeleteCountriesHandler);
    });

    test('CommonDeleteCountriesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteCountriesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an commonMockCountryData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData)));
            expect(await resolver.main()).toBe(commonMockCountryData);
        });
    });
});
