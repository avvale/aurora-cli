/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonGetCountriesResolver } from './common-get-countries.resolver';
import { CommonGetCountriesHandler } from '../handlers/common-get-countries.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';

describe('CommonGetCountriesResolver', () =>
{
    let resolver: CommonGetCountriesResolver;
    let handler: CommonGetCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonGetCountriesResolver,
                {
                    provide : CommonGetCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonGetCountriesResolver>(CommonGetCountriesResolver);
        handler = module.get<CommonGetCountriesHandler>(CommonGetCountriesHandler);
    });

    test('CommonGetCountriesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonGetCountriesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a commonMockCountryData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData)));
            expect(await resolver.main()).toBe(commonMockCountryData);
        });
    });
});