import {
  CommonCreateCountriesHandler,
  CommonCreateCountriesResolver,
} from '@api/common/country';
import { CommonCreateCountryInput } from '@api/graphql';
import { commonMockCountryData } from '@app/common/country';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateCountriesResolver', () => {
  let resolver: CommonCreateCountriesResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateCountriesResolver,
        {
          provide: CommonCreateCountriesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateCountriesResolver>(
      CommonCreateCountriesResolver,
    );
  });

  test('CommonCreateCountriesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateCountriesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an countries created', async () => {
      expect(
        await resolver.main(<CommonCreateCountryInput[]>commonMockCountryData),
      ).toBe(undefined);
    });
  });
});
