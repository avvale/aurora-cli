/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageCreateOutboxHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateOutboxHandler', () => {
  let handler: MessageCreateOutboxHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageCreateOutboxHandler,
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

    handler = module.get<MessageCreateOutboxHandler>(
      MessageCreateOutboxHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('MessageCreateOutboxHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an outbox created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockOutboxData[0])),
        );
      expect(
        await handler.main(messageMockOutboxData[0], 'Europe/Madrid'),
      ).toBe(messageMockOutboxData[0]);
    });
  });
});
