/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonDeleteCountriesResolver } from './common-delete-countries.resolver';
import { CommonDeleteCountriesHandler } from '../handlers/common-delete-countries.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';

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