/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpsertCountryHandler } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { commonMockLangData } from '@app/common/lang';
import { CoreAddI18nConstraintService, CoreGetContentLanguageObjectService, CoreGetSearchKeyLangService, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertCountryHandler', () =>
{
    let handler: CommonUpsertCountryHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonUpsertCountryHandler,
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
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
                {
                    provide : CoreGetContentLanguageObjectService,
                    useValue: {
                        get: () => { /**/ },
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

        handler = module.get<CommonUpsertCountryHandler>(CommonUpsertCountryHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('CommonUpsertCountryHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an country upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(
                await handler.main(
                    commonMockCountryData[0],
                    'Europe/Madrid',
                    'en',
                ))
                .toBe(commonMockCountryData[0]);
        });
    });
});
