/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonFindCountryByIdHandler,
  CommonFindCountryByIdResolver,
} from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindCountryByIdResolver', () => {
  let resolver: CommonFindCountryByIdResolver;
  let handler: CommonFindCountryByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        CommonFindCountryByIdResolver,
        {
          provide: CommonFindCountryByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonFindCountryByIdResolver>(
      CommonFindCountryByIdResolver,
    );
    handler = module.get<CommonFindCountryByIdHandler>(
      CommonFindCountryByIdHandler,
    );
  });

  test('CommonFindCountryByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindCountryByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an country by id', async () => {
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
