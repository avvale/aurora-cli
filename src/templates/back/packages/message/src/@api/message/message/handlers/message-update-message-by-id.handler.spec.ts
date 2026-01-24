/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateMessageByIdInput } from '@api/graphql';
import { MessageUpdateMessageByIdHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateMessageByIdHandler', () => {
  let handler: MessageUpdateMessageByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageUpdateMessageByIdHandler,
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

    handler = module.get<MessageUpdateMessageByIdHandler>(
      MessageUpdateMessageByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('MessageUpdateMessageByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('MessageUpdateMessageByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a message updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockMessageData[0])),
        );
      expect(
        await handler.main(
          <MessageUpdateMessageByIdInput>messageMockMessageData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(messageMockMessageData[0]);
    });
  });
});
