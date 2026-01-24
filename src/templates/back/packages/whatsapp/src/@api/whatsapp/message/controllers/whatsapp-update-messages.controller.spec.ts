import {
  WhatsappUpdateMessagesController,
  WhatsappUpdateMessagesHandler,
} from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateMessagesController', () => {
  let controller: WhatsappUpdateMessagesController;
  let handler: WhatsappUpdateMessagesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappUpdateMessagesController],
      providers: [
        {
          provide: WhatsappUpdateMessagesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappUpdateMessagesController>(
      WhatsappUpdateMessagesController,
    );
    handler = module.get<WhatsappUpdateMessagesHandler>(
      WhatsappUpdateMessagesHandler,
    );
  });

  describe('main', () => {
    test('WhatsappUpdateMessagesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a messages updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockMessageData[0])),
        );
      expect(await controller.main(whatsappMockMessageData[0])).toBe(
        whatsappMockMessageData[0],
      );
    });
  });
});
