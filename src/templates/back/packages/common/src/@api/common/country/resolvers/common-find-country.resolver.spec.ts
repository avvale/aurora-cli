/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonFindCountryResolver } from './common-find-country.resolver';
import { CommonFindCountryHandler } from '../handlers/common-find-country.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(await resolver.main()).toBe(commonMockCountryData[0]);
        });
    });
});