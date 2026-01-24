/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateLangHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import {
  CoreGetLangsService,
  ICommandBus,
  IQueryBus,
} from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateLangHandler', () => {
  let handler: CommonCreateLangHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonCreateLangHandler,
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
        {
          provide: CoreGetLangsService,
          useValue: {
            init: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonCreateLangHandler>(CommonCreateLangHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonCreateLangHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an lang created', async () => {
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
