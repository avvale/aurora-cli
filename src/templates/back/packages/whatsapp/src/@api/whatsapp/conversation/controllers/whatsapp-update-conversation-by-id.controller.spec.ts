import {
  WhatsappUpdateConversationByIdController,
  WhatsappUpdateConversationByIdHandler,
} from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateConversationByIdController', () => {
  let controller: WhatsappUpdateConversationByIdController;
  let handler: WhatsappUpdateConversationByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappUpdateConversationByIdController],
      providers: [
        {
          provide: WhatsappUpdateConversationByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappUpdateConversationByIdController>(
      WhatsappUpdateConversationByIdController,
    );
    handler = module.get<WhatsappUpdateConversationByIdHandler>(
      WhatsappUpdateConversationByIdHandler,
    );
  });

  describe('main', () => {
    test('WhatsappUpdateConversationByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a conversation updated', async () => {
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
