import {
  WhatsappGetMessagesController,
  WhatsappGetMessagesHandler,
} from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappGetMessagesController', () => {
  let controller: WhatsappGetMessagesController;
  let handler: WhatsappGetMessagesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappGetMessagesController],
      providers: [
        {
          provide: WhatsappGetMessagesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappGetMessagesController>(
      WhatsappGetMessagesController,
    );
    handler = module.get<WhatsappGetMessagesHandler>(
      WhatsappGetMessagesHandler,
    );
  });

  describe('main', () => {
    test('WhatsappGetMessagesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a whatsappMockMessageData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockMessageData)),
        );
      expect(await controller.main()).toBe(whatsappMockMessageData);
    });
  });
});
