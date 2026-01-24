/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappGetMessagesHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappGetMessagesHandler', () => {
  let handler: WhatsappGetMessagesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappGetMessagesHandler,
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

    handler = module.get<WhatsappGetMessagesHandler>(
      WhatsappGetMessagesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('WhatsappGetMessagesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappGetMessagesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a whatsappMockMessageData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockMessageData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        whatsappMockMessageData,
      );
    });
  });
});
