import { messageMockInboxData, MessageUpdateInboxByIdCommand } from '@app/message/inbox';
import { MessageUpdateInboxByIdCommandHandler } from '@app/message/inbox/application/update/message-update-inbox-by-id.command-handler';
import { MessageUpdateInboxByIdService } from '@app/message/inbox/application/update/message-update-inbox-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxByIdCommandHandler', () =>
{
    let commandHandler: MessageUpdateInboxByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageUpdateInboxByIdCommandHandler,
                {
                    provide : MessageUpdateInboxByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageUpdateInboxByIdCommandHandler>(MessageUpdateInboxByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateInboxByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an inbox created', async () =>
        {
            expect(await commandHandler.execute(
                new MessageUpdateInboxByIdCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
