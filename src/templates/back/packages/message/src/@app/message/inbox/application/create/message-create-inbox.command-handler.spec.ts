import {
  MessageCreateInboxCommand,
  messageMockInboxData,
} from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageCreateInboxCommandHandler } from './message-create-inbox.command-handler';
import { MessageCreateInboxService } from './message-create-inbox.service';

describe('MessageCreateInboxCommandHandler', () => {
  let commandHandler: MessageCreateInboxCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageCreateInboxCommandHandler,
        {
          provide: MessageCreateInboxService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<MessageCreateInboxCommandHandler>(
      MessageCreateInboxCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateInboxCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the MessageCreateInboxService', async () => {
      expect(
        await commandHandler.execute(
          new MessageCreateInboxCommand(
            {
              id: messageMockInboxData[0].id,
              rowId: messageMockInboxData[0].rowId,
              tenantIds: messageMockInboxData[0].tenantIds,
              messageId: messageMockInboxData[0].messageId,
              messageRowId: messageMockInboxData[0].messageRowId,
              accountId: messageMockInboxData[0].accountId,
              accountCode: messageMockInboxData[0].accountCode,
              isImportant: messageMockInboxData[0].isImportant,
              sentAt: messageMockInboxData[0].sentAt,
              subject: messageMockInboxData[0].subject,
              body: messageMockInboxData[0].body,
              link: messageMockInboxData[0].link,
              isInternalLink: messageMockInboxData[0].isInternalLink,
              image: messageMockInboxData[0].image,
              icon: messageMockInboxData[0].icon,
              attachments: messageMockInboxData[0].attachments,
              isRead: messageMockInboxData[0].isRead,
              isReadAtLeastOnce: messageMockInboxData[0].isReadAtLeastOnce,
              meta: messageMockInboxData[0].meta,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
