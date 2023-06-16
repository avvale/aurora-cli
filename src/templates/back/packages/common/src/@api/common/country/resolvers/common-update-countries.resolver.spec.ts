/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonUpdateCountriesResolver } from './common-update-countries.resolver';
import { CommonUpdateCountriesHandler } from '../handlers/common-update-countries.handler';
import { CommonUpdateCountriesInput } from '@api/graphql';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonUpdateCountriesResolver', () =>
{
    let resolver: CommonUpdateCountriesResolver;
    let handler: CommonUpdateCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonUpdateCountriesResolver,
                {
                    provide : CommonUpdateCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateCountriesResolver>(CommonUpdateCountriesResolver);
        handler = module.get<CommonUpdateCountriesHandler>(CommonUpdateCountriesHandler);
    });

    test('CommonUpdateCountriesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateCountriesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a countries updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await resolver.main(<CommonUpdateCountriesInput>countries[0])).toBe(countries[0]);
        });
    });
});