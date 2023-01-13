/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// custom items
import { CommonFindCountryResolver } from './common-find-country.resolver';
import { CommonFindCountryHandler } from '../handlers/common-find-country.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@app/common/country/infrastructure/seeds/country.seed';

describe('CommonFindCountryResolver', () =>
{
    let resolver: CommonFindCountryResolver;
    let handler: CommonFindCountryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonFindCountryResolver,
                {
                    provide : CommonFindCountryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindCountryResolver>(CommonFindCountryResolver);
        handler = module.get<CommonFindCountryHandler>(CommonFindCountryHandler);
    });

    test('CommonFindCountryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindCountryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a country', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await resolver.main()).toBe(countries[0]);
        });
    });
});