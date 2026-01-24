import {
  WhatsappFindConversationByIdController,
  WhatsappFindConversationByIdHandler,
} from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindConversationByIdController', () => {
  let controller: WhatsappFindConversationByIdController;
  let handler: WhatsappFindConversationByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappFindConversationByIdController],
      providers: [
        {
          provide: WhatsappFindConversationByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappFindConversationByIdController>(
      WhatsappFindConversationByIdController,
    );
    handler = module.get<WhatsappFindConversationByIdHandler>(
      WhatsappFindConversationByIdHandler,
    );
  });

  describe('main', () => {
    test('WhatsappFindConversationByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an conversation by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(whatsappMockConversationData[0])),
        );
      expect(await controller.main(whatsappMockConversationData[0].id)).toBe(
        whatsappMockConversationData[0],
      );
    });
  });
});
