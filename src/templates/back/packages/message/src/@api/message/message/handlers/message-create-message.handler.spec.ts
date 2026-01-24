/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageCreateMessageHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateMessageHandler', () => {
  let handler: MessageCreateMessageHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageCreateMessageHandler,
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

    handler = module.get<MessageCreateMessageHandler>(
      MessageCreateMessageHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('MessageCreateMessageHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an message created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockMessageData[0])),
        );
      expect(
        await handler.main(messageMockMessageData[0], 'Europe/Madrid'),
      ).toBe(messageMockMessageData[0]);
    });
  });
});
