/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonUpdateLangsHandler,
  CommonUpdateLangsResolver,
} from '@api/common/lang';
import { CommonUpdateLangsInput } from '@api/graphql';
import { commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateLangsResolver', () => {
  let resolver: CommonUpdateLangsResolver;
  let handler: CommonUpdateLangsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpdateLangsResolver,
        {
          provide: CommonUpdateLangsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonUpdateLangsResolver>(CommonUpdateLangsResolver);
    handler = module.get<CommonUpdateLangsHandler>(CommonUpdateLangsHandler);
  });

  test('CommonUpdateLangsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateLangsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a langs updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData[0])),
        );
      expect(
        await resolver.main(<CommonUpdateLangsInput>commonMockLangData[0]),
      ).toBe(commonMockLangData[0]);
    });
  });
});
