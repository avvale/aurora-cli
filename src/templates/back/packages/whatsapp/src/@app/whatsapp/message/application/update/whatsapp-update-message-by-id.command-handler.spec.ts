import {
  whatsappMockMessageData,
  WhatsappUpdateMessageByIdCommand,
} from '@app/whatsapp/message';
import { WhatsappUpdateMessageByIdCommandHandler } from '@app/whatsapp/message/application/update/whatsapp-update-message-by-id.command-handler';
import { WhatsappUpdateMessageByIdService } from '@app/whatsapp/message/application/update/whatsapp-update-message-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateMessageByIdCommandHandler', () => {
  let commandHandler: WhatsappUpdateMessageByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappUpdateMessageByIdCommandHandler,
        {
          provide: WhatsappUpdateMessageByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<WhatsappUpdateMessageByIdCommandHandler>(
      WhatsappUpdateMessageByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateMessageByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an message created', async () => {
      expect(
        await commandHandler.execute(
          new WhatsappUpdateMessageByIdCommand(
            {
              id: whatsappMockMessageData[0].id,
              wabaMessageId: whatsappMockMessageData[0].wabaMessageId,
              timelineId: whatsappMockMessageData[0].timelineId,
              conversationId: whatsappMockMessageData[0].conversationId,
              statuses: whatsappMockMessageData[0].statuses,
              direction: whatsappMockMessageData[0].direction,
              accountId: whatsappMockMessageData[0].accountId,
              wabaContactId: whatsappMockMessageData[0].wabaContactId,
              contactName: whatsappMockMessageData[0].contactName,
              type: whatsappMockMessageData[0].type,
              payload: whatsappMockMessageData[0].payload,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
