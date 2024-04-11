import { messageMockOutboxData, MessageUpsertOutboxCommand } from '@app/message/outbox';
import { MessageUpsertOutboxCommandHandler } from '@app/message/outbox/application/upsert/message-upsert-outbox.command-handler';
import { MessageUpsertOutboxService } from '@app/message/outbox/application/upsert/message-upsert-outbox.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertOutboxCommandHandler', () =>
{
    let commandHandler: MessageUpsertOutboxCommandHandler;
    let service: MessageUpsertOutboxService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageUpsertOutboxCommandHandler,
                {
                    provide : MessageUpsertOutboxService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageUpsertOutboxCommandHandler>(MessageUpsertOutboxCommandHandler);
        service = module.get<MessageUpsertOutboxService>(MessageUpsertOutboxService);
    });

    describe('main', () =>
    {
        test('UpsertOutboxCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the MessageUpsertOutboxService', async () =>
        {
            expect(await commandHandler.execute(
                new MessageUpsertOutboxCommand(
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
