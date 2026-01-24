/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappPaginateConversationsHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateConversationsHandler', () => {
  let handler: WhatsappPaginateConversationsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappPaginateConversationsHandler,
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

    handler = module.get<WhatsappPaginateConversationsHandler>(
      WhatsappPaginateConversationsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('WhatsappPaginateConversationsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappPaginateConversationsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a conversations', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: whatsappMockConversationData.length,
              count: whatsappMockConversationData.length,
              rows: whatsappMockConversationData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: whatsappMockConversationData.length,
        count: whatsappMockConversationData.length,
        rows: whatsappMockConversationData,
      });
    });
  });
});
