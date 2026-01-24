/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpsertLangHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertLangHandler', () => {
  let handler: CommonUpsertLangHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpsertLangHandler,
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

    handler = module.get<CommonUpsertLangHandler>(CommonUpsertLangHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonUpsertLangHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an lang upserted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData[0])),
        );
      expect(await handler.main(commonMockLangData[0], 'Europe/Madrid')).toBe(
        commonMockLangData[0],
      );
    });
  });
});
