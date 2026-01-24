import {
  messageMockMessageData,
  MessageUpdateMessagesCommand,
} from '@app/message/message';
import { MessageUpdateMessagesCommandHandler } from '@app/message/message/application/update/message-update-messages.command-handler';
import { MessageUpdateMessagesService } from '@app/message/message/application/update/message-update-messages.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateMessagesCommandHandler', () => {
  let commandHandler: MessageUpdateMessagesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageUpdateMessagesCommandHandler,
        {
          provide: MessageUpdateMessagesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<MessageUpdateMessagesCommandHandler>(
      MessageUpdateMessagesCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateMessagesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an messages updated', async () => {
      expect(
        await commandHandler.execute(
          new MessageUpdateMessagesCommand(
            {
              id: messageMockMessageData[0].id,
              rowId: messageMockMessageData[0].rowId,
              tenantIds: messageMockMessageData[0].tenantIds,
              status: messageMockMessageData[0].status,
              accountRecipientIds:
                messageMockMessageData[0].accountRecipientIds,
              tenantRecipientIds: messageMockMessageData[0].tenantRecipientIds,
              scopeRecipients: messageMockMessageData[0].scopeRecipients,
              tagRecipients: messageMockMessageData[0].tagRecipients,
              sendAt: messageMockMessageData[0].sendAt,
              isImportant: messageMockMessageData[0].isImportant,
              subject: messageMockMessageData[0].subject,
              body: messageMockMessageData[0].body,
              link: messageMockMessageData[0].link,
              isInternalLink: messageMockMessageData[0].isInternalLink,
              image: messageMockMessageData[0].image,
              icon: messageMockMessageData[0].icon,
              attachments: messageMockMessageData[0].attachments,
              totalRecipients: messageMockMessageData[0].totalRecipients,
              reads: messageMockMessageData[0].reads,
              meta: messageMockMessageData[0].meta,
            },
            {},
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
