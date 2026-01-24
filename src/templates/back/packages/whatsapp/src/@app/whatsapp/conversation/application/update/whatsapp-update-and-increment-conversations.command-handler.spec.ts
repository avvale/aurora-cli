import {
  whatsappMockConversationData,
  WhatsappUpdateAndIncrementConversationsCommand,
} from '@app/whatsapp/conversation';
import { WhatsappUpdateAndIncrementConversationsCommandHandler } from '@app/whatsapp/conversation/application/update/whatsapp-update-and-increment-conversations.command-handler';
import { WhatsappUpdateAndIncrementConversationsService } from '@app/whatsapp/conversation/application/update/whatsapp-update-and-increment-conversations.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateAndIncrementConversationsCommandHandler', () => {
  let commandHandler: WhatsappUpdateAndIncrementConversationsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappUpdateAndIncrementConversationsCommandHandler,
        {
          provide: WhatsappUpdateAndIncrementConversationsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<WhatsappUpdateAndIncrementConversationsCommandHandler>(
        WhatsappUpdateAndIncrementConversationsCommandHandler,
      );
  });

  describe('main', () => {
    test('UpdateAndIncrementConversationsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an conversations updated', async () => {
      /* eslint-disable key-spacing */
      expect(
        await commandHandler.execute(
          new WhatsappUpdateAndIncrementConversationsCommand(
            {
              id: whatsappMockConversationData[0].id,
              wabaConversationId:
                whatsappMockConversationData[0].wabaConversationId,
              timelineId: whatsappMockConversationData[0].timelineId,
              wabaContactId: whatsappMockConversationData[0].wabaContactId,
              expiration: whatsappMockConversationData[0].expiration,
              category: whatsappMockConversationData[0].category,
              isBillable: whatsappMockConversationData[0].isBillable,
              pricingModel: whatsappMockConversationData[0].pricingModel,
            },
            {},
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
      /* eslint-enable key-spacing */
    });
  });
});
