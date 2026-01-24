/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonUpdateCountriesHandler,
  CommonUpdateCountriesResolver,
} from '@api/common/country';
import { CommonUpdateCountriesInput } from '@api/graphql';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateCountriesResolver', () => {
  let resolver: CommonUpdateCountriesResolver;
  let handler: CommonUpdateCountriesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        CommonUpdateCountriesResolver,
        {
          provide: CommonUpdateCountriesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonUpdateCountriesResolver>(
      CommonUpdateCountriesResolver,
    );
    handler = module.get<CommonUpdateCountriesHandler>(
      CommonUpdateCountriesHandler,
    );
  });

  test('CommonUpdateCountriesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateCountriesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a countries updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockCountryData[0])),
        );
      expect(
        await resolver.main(
          <CommonUpdateCountriesInput>commonMockCountryData[0],
        ),
      ).toBe(commonMockCountryData[0]);
    });
  });
});
