/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateConversationByIdInput } from '@api/graphql';
import { WhatsappUpdateConversationByIdHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateConversationByIdHandler', () => {
  let handler: WhatsappUpdateConversationByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappUpdateConversationByIdHandler,
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

    handler = module.get<WhatsappUpdateConversationByIdHandler>(
      WhatsappUpdateConversationByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('WhatsappUpdateConversationByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappUpdateConversationByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a conversation updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(whatsappMockConversationData[0])),
        );
      expect(
        await handler.main(
          <WhatsappUpdateConversationByIdInput>whatsappMockConversationData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(whatsappMockConversationData[0]);
    });
  });
});
