/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonPaginateCountriesHandler,
  CommonPaginateCountriesResolver,
} from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateCountriesResolver', () => {
  let resolver: CommonPaginateCountriesResolver;
  let handler: CommonPaginateCountriesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        CommonPaginateCountriesResolver,
        {
          provide: CommonPaginateCountriesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonPaginateCountriesResolver>(
      CommonPaginateCountriesResolver,
    );
    handler = module.get<CommonPaginateCountriesHandler>(
      CommonPaginateCountriesHandler,
    );
  });

  test('CommonPaginateCountriesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonPaginateCountriesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a commonMockCountryData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: commonMockCountryData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: commonMockCountryData,
      });
    });
  });
});
