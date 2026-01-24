/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteLangsHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteLangsHandler', () => {
  let handler: CommonDeleteLangsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteLangsHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonDeleteLangsHandler>(CommonDeleteLangsHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonDeleteLangsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteLangsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an commonMockLangData deleted', async () => {
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
