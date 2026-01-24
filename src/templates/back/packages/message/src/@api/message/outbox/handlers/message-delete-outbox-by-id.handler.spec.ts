/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteOutboxByIdHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteOutboxByIdController', () => {
  let handler: MessageDeleteOutboxByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageDeleteOutboxByIdHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<MessageDeleteOutboxByIdHandler>(
      MessageDeleteOutboxByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('MessageDeleteOutboxByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an outbox deleted', async () => {
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
