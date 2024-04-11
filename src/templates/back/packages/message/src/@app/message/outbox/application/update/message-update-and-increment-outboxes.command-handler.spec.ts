import { messageMockOutboxData, MessageUpdateAndIncrementOutboxesCommand } from '@app/message/outbox';
import { MessageUpdateAndIncrementOutboxesCommandHandler } from '@app/message/outbox/application/update/message-update-and-increment-outboxes.command-handler';
import { MessageUpdateAndIncrementOutboxesService } from '@app/message/outbox/application/update/message-update-and-increment-outboxes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateAndIncrementOutboxesCommandHandler', () =>
{
    let commandHandler: MessageUpdateAndIncrementOutboxesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageUpdateAndIncrementOutboxesCommandHandler,
                {
                    provide : MessageUpdateAndIncrementOutboxesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<MessageUpdateAndIncrementOutboxesCommandHandler>(MessageUpdateAndIncrementOutboxesCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementOutboxesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an outboxes updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new MessageUpdateAndIncrementOutboxesCommand(
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
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
