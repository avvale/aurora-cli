/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonGetLangsHandler,
  CommonGetLangsResolver,
} from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetLangsResolver', () => {
  let resolver: CommonGetLangsResolver;
  let handler: CommonGetLangsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonGetLangsResolver,
        {
          provide: CommonGetLangsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonGetLangsResolver>(CommonGetLangsResolver);
    handler = module.get<CommonGetLangsHandler>(CommonGetLangsHandler);
  });

  test('CommonGetLangsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonGetLangsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a commonMockLangData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData)),
        );
      expect(await resolver.main()).toBe(commonMockLangData);
    });
  });
});
