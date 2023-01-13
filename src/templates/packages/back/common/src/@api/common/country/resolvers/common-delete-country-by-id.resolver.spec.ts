/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// custom items
import { CommonDeleteCountryByIdResolver } from './common-delete-country-by-id.resolver';
import { CommonDeleteCountryByIdHandler } from '../handlers/common-delete-country-by-id.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@app/common/country/infrastructure/seeds/country.seed';

describe('CommonDeleteCountryByIdResolver', () =>
{
    let resolver: CommonDeleteCountryByIdResolver;
    let handler: CommonDeleteCountryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonDeleteCountryByIdResolver,
                {
                    provide : CommonDeleteCountryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteCountryByIdResolver>(CommonDeleteCountryByIdResolver);
        handler = module.get<CommonDeleteCountryByIdHandler>(CommonDeleteCountryByIdHandler);
    });

    test('CommonDeleteCountryByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteCountryByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an country deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await resolver.main(countries[0].id)).toBe(countries[0]);
        });
    });
});