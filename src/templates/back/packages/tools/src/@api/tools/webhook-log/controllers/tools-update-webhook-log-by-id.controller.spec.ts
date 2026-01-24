import {
  ToolsUpdateWebhookLogByIdController,
  ToolsUpdateWebhookLogByIdHandler,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateWebhookLogByIdController', () => {
  let controller: ToolsUpdateWebhookLogByIdController;
  let handler: ToolsUpdateWebhookLogByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsUpdateWebhookLogByIdController],
      providers: [
        {
          provide: ToolsUpdateWebhookLogByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsUpdateWebhookLogByIdController>(
      ToolsUpdateWebhookLogByIdController,
    );
    handler = module.get<ToolsUpdateWebhookLogByIdHandler>(
      ToolsUpdateWebhookLogByIdHandler,
    );
  });

  describe('main', () => {
    test('ToolsUpdateWebhookLogByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a webhookLog updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookLogData[0])),
        );
      expect(await controller.main(toolsMockWebhookLogData[0])).toBe(
        toolsMockWebhookLogData[0],
      );
    });
  });
});
