import { MessageAddInboxesContextEvent, MessageIInboxRepository, MessageInbox } from '@app/message/inbox';
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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageUpdateInboxesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIInboxRepository,
    ) {}

    async main(
        payload: {
            id?: MessageInboxId;
            tenantIds?: MessageInboxTenantIds;
            messageId?: MessageInboxMessageId;
            sort?: MessageInboxSort;
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
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
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
            null, // createdAt
            new MessageInboxUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(
            inbox,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const inboxes = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const inboxesRegister = this.publisher.mergeObjectContext(
            new MessageAddInboxesContextEvent(inboxes),
        );

        inboxesRegister.updated(); // apply event to model events
        inboxesRegister.commit(); // commit all events of model
    }
}
