/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonGetCountriesHandler,
  CommonGetCountriesResolver,
} from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetCountriesResolver', () => {
  let resolver: CommonGetCountriesResolver;
  let handler: CommonGetCountriesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        CommonGetCountriesResolver,
        {
          provide: CommonGetCountriesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonGetCountriesResolver>(
      CommonGetCountriesResolver,
    );
    handler = module.get<CommonGetCountriesHandler>(CommonGetCountriesHandler);
  });

  test('CommonGetCountriesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonGetCountriesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a commonMockCountryData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockCountryData)),
        );
      expect(await resolver.main()).toBe(commonMockCountryData);
    });
  });
});
