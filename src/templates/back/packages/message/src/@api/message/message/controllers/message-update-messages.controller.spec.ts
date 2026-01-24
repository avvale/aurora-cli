import {
  MessageUpdateMessagesController,
  MessageUpdateMessagesHandler,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateMessagesController', () => {
  let controller: MessageUpdateMessagesController;
  let handler: MessageUpdateMessagesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessageUpdateMessagesController],
      providers: [
        {
          provide: MessageUpdateMessagesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessageUpdateMessagesController>(
      MessageUpdateMessagesController,
    );
    handler = module.get<MessageUpdateMessagesHandler>(
      MessageUpdateMessagesHandler,
    );
  });

  describe('main', () => {
    test('MessageUpdateMessagesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a messages updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockMessageData[0])),
        );
      expect(await controller.main(messageMockMessageData[0])).toBe(
        messageMockMessageData[0],
      );
    });
  });
});
