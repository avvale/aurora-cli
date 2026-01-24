import {
  ToolsFindWebhookLogController,
  ToolsFindWebhookLogHandler,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookLogController', () => {
  let controller: ToolsFindWebhookLogController;
  let handler: ToolsFindWebhookLogHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsFindWebhookLogController],
      providers: [
        {
          provide: ToolsFindWebhookLogHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsFindWebhookLogController>(
      ToolsFindWebhookLogController,
    );
    handler = module.get<ToolsFindWebhookLogHandler>(
      ToolsFindWebhookLogHandler,
    );
  });

  describe('main', () => {
    test('ToolsFindWebhookLogController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a webhookLog', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookLogData[0])),
        );
      expect(await controller.main()).toBe(toolsMockWebhookLogData[0]);
    });
  });
});
