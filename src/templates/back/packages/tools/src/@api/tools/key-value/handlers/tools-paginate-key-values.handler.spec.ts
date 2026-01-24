/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsPaginateKeyValuesHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateKeyValuesHandler', () => {
  let handler: ToolsPaginateKeyValuesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsPaginateKeyValuesHandler,
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

    handler = module.get<ToolsPaginateKeyValuesHandler>(
      ToolsPaginateKeyValuesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsPaginateKeyValuesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsPaginateKeyValuesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a keyValues', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: toolsMockKeyValueData.length,
              count: toolsMockKeyValueData.length,
              rows: toolsMockKeyValueData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: toolsMockKeyValueData.length,
        count: toolsMockKeyValueData.length,
        rows: toolsMockKeyValueData,
      });
    });
  });
});
