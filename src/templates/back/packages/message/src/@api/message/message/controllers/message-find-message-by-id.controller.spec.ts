import {
  MessageFindMessageByIdController,
  MessageFindMessageByIdHandler,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindMessageByIdController', () => {
  let controller: MessageFindMessageByIdController;
  let handler: MessageFindMessageByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessageFindMessageByIdController],
      providers: [
        {
          provide: MessageFindMessageByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessageFindMessageByIdController>(
      MessageFindMessageByIdController,
    );
    handler = module.get<MessageFindMessageByIdHandler>(
      MessageFindMessageByIdHandler,
    );
  });

  describe('main', () => {
    test('MessageFindMessageByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an message by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockMessageData[0])),
        );
      expect(await controller.main(messageMockMessageData[0].id)).toBe(
        messageMockMessageData[0],
      );
    });
  });
});
