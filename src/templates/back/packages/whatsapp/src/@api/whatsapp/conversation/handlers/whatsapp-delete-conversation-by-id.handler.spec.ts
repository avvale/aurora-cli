/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappDeleteConversationByIdHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteConversationByIdController', () => {
  let handler: WhatsappDeleteConversationByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappDeleteConversationByIdHandler,
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

    handler = module.get<WhatsappDeleteConversationByIdHandler>(
      WhatsappDeleteConversationByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('WhatsappDeleteConversationByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an conversation deleted', async () => {
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
