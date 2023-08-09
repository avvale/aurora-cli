/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindCountryHandler, CommonFindCountryResolver } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

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
