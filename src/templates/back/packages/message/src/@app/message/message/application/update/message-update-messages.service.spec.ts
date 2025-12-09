/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    MessageIMessageRepository,
    messageMockMessageData,
    MessageMockMessageRepository,
} from '@app/message/message';
import { MessageUpdateMessagesService } from '@app/message/message/application/update/message-update-messages.service';
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
    MessageMessageRowId,
    MessageMessageScopeRecipients,
    MessageMessageSendAt,
    MessageMessageStatus,
    MessageMessageSubject,
    MessageMessageTagRecipients,
    MessageMessageTenantIds,
    MessageMessageTenantRecipientIds,
    MessageMessageTotalRecipients,
} from '@app/message/message/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateMessagesService', () => {
    let service: MessageUpdateMessagesService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                MessageUpdateMessagesService,
                MessageMockMessageRepository,
                {
                    provide: MessageIMessageRepository,
                    useValue: {
                        update: () => {
                            /**/
                        },
                        get: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(MessageUpdateMessagesService);
    });

    describe('main', () => {
        test('UpdateMessagesService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should update a messages and emit event', async () => {
            expect(
                await service.main(
                    {
                        id: new MessageMessageId(messageMockMessageData[0].id),
                        rowId: new MessageMessageRowId(
                            messageMockMessageData[0].rowId,
                        ),
                        tenantIds: new MessageMessageTenantIds(
                            messageMockMessageData[0].tenantIds,
                        ),
                        status: new MessageMessageStatus(
                            messageMockMessageData[0].status,
                        ),
                        accountRecipientIds:
                            new MessageMessageAccountRecipientIds(
                                messageMockMessageData[0].accountRecipientIds,
                            ),
                        tenantRecipientIds:
                            new MessageMessageTenantRecipientIds(
                                messageMockMessageData[0].tenantRecipientIds,
                            ),
                        scopeRecipients: new MessageMessageScopeRecipients(
                            messageMockMessageData[0].scopeRecipients,
                        ),
                        tagRecipients: new MessageMessageTagRecipients(
                            messageMockMessageData[0].tagRecipients,
                        ),
                        sendAt: new MessageMessageSendAt(
                            messageMockMessageData[0].sendAt,
                        ),
                        isImportant: new MessageMessageIsImportant(
                            messageMockMessageData[0].isImportant,
                        ),
                        subject: new MessageMessageSubject(
                            messageMockMessageData[0].subject,
                        ),
                        body: new MessageMessageBody(
                            messageMockMessageData[0].body,
                        ),
                        link: new MessageMessageLink(
                            messageMockMessageData[0].link,
                        ),
                        isInternalLink: new MessageMessageIsInternalLink(
                            messageMockMessageData[0].isInternalLink,
                        ),
                        image: new MessageMessageImage(
                            messageMockMessageData[0].image,
                        ),
                        icon: new MessageMessageIcon(
                            messageMockMessageData[0].icon,
                        ),
                        attachments: new MessageMessageAttachments(
                            messageMockMessageData[0].attachments,
                        ),
                        totalRecipients: new MessageMessageTotalRecipients(
                            messageMockMessageData[0].totalRecipients,
                        ),
                        reads: new MessageMessageReads(
                            messageMockMessageData[0].reads,
                        ),
                        meta: new MessageMessageMeta(
                            messageMockMessageData[0].meta,
                        ),
                    },
                    {},
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
