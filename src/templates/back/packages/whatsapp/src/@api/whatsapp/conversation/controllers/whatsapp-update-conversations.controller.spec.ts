import {
  WhatsappUpdateConversationsController,
  WhatsappUpdateConversationsHandler,
} from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateConversationsController', () => {
  let controller: WhatsappUpdateConversationsController;
  let handler: WhatsappUpdateConversationsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappUpdateConversationsController],
      providers: [
        {
          provide: WhatsappUpdateConversationsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappUpdateConversationsController>(
      WhatsappUpdateConversationsController,
    );
    handler = module.get<WhatsappUpdateConversationsHandler>(
      WhatsappUpdateConversationsHandler,
    );
  });

  describe('main', () => {
    test('WhatsappUpdateConversationsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a conversations updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(whatsappMockConversationData[0])),
        );
      expect(await controller.main(whatsappMockConversationData[0])).toBe(
        whatsappMockConversationData[0],
      );
    });
  });
});
