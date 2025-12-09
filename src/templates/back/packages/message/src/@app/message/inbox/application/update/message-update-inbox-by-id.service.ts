import { MessageIInboxRepository, MessageInbox } from '@app/message/inbox';
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
    MessageInboxMessageRowId,
    MessageInboxMeta,
    MessageInboxSentAt,
    MessageInboxSubject,
    MessageInboxTenantIds,
    MessageInboxUpdatedAt,
} from '@app/message/inbox/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageUpdateInboxByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIInboxRepository,
    ) {}

    async main(
        payload: {
            id: MessageInboxId;
            tenantIds?: MessageInboxTenantIds;
            messageId?: MessageInboxMessageId;
            messageRowId?: MessageInboxMessageRowId;
            accountId?: MessageInboxAccountId;
            accountCode?: MessageInboxAccountCode;
            isImportant?: MessageInboxIsImportant;
            sentAt?: MessageInboxSentAt;
            subject?: MessageInboxSubject;
            body?: MessageInboxBody;
            link?: MessageInboxLink;
            isInternalLink?: MessageInboxIsInternalLink;
            image?: MessageInboxImage;
            icon?: MessageInboxIcon;
            attachments?: MessageInboxAttachments;
            isRead?: MessageInboxIsRead;
            isReadAtLeastOnce?: MessageInboxIsReadAtLeastOnce;
            meta?: MessageInboxMeta;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const inbox = MessageInbox.register(
            payload.id,
            undefined, // rowId
            payload.tenantIds,
            payload.messageId,
            payload.messageRowId,
            payload.accountId,
            payload.accountCode,
            payload.isImportant,
            payload.sentAt,
            payload.subject,
            payload.body,
            payload.link,
            payload.isInternalLink,
            payload.image,
            payload.icon,
            payload.attachments,
            payload.isRead,
            payload.isReadAtLeastOnce,
            payload.meta,
            null, // createdAt
            new MessageInboxUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(inbox, {
            constraint,
            cQMetadata,
            updateByIdOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const inboxRegister = this.publisher.mergeObjectContext(inbox);

        inboxRegister.updated({
            payload: inbox,
            cQMetadata,
        }); // apply event to model events
        inboxRegister.commit(); // commit all events of model
    }
}
