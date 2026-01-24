/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappGetConversationsHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappGetConversationsHandler', () => {
  let handler: WhatsappGetConversationsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappGetConversationsHandler,
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

    handler = module.get<WhatsappGetConversationsHandler>(
      WhatsappGetConversationsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('WhatsappGetConversationsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappGetConversationsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a whatsappMockConversationData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockConversationData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        whatsappMockConversationData,
      );
    });
  });
});
