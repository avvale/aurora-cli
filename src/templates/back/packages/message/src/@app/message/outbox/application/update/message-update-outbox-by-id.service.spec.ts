/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageIOutboxRepository,
    messageMockOutboxData,
    MessageMockOutboxRepository,
} from '@app/message/outbox';
import { MessageUpdateOutboxByIdService } from '@app/message/outbox/application/update/message-update-outbox-by-id.service';
import {
    MessageOutboxAccountRecipientIds,
    MessageOutboxId,
    MessageOutboxMessageId,
    MessageOutboxMeta,
    MessageOutboxRowId,
    MessageOutboxScopeRecipients,
    MessageOutboxTagRecipients,
    MessageOutboxTenantRecipientIds,
} from '@app/message/outbox/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateOutboxByIdService', () => {
    let service: MessageUpdateOutboxByIdService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageUpdateOutboxByIdService,
                MessageMockOutboxRepository,
                {
                    provide: MessageIOutboxRepository,
                    useValue: {
                        updateById: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(MessageUpdateOutboxByIdService);
    });

    describe('main', () => {
        test('MessageUpdateOutboxByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should update a outbox and emit event', async () => {
            expect(
                await service.main(
                    {
                        id: new MessageOutboxId(messageMockOutboxData[0].id),
                        rowId: new MessageOutboxRowId(
                            messageMockOutboxData[0].rowId,
                        ),
                        messageId: new MessageOutboxMessageId(
                            messageMockOutboxData[0].messageId,
                        ),
                        accountRecipientIds:
                            new MessageOutboxAccountRecipientIds(
                                messageMockOutboxData[0].accountRecipientIds,
                            ),
                        tenantRecipientIds: new MessageOutboxTenantRecipientIds(
                            messageMockOutboxData[0].tenantRecipientIds,
                        ),
                        scopeRecipients: new MessageOutboxScopeRecipients(
                            messageMockOutboxData[0].scopeRecipients,
                        ),
                        tagRecipients: new MessageOutboxTagRecipients(
                            messageMockOutboxData[0].tagRecipients,
                        ),
                        meta: new MessageOutboxMeta(
                            messageMockOutboxData[0].meta,
                        ),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
