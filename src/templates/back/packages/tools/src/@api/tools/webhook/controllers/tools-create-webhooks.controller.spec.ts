import {
  ToolsCreateWebhooksController,
  ToolsCreateWebhooksHandler,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhooksController', () => {
  let controller: ToolsCreateWebhooksController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToolsCreateWebhooksController],
      providers: [
        {
          provide: ToolsCreateWebhooksHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsCreateWebhooksController>(
      ToolsCreateWebhooksController,
    );
  });

  describe('main', () => {
    test('ToolsCreateWebhooksController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an toolsMockWebhookData created', async () => {
      expect(await controller.main(toolsMockWebhookData)).toBe(undefined);
    });
  });
});
