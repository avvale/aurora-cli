import {
  WhatsappFindMessageByIdController,
  WhatsappFindMessageByIdHandler,
} from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindMessageByIdController', () => {
  let controller: WhatsappFindMessageByIdController;
  let handler: WhatsappFindMessageByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappFindMessageByIdController],
      providers: [
        {
          provide: WhatsappFindMessageByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappFindMessageByIdController>(
      WhatsappFindMessageByIdController,
    );
    handler = module.get<WhatsappFindMessageByIdHandler>(
      WhatsappFindMessageByIdHandler,
    );
  });

  describe('main', () => {
    test('WhatsappFindMessageByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an message by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockMessageData[0])),
        );
      expect(await controller.main(whatsappMockMessageData[0].id)).toBe(
        whatsappMockMessageData[0],
      );
    });
  });
});
