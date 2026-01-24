/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetLangsHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetLangsHandler', () => {
  let handler: CommonGetLangsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonGetLangsHandler,
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

    handler = module.get<CommonGetLangsHandler>(CommonGetLangsHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonGetLangsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonGetLangsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a commonMockLangData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockLangData,
      );
    });
  });
});
