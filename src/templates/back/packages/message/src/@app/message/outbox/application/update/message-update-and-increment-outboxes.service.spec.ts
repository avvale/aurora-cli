/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIOutboxRepository, messageMockOutboxData, MessageMockOutboxRepository } from '@app/message/outbox';
import { MessageUpdateAndIncrementOutboxesService } from '@app/message/outbox/application/update/message-update-and-increment-outboxes.service';
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

describe('MessageUpdateAndIncrementOutboxesService', () =>
{
    let service: MessageUpdateAndIncrementOutboxesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageUpdateAndIncrementOutboxesService,
                MessageMockOutboxRepository,
                {
                    provide : MessageIOutboxRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageUpdateAndIncrementOutboxesService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementOutboxesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a outboxes and emit event', async () =>
        {
            /* eslint-disable key-spacing */
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
                    {},
                    {},
                ),
            )
                .toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
