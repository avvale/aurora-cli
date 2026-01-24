import {
  WhatsappDeleteMessagesController,
  WhatsappDeleteMessagesHandler,
} from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteMessagesController', () => {
  let controller: WhatsappDeleteMessagesController;
  let handler: WhatsappDeleteMessagesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [WhatsappDeleteMessagesController],
      providers: [
        {
          provide: WhatsappDeleteMessagesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<WhatsappDeleteMessagesController>(
      WhatsappDeleteMessagesController,
    );
    handler = module.get<WhatsappDeleteMessagesHandler>(
      WhatsappDeleteMessagesHandler,
    );
  });

  describe('main', () => {
    test('WhatsappDeleteMessagesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an whatsappMockMessageData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockMessageData)),
        );
      expect(await controller.main()).toBe(whatsappMockMessageData);
    });
  });
});
