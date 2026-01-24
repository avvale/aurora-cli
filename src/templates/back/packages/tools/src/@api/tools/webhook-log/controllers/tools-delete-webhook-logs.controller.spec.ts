import {
  ToolsDeleteWebhookLogsController,
  ToolsDeleteWebhookLogsHandler,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookLogsController', () => {
  let controller: ToolsDeleteWebhookLogsController;
  let handler: ToolsDeleteWebhookLogsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsDeleteWebhookLogsController],
      providers: [
        {
          provide: ToolsDeleteWebhookLogsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsDeleteWebhookLogsController>(
      ToolsDeleteWebhookLogsController,
    );
    handler = module.get<ToolsDeleteWebhookLogsHandler>(
      ToolsDeleteWebhookLogsHandler,
    );
  });

  describe('main', () => {
    test('ToolsDeleteWebhookLogsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an toolsMockWebhookLogData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookLogData)),
        );
      expect(await controller.main()).toBe(toolsMockWebhookLogData);
    });
  });
});
