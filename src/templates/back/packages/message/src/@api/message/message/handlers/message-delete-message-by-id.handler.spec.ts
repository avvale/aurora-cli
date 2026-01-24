/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteMessageByIdHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteMessageByIdController', () => {
  let handler: MessageDeleteMessageByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageDeleteMessageByIdHandler,
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

    handler = module.get<MessageDeleteMessageByIdHandler>(
      MessageDeleteMessageByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('MessageDeleteMessageByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an message deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockMessageData[0])),
        );
      expect(
        await handler.main(messageMockMessageData[0].id, {}, 'Europe/Madrid'),
      ).toBe(messageMockMessageData[0]);
    });
  });
});
