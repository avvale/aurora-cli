/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsGetWebhookLogsHandler } from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetWebhookLogsHandler', () => {
  let handler: ToolsGetWebhookLogsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsGetWebhookLogsHandler,
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

    handler = module.get<ToolsGetWebhookLogsHandler>(
      ToolsGetWebhookLogsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsGetWebhookLogsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsGetWebhookLogsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a toolsMockWebhookLogData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookLogData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        toolsMockWebhookLogData,
      );
    });
  });
});
