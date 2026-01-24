/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteLangByIdHandler } from '@api/common/lang';
import { commonMockLangData } from '@app/common/lang';
import {
  CoreGetLangsService,
  ICommandBus,
  IQueryBus,
} from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteLangByIdController', () => {
  let handler: CommonDeleteLangByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteLangByIdHandler,
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

    handler = module.get<CommonDeleteLangByIdHandler>(
      CommonDeleteLangByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonDeleteLangByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an lang deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockLangData[0])),
        );
      expect(
        await handler.main(commonMockLangData[0].id, {}, 'Europe/Madrid'),
      ).toBe(commonMockLangData[0]);
    });
  });
});
