import {
  CommonCreateLangsHandler,
  CommonCreateLangsResolver,
} from '@api/common/lang';
import { CommonCreateLangInput } from '@api/graphql';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateLangsResolver', () => {
  let resolver: CommonCreateLangsResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateLangsResolver,
        {
          provide: CommonCreateLangsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateLangsResolver>(CommonCreateLangsResolver);
  });

  test('CommonCreateLangsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateLangsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an langs created', async () => {
      expect(
        await resolver.main(<CommonCreateLangInput[]>commonMockLangData),
      ).toBe(undefined);
    });
  });
});
