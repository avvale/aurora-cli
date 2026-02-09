/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonCreateCountryHandler,
  CommonCreateCountryResolver,
} from '@api/common/country';
import { CommonCreateCountryInput } from '@api/graphql';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateCountryResolver', () => {
  let resolver: CommonCreateCountryResolver;
  let handler: CommonCreateCountryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        CommonCreateCountryResolver,
        {
          provide: CommonCreateCountryHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateCountryResolver>(
      CommonCreateCountryResolver,
    );
    handler = module.get<CommonCreateCountryHandler>(
      CommonCreateCountryHandler,
    );
  });

  test('CommonCreateCountryResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateCountryResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an country created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockCountryData[0])),
        );
      expect(
        await resolver.main(<CommonCreateCountryInput>commonMockCountryData[0]),
      ).toBe(commonMockCountryData[0]);
    });
  });
});
