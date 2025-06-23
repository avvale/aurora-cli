import { MessageIMessageRepository, MessageMessage } from '@app/message/message';
import {
    MessageMessageAccountRecipientIds,
    MessageMessageAttachments,
    MessageMessageBody,
    MessageMessageCreatedAt,
    MessageMessageDeletedAt,
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
    MessageMessageUpdatedAt,
} from '@app/message/message/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageUpdateMessageByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIMessageRepository,
    ) {}

    async main(
        payload: {
            id: MessageMessageId;
            tenantIds?: MessageMessageTenantIds;
            status?: MessageMessageStatus;
            accountRecipientIds?: MessageMessageAccountRecipientIds;
            tenantRecipientIds?: MessageMessageTenantRecipientIds;
            scopeRecipients?: MessageMessageScopeRecipients;
            tagRecipients?: MessageMessageTagRecipients;
            sendAt?: MessageMessageSendAt;
            isImportant?: MessageMessageIsImportant;
            subject?: MessageMessageSubject;
            body?: MessageMessageBody;
            link?: MessageMessageLink;
            isInternalLink?: MessageMessageIsInternalLink;
            image?: MessageMessageImage;
            icon?: MessageMessageIcon;
            attachments?: MessageMessageAttachments;
            totalRecipients?: MessageMessageTotalRecipients;
            reads?: MessageMessageReads;
            meta?: MessageMessageMeta;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const message = MessageMessage.register(
            payload.id,
            payload.tenantIds,
            payload.status,
            payload.accountRecipientIds,
            payload.tenantRecipientIds,
            payload.scopeRecipients,
            payload.tagRecipients,
            payload.sendAt,
            payload.isImportant,
            payload.subject,
            payload.body,
            payload.link,
            payload.isInternalLink,
            payload.image,
            payload.icon,
            payload.attachments,
            payload.totalRecipients,
            payload.reads,
            payload.meta,
            null, // createdAt
            new MessageMessageUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            message,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const messageRegister = this.publisher.mergeObjectContext(
            message,
        );

        messageRegister.updated({
            payload: message,
            cQMetadata,
        }); // apply event to model events
        messageRegister.commit(); // commit all events of model
    }
}
