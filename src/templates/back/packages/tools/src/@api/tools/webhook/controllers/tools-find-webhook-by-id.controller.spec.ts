import {
  ToolsFindWebhookByIdController,
  ToolsFindWebhookByIdHandler,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookByIdController', () => {
  let controller: ToolsFindWebhookByIdController;
  let handler: ToolsFindWebhookByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsFindWebhookByIdController],
      providers: [
        {
          provide: ToolsFindWebhookByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsFindWebhookByIdController>(
      ToolsFindWebhookByIdController,
    );
    handler = module.get<ToolsFindWebhookByIdHandler>(
      ToolsFindWebhookByIdHandler,
    );
  });

  describe('main', () => {
    test('ToolsFindWebhookByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an webhook by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookData[0])),
        );
      expect(await controller.main(toolsMockWebhookData[0].id)).toBe(
        toolsMockWebhookData[0],
      );
    });
  });
});
