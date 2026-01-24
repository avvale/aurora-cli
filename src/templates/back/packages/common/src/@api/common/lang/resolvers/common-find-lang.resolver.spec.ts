/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonFindLangHandler,
  CommonFindLangResolver,
} from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindLangResolver', () => {
  let resolver: CommonFindLangResolver;
  let handler: CommonFindLangHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindLangResolver,
        {
          provide: CommonFindLangHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonFindLangResolver>(CommonFindLangResolver);
    handler = module.get<CommonFindLangHandler>(CommonFindLangHandler);
  });

  test('CommonFindLangResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindLangResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a lang', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData[0])),
        );
      expect(await resolver.main()).toBe(commonMockLangData[0]);
    });
  });
});
