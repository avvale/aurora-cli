/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonFindLangHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindLangHandler', () => {
  let handler: CommonFindLangHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindLangHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonFindLangHandler>(CommonFindLangHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonFindLangHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindLangHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a lang', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockLangData[0],
      );
    });
  });
});
