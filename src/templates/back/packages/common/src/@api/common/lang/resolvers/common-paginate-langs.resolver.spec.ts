/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonPaginateLangsHandler,
  CommonPaginateLangsResolver,
} from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateLangsResolver', () => {
  let resolver: CommonPaginateLangsResolver;
  let handler: CommonPaginateLangsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonPaginateLangsResolver,
        {
          provide: CommonPaginateLangsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonPaginateLangsResolver>(
      CommonPaginateLangsResolver,
    );
    handler = module.get<CommonPaginateLangsHandler>(
      CommonPaginateLangsHandler,
    );
  });

  test('CommonPaginateLangsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonPaginateLangsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a commonMockLangData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: commonMockLangData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: commonMockLangData,
      });
    });
  });
});
