/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappDeleteConversationByIdController,
  WhatsappDeleteConversationByIdHandler,
} from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteConversationByIdController', () => {
  let controller: WhatsappDeleteConversationByIdController;
  let handler: WhatsappDeleteConversationByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappDeleteConversationByIdController],
      providers: [
        {
          provide: WhatsappDeleteConversationByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappDeleteConversationByIdController>(
      WhatsappDeleteConversationByIdController,
    );
    handler = module.get<WhatsappDeleteConversationByIdHandler>(
      WhatsappDeleteConversationByIdHandler,
    );
  });

  describe('main', () => {
    test('WhatsappDeleteConversationByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an conversation deleted', async () => {
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
