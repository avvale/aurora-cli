/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageFindMessageByIdHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindMessageByIdHandler', () => {
  let handler: MessageFindMessageByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageFindMessageByIdHandler,
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

    handler = module.get<MessageFindMessageByIdHandler>(
      MessageFindMessageByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('MessageFindMessageByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('MessageFindMessageByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an message by id', async () => {
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
