/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappFindConversationHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindConversationHandler', () => {
  let handler: WhatsappFindConversationHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappFindConversationHandler,
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

    handler = module.get<WhatsappFindConversationHandler>(
      WhatsappFindConversationHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('WhatsappFindConversationHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappFindConversationHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a conversation', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(whatsappMockConversationData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        whatsappMockConversationData[0],
      );
    });
  });
});
