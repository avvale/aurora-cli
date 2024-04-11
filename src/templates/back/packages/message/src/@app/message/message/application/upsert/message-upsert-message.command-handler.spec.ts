import { messageMockMessageData, MessageUpsertMessageCommand } from '@app/message/message';
import { MessageUpsertMessageCommandHandler } from '@app/message/message/application/upsert/message-upsert-message.command-handler';
import { MessageUpsertMessageService } from '@app/message/message/application/upsert/message-upsert-message.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertMessageCommandHandler', () =>
{
    let commandHandler: MessageUpsertMessageCommandHandler;
    let service: MessageUpsertMessageService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageUpsertMessageCommandHandler,
                {
                    provide : MessageUpsertMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageUpsertMessageCommandHandler>(MessageUpsertMessageCommandHandler);
        service = module.get<MessageUpsertMessageService>(MessageUpsertMessageService);
    });

    describe('main', () =>
    {
        test('UpsertMessageCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the MessageUpsertMessageService', async () =>
        {
            expect(await commandHandler.execute(
                new MessageUpsertMessageCommand(
                    {
                        id: messageMockMessageData[0].id,
                        tenantIds: messageMockMessageData[0].tenantIds,
                        status: messageMockMessageData[0].status,
                        accountRecipientIds: messageMockMessageData[0].accountRecipientIds,
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
