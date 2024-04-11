import { messageMockInboxData, MessageUpsertInboxCommand } from '@app/message/inbox';
import { MessageUpsertInboxCommandHandler } from '@app/message/inbox/application/upsert/message-upsert-inbox.command-handler';
import { MessageUpsertInboxService } from '@app/message/inbox/application/upsert/message-upsert-inbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertInboxCommandHandler', () =>
{
    let commandHandler: MessageUpsertInboxCommandHandler;
    let service: MessageUpsertInboxService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageUpsertInboxCommandHandler,
                {
                    provide : MessageUpsertInboxService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageUpsertInboxCommandHandler>(MessageUpsertInboxCommandHandler);
        service = module.get<MessageUpsertInboxService>(MessageUpsertInboxService);
    });

    describe('main', () =>
    {
        test('UpsertInboxCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the MessageUpsertInboxService', async () =>
        {
            expect(await commandHandler.execute(
                new MessageUpsertInboxCommand(
                    {
                        id: messageMockInboxData[0].id,
                        tenantIds: messageMockInboxData[0].tenantIds,
                        messageId: messageMockInboxData[0].messageId,
                        sort: messageMockInboxData[0].sort,
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
            )).toBe(undefined);
        });
    });
});
