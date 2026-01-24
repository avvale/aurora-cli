/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindResourceHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindResourceHandler', () => {
  let handler: CommonFindResourceHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindResourceHandler,
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

    handler = module.get<CommonFindResourceHandler>(CommonFindResourceHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonFindResourceHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindResourceHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a resource', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockResourceData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockResourceData[0],
      );
    });
  });
});
