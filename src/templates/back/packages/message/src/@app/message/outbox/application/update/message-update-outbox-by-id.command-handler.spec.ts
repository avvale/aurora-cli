import {
    messageMockOutboxData,
    MessageUpdateOutboxByIdCommand,
} from '@app/message/outbox';
import { MessageUpdateOutboxByIdCommandHandler } from '@app/message/outbox/application/update/message-update-outbox-by-id.command-handler';
import { MessageUpdateOutboxByIdService } from '@app/message/outbox/application/update/message-update-outbox-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateOutboxByIdCommandHandler', () => {
    let commandHandler: MessageUpdateOutboxByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageUpdateOutboxByIdCommandHandler,
                {
                    provide: MessageUpdateOutboxByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<MessageUpdateOutboxByIdCommandHandler>(
            MessageUpdateOutboxByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateOutboxByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an outbox created', async () => {
            expect(
                await commandHandler.execute(
                    new MessageUpdateOutboxByIdCommand(
                        {
                            id: messageMockOutboxData[0].id,
                            rowId: messageMockOutboxData[0].rowId,
                            messageId: messageMockOutboxData[0].messageId,
                            accountRecipientIds:
                                messageMockOutboxData[0].accountRecipientIds,
                            tenantRecipientIds:
                                messageMockOutboxData[0].tenantRecipientIds,
                            scopeRecipients:
                                messageMockOutboxData[0].scopeRecipients,
                            tagRecipients:
                                messageMockOutboxData[0].tagRecipients,
                            meta: messageMockOutboxData[0].meta,
                        },
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
