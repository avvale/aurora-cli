/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappDeleteConversationsHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteConversationsHandler', () => {
  let handler: WhatsappDeleteConversationsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappDeleteConversationsHandler,
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

    handler = module.get<WhatsappDeleteConversationsHandler>(
      WhatsappDeleteConversationsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('WhatsappDeleteConversationsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappDeleteConversationsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an whatsappMockConversationData deleted', async () => {
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
