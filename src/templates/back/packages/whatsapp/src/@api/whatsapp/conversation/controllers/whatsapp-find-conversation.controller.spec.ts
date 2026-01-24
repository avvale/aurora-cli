import {
  WhatsappFindConversationController,
  WhatsappFindConversationHandler,
} from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindConversationController', () => {
  let controller: WhatsappFindConversationController;
  let handler: WhatsappFindConversationHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappFindConversationController],
      providers: [
        {
          provide: WhatsappFindConversationHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappFindConversationController>(
      WhatsappFindConversationController,
    );
    handler = module.get<WhatsappFindConversationHandler>(
      WhatsappFindConversationHandler,
    );
  });

  describe('main', () => {
    test('WhatsappFindConversationController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a conversation', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(whatsappMockConversationData[0])),
        );
      expect(await controller.main()).toBe(whatsappMockConversationData[0]);
    });
  });
});
