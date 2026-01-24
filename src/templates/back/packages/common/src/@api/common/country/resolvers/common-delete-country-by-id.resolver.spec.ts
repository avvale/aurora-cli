/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteCountryByIdHandler,
  CommonDeleteCountryByIdResolver,
} from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteCountryByIdResolver', () => {
  let resolver: CommonDeleteCountryByIdResolver;
  let handler: CommonDeleteCountryByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        CommonDeleteCountryByIdResolver,
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

    resolver = module.get<CommonDeleteCountryByIdResolver>(
      CommonDeleteCountryByIdResolver,
    );
    handler = module.get<CommonDeleteCountryByIdHandler>(
      CommonDeleteCountryByIdHandler,
    );
  });

  test('CommonDeleteCountryByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteCountryByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an country deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockCountryData[0])),
        );
      expect(await resolver.main(commonMockCountryData[0].id)).toBe(
        commonMockCountryData[0],
      );
    });
  });
});
