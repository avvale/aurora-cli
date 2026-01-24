/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessagePaginateMessagesHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateMessagesHandler', () => {
  let handler: MessagePaginateMessagesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessagePaginateMessagesHandler,
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

    handler = module.get<MessagePaginateMessagesHandler>(
      MessagePaginateMessagesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('MessagePaginateMessagesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('MessagePaginateMessagesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a messages', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: messageMockMessageData.length,
              count: messageMockMessageData.length,
              rows: messageMockMessageData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: messageMockMessageData.length,
        count: messageMockMessageData.length,
        rows: messageMockMessageData,
      });
    });
  });
});
