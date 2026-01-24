/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetResourcesHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetResourcesHandler', () => {
  let handler: CommonGetResourcesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonGetResourcesHandler,
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

    handler = module.get<CommonGetResourcesHandler>(CommonGetResourcesHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonGetResourcesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonGetResourcesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a commonMockResourceData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockResourceData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockResourceData,
      );
    });
  });
});
