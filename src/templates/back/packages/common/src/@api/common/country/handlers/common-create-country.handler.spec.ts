/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateCountryHandler } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { commonMockLangData } from '@app/common/lang';
import {
  CoreAddI18nConstraintService,
  CoreGetContentLanguageObjectService,
  CoreGetFallbackLangService,
  CoreGetSearchKeyLangService,
  ICommandBus,
  IQueryBus,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateCountryHandler', () => {
  let handler: CommonCreateCountryHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        CommonCreateCountryHandler,
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
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
        {
          provide: CoreGetContentLanguageObjectService,
          useValue: {
            get: () => ({
              id: '7c4754e7-3363-48ca-af99-632522226b51',
              name: 'English',
              image: 'us',
              iso6392: 'en',
              iso6393: 'eng',
              ietf: 'en-US',
              customCode: null,
              dir: 'RTL',
              sort: 0,
              isActive: true,
            }),
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
        {
          provide: CoreGetFallbackLangService,
          useValue: {
            get: () => ({
              id: '7c4754e7-3363-48ca-af99-632522226b51',
              name: 'English',
              image: 'us',
              iso6392: 'en',
              iso6393: 'eng',
              ietf: 'en-US',
              customCode: null,
              dir: 'RTL',
              sort: 0,
              isActive: true,
            }),
          },
        },
      ],
    }).compile();

    handler = module.get<CommonCreateCountryHandler>(
      CommonCreateCountryHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonCreateCountryHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an country created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockCountryData[0])),
        );
      expect(
        await handler.main(commonMockCountryData[0], 'Europe/Madrid', 'en'),
      ).toBe(commonMockCountryData[0]);
    });
  });
});
