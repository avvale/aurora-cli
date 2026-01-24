/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteWebhookLogsHandler } from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookLogsHandler', () => {
  let handler: ToolsDeleteWebhookLogsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsDeleteWebhookLogsHandler,
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

    handler = module.get<ToolsDeleteWebhookLogsHandler>(
      ToolsDeleteWebhookLogsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsDeleteWebhookLogsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsDeleteWebhookLogsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an toolsMockWebhookLogData deleted', async () => {
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
