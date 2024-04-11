import { MessageCreateMessageCommandHandler } from './message-create-message.command-handler';
import { MessageCreateMessageService } from './message-create-message.service';
import { MessageCreateMessageCommand, messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateMessageCommandHandler', () =>
{
    let commandHandler: MessageCreateMessageCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateMessageCommandHandler,
                {
                    provide : MessageCreateMessageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageCreateMessageCommandHandler>(MessageCreateMessageCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateMessageCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the MessageCreateMessageService', async () =>
        {
            expect(await commandHandler.execute(
                new MessageCreateMessageCommand(
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
