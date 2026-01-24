/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsPaginateWebhooksHandler } from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateWebhooksHandler', () => {
  let handler: ToolsPaginateWebhooksHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsPaginateWebhooksHandler,
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

    handler = module.get<ToolsPaginateWebhooksHandler>(
      ToolsPaginateWebhooksHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsPaginateWebhooksHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsPaginateWebhooksHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a webhooks', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: toolsMockWebhookData.length,
              count: toolsMockWebhookData.length,
              rows: toolsMockWebhookData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: toolsMockWebhookData.length,
        count: toolsMockWebhookData.length,
        rows: toolsMockWebhookData,
      });
    });
  });
});
