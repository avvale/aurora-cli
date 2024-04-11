/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIInboxRepository, messageMockInboxData, MessageMockInboxRepository } from '@app/message/inbox';
import { MessageUpsertInboxService } from '@app/message/inbox/application/upsert/message-upsert-inbox.service';
import {
    MessageInboxAccountCode,
    MessageInboxAccountId,
    MessageInboxAttachments,
    MessageInboxBody,
    MessageInboxIcon,
    MessageInboxId,
    MessageInboxImage,
    MessageInboxIsImportant,
    MessageInboxIsInternalLink,
    MessageInboxIsRead,
    MessageInboxIsReadAtLeastOnce,
    MessageInboxLink,
    MessageInboxMessageId,
    MessageInboxMeta,
    MessageInboxSentAt,
    MessageInboxSort,
    MessageInboxSubject,
    MessageInboxTenantIds,
} from '@app/message/inbox/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertInboxService', () =>

{
    let service: MessageUpsertInboxService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageUpsertInboxService,
                MessageMockInboxRepository,
                {
                    provide : MessageIInboxRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageUpsertInboxService);
    });

    describe('main', () =>
    {
        test('MessageUpsertInboxService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a inbox and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new MessageInboxId(messageMockInboxData[0].id),
                        tenantIds: new MessageInboxTenantIds(messageMockInboxData[0].tenantIds),
                        messageId: new MessageInboxMessageId(messageMockInboxData[0].messageId),
                        sort: new MessageInboxSort(messageMockInboxData[0].sort),
                        accountId: new MessageInboxAccountId(messageMockInboxData[0].accountId),
                        accountCode: new MessageInboxAccountCode(messageMockInboxData[0].accountCode),
                        isImportant: new MessageInboxIsImportant(messageMockInboxData[0].isImportant),
                        sentAt: new MessageInboxSentAt(messageMockInboxData[0].sentAt),
                        subject: new MessageInboxSubject(messageMockInboxData[0].subject),
                        body: new MessageInboxBody(messageMockInboxData[0].body),
                        link: new MessageInboxLink(messageMockInboxData[0].link),
                        isInternalLink: new MessageInboxIsInternalLink(messageMockInboxData[0].isInternalLink),
                        image: new MessageInboxImage(messageMockInboxData[0].image),
                        icon: new MessageInboxIcon(messageMockInboxData[0].icon),
                        attachments: new MessageInboxAttachments(messageMockInboxData[0].attachments),
                        isRead: new MessageInboxIsRead(messageMockInboxData[0].isRead),
                        isReadAtLeastOnce: new MessageInboxIsReadAtLeastOnce(messageMockInboxData[0].isReadAtLeastOnce),
                        meta: new MessageInboxMeta(messageMockInboxData[0].meta),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
