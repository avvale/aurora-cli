/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonPaginateCountriesResolver } from './common-paginate-countries.resolver';
import { CommonPaginateCountriesHandler } from '../handlers/common-paginate-countries.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonPaginateCountriesResolver', () =>
{
    let resolver: CommonPaginateCountriesResolver;
    let handler: CommonPaginateCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonPaginateCountriesResolver,
                {
                    provide : CommonPaginateCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonPaginateCountriesResolver>(CommonPaginateCountriesResolver);
        handler = module.get<CommonPaginateCountriesHandler>(CommonPaginateCountriesHandler);
    });

    test('CommonPaginateCountriesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateCountriesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a countries', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : countries,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : countries,
            });
        });
    });
});