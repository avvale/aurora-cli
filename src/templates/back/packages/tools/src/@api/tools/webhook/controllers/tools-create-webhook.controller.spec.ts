import {
  ToolsCreateWebhookController,
  ToolsCreateWebhookHandler,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookController', () => {
  let controller: ToolsCreateWebhookController;
  let handler: ToolsCreateWebhookHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsCreateWebhookController],
      providers: [
        {
          provide: ToolsCreateWebhookHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsCreateWebhookController>(
      ToolsCreateWebhookController,
    );
    handler = module.get<ToolsCreateWebhookHandler>(ToolsCreateWebhookHandler);
  });

  describe('main', () => {
    test('ToolsCreateWebhookController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an webhook created', async () => {
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
