import {
  ToolsUpdateWebhookByIdController,
  ToolsUpdateWebhookByIdHandler,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateWebhookByIdController', () => {
  let controller: ToolsUpdateWebhookByIdController;
  let handler: ToolsUpdateWebhookByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsUpdateWebhookByIdController],
      providers: [
        {
          provide: ToolsUpdateWebhookByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsUpdateWebhookByIdController>(
      ToolsUpdateWebhookByIdController,
    );
    handler = module.get<ToolsUpdateWebhookByIdHandler>(
      ToolsUpdateWebhookByIdHandler,
    );
  });

  describe('main', () => {
    test('ToolsUpdateWebhookByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a webhook updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookData[0])),
        );
      expect(await controller.main(toolsMockWebhookData[0])).toBe(
        toolsMockWebhookData[0],
      );
    });
  });
});
