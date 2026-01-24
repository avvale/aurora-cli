import {
  MessagePaginateMessagesController,
  MessagePaginateMessagesHandler,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateMessagesController', () => {
  let controller: MessagePaginateMessagesController;
  let handler: MessagePaginateMessagesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MessagePaginateMessagesController],
      providers: [
        {
          provide: MessagePaginateMessagesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MessagePaginateMessagesController>(
      MessagePaginateMessagesController,
    );
    handler = module.get<MessagePaginateMessagesHandler>(
      MessagePaginateMessagesHandler,
    );
  });

  describe('main', () => {
    test('MessagePaginateMessagesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a messageMockMessageData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: messageMockMessageData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: messageMockMessageData,
      });
    });
  });
});
