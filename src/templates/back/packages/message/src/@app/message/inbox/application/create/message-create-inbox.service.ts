import { MessageIInboxRepository, MessageInbox } from '@app/message/inbox';
import {
    MessageInboxAccountCode,
    MessageInboxAccountId,
    MessageInboxAttachments,
    MessageInboxBody,
    MessageInboxCreatedAt,
    MessageInboxDeletedAt,
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
    MessageInboxUpdatedAt,
} from '@app/message/inbox/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageCreateInboxService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIInboxRepository,
    ) {}

    async main(
        payload: {
            id: MessageInboxId;
            tenantIds: MessageInboxTenantIds;
            messageId: MessageInboxMessageId;
            sort: MessageInboxSort;
            accountId: MessageInboxAccountId;
            accountCode: MessageInboxAccountCode;
            isImportant: MessageInboxIsImportant;
            sentAt: MessageInboxSentAt;
            subject: MessageInboxSubject;
            body: MessageInboxBody;
            link: MessageInboxLink;
            isInternalLink: MessageInboxIsInternalLink;
            image: MessageInboxImage;
            icon: MessageInboxIcon;
            attachments: MessageInboxAttachments;
            isRead: MessageInboxIsRead;
            isReadAtLeastOnce: MessageInboxIsReadAtLeastOnce;
            meta: MessageInboxMeta;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const inbox = MessageInbox.register(
            payload.id,
            payload.tenantIds,
            payload.messageId,
            payload.sort,
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
            new MessageInboxCreatedAt({ currentTimestamp: true }),
            new MessageInboxUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            inbox,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const inboxRegister = this.publisher.mergeObjectContext(
            inbox,
        );

        inboxRegister.created(inbox); // apply event to model events
        inboxRegister.commit(); // commit all events of model
    }
}
