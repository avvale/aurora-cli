/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageGetMessagesHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetMessagesHandler', () => {
  let handler: MessageGetMessagesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageGetMessagesHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<MessageGetMessagesHandler>(MessageGetMessagesHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('MessageGetMessagesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('MessageGetMessagesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a messageMockMessageData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockMessageData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        messageMockMessageData,
      );
    });
  });
});
