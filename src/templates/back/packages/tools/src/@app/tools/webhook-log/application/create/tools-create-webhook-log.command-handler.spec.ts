import {
  ToolsCreateWebhookLogCommand,
  toolsMockWebhookLogData,
} from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsCreateWebhookLogCommandHandler } from './tools-create-webhook-log.command-handler';
import { ToolsCreateWebhookLogService } from './tools-create-webhook-log.service';

describe('ToolsCreateWebhookLogCommandHandler', () => {
  let commandHandler: ToolsCreateWebhookLogCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsCreateWebhookLogCommandHandler,
        {
          provide: ToolsCreateWebhookLogService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<ToolsCreateWebhookLogCommandHandler>(
      ToolsCreateWebhookLogCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateWebhookLogCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the ToolsCreateWebhookLogService', async () => {
      expect(
        await commandHandler.execute(
          new ToolsCreateWebhookLogCommand(
            {
              id: toolsMockWebhookLogData[0].id,
              rowId: toolsMockWebhookLogData[0].rowId,
              url: toolsMockWebhookLogData[0].url,
              headerRequest: toolsMockWebhookLogData[0].headerRequest,
              bodyRequest: toolsMockWebhookLogData[0].bodyRequest,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
