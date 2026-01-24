/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageFindOutboxByIdHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindOutboxByIdHandler', () => {
  let handler: MessageFindOutboxByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageFindOutboxByIdHandler,
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

    handler = module.get<MessageFindOutboxByIdHandler>(
      MessageFindOutboxByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('MessageFindOutboxByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('MessageFindOutboxByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an outbox by id', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockOutboxData[0])),
        );
      expect(
        await handler.main(messageMockOutboxData[0].id, {}, 'Europe/Madrid'),
      ).toBe(messageMockOutboxData[0]);
    });
  });
});
