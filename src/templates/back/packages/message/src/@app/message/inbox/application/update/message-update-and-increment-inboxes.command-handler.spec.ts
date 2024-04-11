import { messageMockInboxData, MessageUpdateAndIncrementInboxesCommand } from '@app/message/inbox';
import { MessageUpdateAndIncrementInboxesCommandHandler } from '@app/message/inbox/application/update/message-update-and-increment-inboxes.command-handler';
import { MessageUpdateAndIncrementInboxesService } from '@app/message/inbox/application/update/message-update-and-increment-inboxes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateAndIncrementInboxesCommandHandler', () =>
{
    let commandHandler: MessageUpdateAndIncrementInboxesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageUpdateAndIncrementInboxesCommandHandler,
                {
                    provide : MessageUpdateAndIncrementInboxesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageUpdateAndIncrementInboxesCommandHandler>(MessageUpdateAndIncrementInboxesCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementInboxesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an inboxes updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new MessageUpdateAndIncrementInboxesCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
