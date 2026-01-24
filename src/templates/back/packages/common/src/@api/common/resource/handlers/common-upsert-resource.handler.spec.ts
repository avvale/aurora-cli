/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpsertResourceHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertResourceHandler', () => {
  let handler: CommonUpsertResourceHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpsertResourceHandler,
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

    handler = module.get<CommonUpsertResourceHandler>(
      CommonUpsertResourceHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonUpsertResourceHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an resource upserted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockResourceData[0])),
        );
      expect(
        await handler.main(commonMockResourceData[0], 'Europe/Madrid'),
      ).toBe(commonMockResourceData[0]);
    });
  });
});
