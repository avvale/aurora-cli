import { ToolsCreateWebhookLogsHandler } from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookLogsHandler', () => {
  let handler: ToolsCreateWebhookLogsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsCreateWebhookLogsHandler,
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

    handler = module.get<ToolsCreateWebhookLogsHandler>(
      ToolsCreateWebhookLogsHandler,
    );
  });

  describe('main', () => {
    test('ToolsCreateWebhookLogsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an toolsMockWebhookLogData created', async () => {
      expect(await handler.main(toolsMockWebhookLogData)).toBe(true);
    });
  });
});
