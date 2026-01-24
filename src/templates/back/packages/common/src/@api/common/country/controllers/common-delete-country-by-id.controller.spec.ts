/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteCountryByIdController,
  CommonDeleteCountryByIdHandler,
} from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { commonMockLangData } from '@app/common/lang';
import { CoreAddI18nConstraintService } from '@aurorajs.dev/core';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteCountryByIdController', () => {
  let controller: CommonDeleteCountryByIdController;
  let handler: CommonDeleteCountryByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [CommonDeleteCountryByIdController],
      providers: [
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
          provide: CommonDeleteCountryByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonDeleteCountryByIdController>(
      CommonDeleteCountryByIdController,
    );
    handler = module.get<CommonDeleteCountryByIdHandler>(
      CommonDeleteCountryByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonDeleteCountryByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an country deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockCountryData[0])),
        );
      expect(await controller.main(commonMockCountryData[0].id)).toBe(
        commonMockCountryData[0],
      );
    });
  });
});
