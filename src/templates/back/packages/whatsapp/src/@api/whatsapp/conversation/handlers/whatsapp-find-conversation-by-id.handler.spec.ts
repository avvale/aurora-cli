/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappFindConversationByIdHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindConversationByIdHandler', () => {
  let handler: WhatsappFindConversationByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappFindConversationByIdHandler,
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

    handler = module.get<WhatsappFindConversationByIdHandler>(
      WhatsappFindConversationByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('WhatsappFindConversationByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappFindConversationByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an conversation by id', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(whatsappMockConversationData[0])),
        );
      expect(
        await handler.main(
          whatsappMockConversationData[0].id,
          {},
          'Europe/Madrid',
        ),
      ).toBe(whatsappMockConversationData[0]);
    });
  });
});
