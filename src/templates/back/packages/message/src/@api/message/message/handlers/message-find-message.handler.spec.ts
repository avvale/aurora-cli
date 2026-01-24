/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageFindMessageHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindMessageHandler', () => {
  let handler: MessageFindMessageHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageFindMessageHandler,
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

    handler = module.get<MessageFindMessageHandler>(MessageFindMessageHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('MessageFindMessageHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('MessageFindMessageHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a message', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockMessageData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        messageMockMessageData[0],
      );
    });
  });
});
