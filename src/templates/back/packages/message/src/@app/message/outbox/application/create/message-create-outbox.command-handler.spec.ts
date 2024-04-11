import { MessageCreateOutboxCommandHandler } from './message-create-outbox.command-handler';
import { MessageCreateOutboxService } from './message-create-outbox.service';
import { MessageCreateOutboxCommand, messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateOutboxCommandHandler', () =>
{
    let commandHandler: MessageCreateOutboxCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCreateOutboxCommandHandler,
                {
                    provide : MessageCreateOutboxService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageCreateOutboxCommandHandler>(MessageCreateOutboxCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateOutboxCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the MessageCreateOutboxService', async () =>
        {
            expect(await commandHandler.execute(
                new MessageCreateOutboxCommand(
                    {
                        id: messageMockOutboxData[0].id,
                        messageId: messageMockOutboxData[0].messageId,
                        sort: messageMockOutboxData[0].sort,
                        accountRecipientIds: messageMockOutboxData[0].accountRecipientIds,
                        tenantRecipientIds: messageMockOutboxData[0].tenantRecipientIds,
                        scopeRecipients: messageMockOutboxData[0].scopeRecipients,
                        tagRecipients: messageMockOutboxData[0].tagRecipients,
                        meta: messageMockOutboxData[0].meta,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
