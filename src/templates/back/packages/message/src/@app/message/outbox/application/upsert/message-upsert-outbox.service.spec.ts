/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIOutboxRepository, messageMockOutboxData, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageUpsertOutboxService } from '@app/message/outbox/application/upsert/message-upsert-outbox.service';
import {
    MessageOutboxAccountRecipientIds,
    MessageOutboxId,
    MessageOutboxMessageId,
    MessageOutboxMeta,
    MessageOutboxScopeRecipients,
    MessageOutboxSort,
    MessageOutboxTagRecipients,
    MessageOutboxTenantRecipientIds,
} from '@app/message/outbox/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertOutboxService', () =>

{
    let service: MessageUpsertOutboxService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageUpsertOutboxService,
                MessageMockOutboxRepository,
                {
                    provide : MessageIOutboxRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageUpsertOutboxService);
    });

    describe('main', () =>
    {
        test('MessageUpsertOutboxService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a outbox and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new MessageOutboxId(messageMockOutboxData[0].id),
                        messageId: new MessageOutboxMessageId(messageMockOutboxData[0].messageId),
                        sort: new MessageOutboxSort(messageMockOutboxData[0].sort),
                        accountRecipientIds: new MessageOutboxAccountRecipientIds(messageMockOutboxData[0].accountRecipientIds),
                        tenantRecipientIds: new MessageOutboxTenantRecipientIds(messageMockOutboxData[0].tenantRecipientIds),
                        scopeRecipients: new MessageOutboxScopeRecipients(messageMockOutboxData[0].scopeRecipients),
                        tagRecipients: new MessageOutboxTagRecipients(messageMockOutboxData[0].tagRecipients),
                        meta: new MessageOutboxMeta(messageMockOutboxData[0].meta),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
