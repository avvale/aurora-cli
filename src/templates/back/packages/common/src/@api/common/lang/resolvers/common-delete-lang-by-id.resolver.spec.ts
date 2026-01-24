/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteLangByIdHandler,
  CommonDeleteLangByIdResolver,
} from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteLangByIdResolver', () => {
  let resolver: CommonDeleteLangByIdResolver;
  let handler: CommonDeleteLangByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteLangByIdResolver,
        {
          provide: CommonDeleteLangByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonDeleteLangByIdResolver>(
      CommonDeleteLangByIdResolver,
    );
    handler = module.get<CommonDeleteLangByIdHandler>(
      CommonDeleteLangByIdHandler,
    );
  });

  test('CommonDeleteLangByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteLangByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an lang deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData[0])),
        );
      expect(await resolver.main(commonMockLangData[0].id)).toBe(
        commonMockLangData[0],
      );
    });
  });
});
