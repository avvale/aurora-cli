/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonUpsertCountryResolver } from './common-upsert-country.resolver';
import { CommonUpsertCountryHandler } from '../handlers/common-upsert-country.handler';
import { CommonUpdateCountryByIdInput } from '@api/graphql';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonUpsertCountryResolver', () =>
{
    let resolver: CommonUpsertCountryResolver;
    let handler: CommonUpsertCountryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonUpsertCountryResolver,
                {
                    provide : CommonUpsertCountryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpsertCountryResolver>(CommonUpsertCountryResolver);
        handler = module.get<CommonUpsertCountryHandler>(CommonUpsertCountryHandler);
    });

    test('CommonUpsertCountryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpsertCountryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an country upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await resolver.main(<CommonUpdateCountryByIdInput>countries[0])).toBe(countries[0]);
        });
    });
});