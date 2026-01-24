/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateInboxesInput } from '@api/graphql';
import { MessageUpdateInboxesHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxesHandler', () => {
  let handler: MessageUpdateInboxesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageUpdateInboxesHandler,
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

    handler = module.get<MessageUpdateInboxesHandler>(
      MessageUpdateInboxesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('MessageUpdateInboxesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('MessageUpdateInboxesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a inboxes updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockInboxData[0])),
        );
      expect(
        await handler.main(
          <MessageUpdateInboxesInput>messageMockInboxData[0],
          {},
          {},
          'Europe/Madrid',
        ),
      ).toBe(messageMockInboxData[0]);
    });
  });
});
