import {
  ToolsDeleteWebhookByIdCommand,
  toolsMockWebhookData,
} from '@app/tools/webhook';
import { ToolsDeleteWebhookByIdCommandHandler } from '@app/tools/webhook/application/delete/tools-delete-webhook-by-id.command-handler';
import { ToolsDeleteWebhookByIdService } from '@app/tools/webhook/application/delete/tools-delete-webhook-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookByIdCommandHandler', () => {
  let commandHandler: ToolsDeleteWebhookByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsDeleteWebhookByIdCommandHandler,
        {
          provide: ToolsDeleteWebhookByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<ToolsDeleteWebhookByIdCommandHandler>(
      ToolsDeleteWebhookByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('ToolsDeleteWebhookByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the ToolsDeleteWebhookByIdService', async () => {
      expect(
        await commandHandler.execute(
          new ToolsDeleteWebhookByIdCommand(toolsMockWebhookData[0].id),
        ),
      ).toBe(undefined);
    });
  });
});
