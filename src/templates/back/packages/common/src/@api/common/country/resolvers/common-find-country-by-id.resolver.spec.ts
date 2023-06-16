/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonFindCountryByIdResolver } from './common-find-country-by-id.resolver';
import { CommonFindCountryByIdHandler } from '../handlers/common-find-country-by-id.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonFindCountryByIdResolver', () =>
{
    let resolver: CommonFindCountryByIdResolver;
    let handler: CommonFindCountryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonFindCountryByIdResolver,
                {
                    provide : CommonFindCountryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonFindCountryByIdResolver>(CommonFindCountryByIdResolver);
        handler = module.get<CommonFindCountryByIdHandler>(CommonFindCountryByIdHandler);
    });

    test('CommonFindCountryByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindCountryByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an country by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await resolver.main(countries[0].id)).toBe(countries[0]);
        });
    });
});