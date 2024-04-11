/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageIMessageRepository, messageMockMessageData, MessageMockMessageRepository } from '@app/message/message';
import { MessageUpsertMessageService } from '@app/message/message/application/upsert/message-upsert-message.service';
import {
    MessageMessageAccountRecipientIds,
    MessageMessageAttachments,
    MessageMessageBody,
    MessageMessageIcon,
    MessageMessageId,
    MessageMessageImage,
    MessageMessageIsImportant,
    MessageMessageIsInternalLink,
    MessageMessageLink,
    MessageMessageMeta,
    MessageMessageReads,
    MessageMessageScopeRecipients,
    MessageMessageSendAt,
    MessageMessageStatus,
    MessageMessageSubject,
    MessageMessageTagRecipients,
    MessageMessageTenantIds,
    MessageMessageTenantRecipientIds,
    MessageMessageTotalRecipients,
} from '@app/message/message/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertMessageService', () =>

{
    let service: MessageUpsertMessageService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageUpsertMessageService,
                MessageMockMessageRepository,
                {
                    provide : MessageIMessageRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(MessageUpsertMessageService);
    });

    describe('main', () =>
    {
        test('MessageUpsertMessageService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a message and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new MessageMessageId(messageMockMessageData[0].id),
                        tenantIds: new MessageMessageTenantIds(messageMockMessageData[0].tenantIds),
                        status: new MessageMessageStatus(messageMockMessageData[0].status),
                        accountRecipientIds: new MessageMessageAccountRecipientIds(messageMockMessageData[0].accountRecipientIds),
                        tenantRecipientIds: new MessageMessageTenantRecipientIds(messageMockMessageData[0].tenantRecipientIds),
                        scopeRecipients: new MessageMessageScopeRecipients(messageMockMessageData[0].scopeRecipients),
                        tagRecipients: new MessageMessageTagRecipients(messageMockMessageData[0].tagRecipients),
                        sendAt: new MessageMessageSendAt(messageMockMessageData[0].sendAt),
                        isImportant: new MessageMessageIsImportant(messageMockMessageData[0].isImportant),
                        subject: new MessageMessageSubject(messageMockMessageData[0].subject),
                        body: new MessageMessageBody(messageMockMessageData[0].body),
                        link: new MessageMessageLink(messageMockMessageData[0].link),
                        isInternalLink: new MessageMessageIsInternalLink(messageMockMessageData[0].isInternalLink),
                        image: new MessageMessageImage(messageMockMessageData[0].image),
                        icon: new MessageMessageIcon(messageMockMessageData[0].icon),
                        attachments: new MessageMessageAttachments(messageMockMessageData[0].attachments),
                        totalRecipients: new MessageMessageTotalRecipients(messageMockMessageData[0].totalRecipients),
                        reads: new MessageMessageReads(messageMockMessageData[0].reads),
                        meta: new MessageMessageMeta(messageMockMessageData[0].meta),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
