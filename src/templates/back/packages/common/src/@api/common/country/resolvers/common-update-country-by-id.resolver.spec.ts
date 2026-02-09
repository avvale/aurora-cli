/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonUpdateCountryByIdHandler,
  CommonUpdateCountryByIdResolver,
} from '@api/common/country';
import { CommonUpdateCountryByIdInput } from '@api/graphql';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateCountryByIdResolver', () => {
  let resolver: CommonUpdateCountryByIdResolver;
  let handler: CommonUpdateCountryByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        CommonUpdateCountryByIdResolver,
        {
          provide: CommonUpdateCountryByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonUpdateCountryByIdResolver>(
      CommonUpdateCountryByIdResolver,
    );
    handler = module.get<CommonUpdateCountryByIdHandler>(
      CommonUpdateCountryByIdHandler,
    );
  });

  test('CommonUpdateCountryByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateCountryByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a country by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockCountryData[0])),
        );
      expect(
        await resolver.main(
          <CommonUpdateCountryByIdInput>commonMockCountryData[0],
        ),
      ).toBe(commonMockCountryData[0]);
    });
  });
});
