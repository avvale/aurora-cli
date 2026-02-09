/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CommonPaginateCountriesHandler } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { commonMockLangData } from '@app/common/lang';
import {
  CoreAddI18nConstraintService,
  CoreGetSearchKeyLangService,
  IQueryBus,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateCountriesHandler', () => {
  let handler: CommonPaginateCountriesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        CommonPaginateCountriesHandler,
        CoreAddI18nConstraintService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => (key === 'APP_FALLBACK_LANG' ? 'es' : ''),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: (key: string) =>
              key === 'common/langs' ? commonMockLangData : null,
          },
        },
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: CoreGetSearchKeyLangService,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonPaginateCountriesHandler>(
      CommonPaginateCountriesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonPaginateCountriesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonPaginateCountriesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a countries', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: commonMockCountryData.length,
              count: commonMockCountryData.length,
              rows: commonMockCountryData,
            }),
          ),
      );
      expect(await handler.main({}, {}, 'Europe/Madrid', 'en')).toEqual({
        total: commonMockCountryData.length,
        count: commonMockCountryData.length,
        rows: commonMockCountryData,
      });
    });
  });
});
