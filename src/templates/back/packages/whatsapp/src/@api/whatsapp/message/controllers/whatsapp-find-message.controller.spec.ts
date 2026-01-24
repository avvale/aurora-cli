import {
  WhatsappFindMessageController,
  WhatsappFindMessageHandler,
} from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindMessageController', () => {
  let controller: WhatsappFindMessageController;
  let handler: WhatsappFindMessageHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappFindMessageController],
      providers: [
        {
          provide: WhatsappFindMessageHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappFindMessageController>(
      WhatsappFindMessageController,
    );
    handler = module.get<WhatsappFindMessageHandler>(
      WhatsappFindMessageHandler,
    );
  });

  describe('main', () => {
    test('WhatsappFindMessageController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a message', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockMessageData[0])),
        );
      expect(await controller.main()).toBe(whatsappMockMessageData[0]);
    });
  });
});
