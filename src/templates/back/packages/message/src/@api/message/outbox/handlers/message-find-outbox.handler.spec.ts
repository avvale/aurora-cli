/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageFindOutboxHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindOutboxHandler', () => {
  let handler: MessageFindOutboxHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageFindOutboxHandler,
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

    handler = module.get<MessageFindOutboxHandler>(MessageFindOutboxHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('MessageFindOutboxHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('MessageFindOutboxHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a outbox', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockOutboxData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        messageMockOutboxData[0],
      );
    });
  });
});
