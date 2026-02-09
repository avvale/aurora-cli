/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonFindLangByIdHandler,
  CommonFindLangByIdResolver,
} from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindLangByIdResolver', () => {
  let resolver: CommonFindLangByIdResolver;
  let handler: CommonFindLangByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindLangByIdResolver,
        {
          provide: CommonFindLangByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonFindLangByIdResolver>(
      CommonFindLangByIdResolver,
    );
    handler = module.get<CommonFindLangByIdHandler>(CommonFindLangByIdHandler);
  });

  test('CommonFindLangByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindLangByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an lang by id', async () => {
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
