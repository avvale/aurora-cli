/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindCountryHandler } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { commonMockLangData } from '@app/common/lang';
import { CoreAddI18nConstraintService, CoreGetSearchKeyLangService, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindCountryHandler', () =>
{
    let handler: CommonFindCountryHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonFindCountryHandler,
                CoreAddI18nConstraintService,
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_FALLBACK_LANG' ? 'es' : '',
                    },
                },
                {
                    provide : CACHE_MANAGER,
                    useValue: {
                        get: (key: string) => key === 'common/langs' ? commonMockLangData : null,
                    },
                },
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : CoreGetSearchKeyLangService,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonFindCountryHandler>(CommonFindCountryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonFindCountryHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindCountryHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a country', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                    'en',
                ),
            )
                .toBe(commonMockCountryData[0]);
        });
    });
});
