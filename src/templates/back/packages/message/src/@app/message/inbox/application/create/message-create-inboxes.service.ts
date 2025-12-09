import {
    MessageAddInboxesContextEvent,
    MessageIInboxRepository,
    MessageInbox,
} from '@app/message/inbox';
import {
    MessageInboxAccountCode,
    MessageInboxAccountId,
    MessageInboxAttachments,
    MessageInboxBody,
    MessageInboxCreatedAt,
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
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageCreateInboxesService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: MessageIInboxRepository,
    ) {}

    async main(
        payload: {
            id: MessageInboxId;
            tenantIds: MessageInboxTenantIds;
            messageId: MessageInboxMessageId;
            messageRowId: MessageInboxMessageRowId;
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
        }[],
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const inboxes = payload.map((inbox) =>
            MessageInbox.register(
                inbox.id,
                undefined, // rowId
                inbox.tenantIds,
                inbox.messageId,
                inbox.messageRowId,
                inbox.accountId,
                inbox.accountCode,
                inbox.isImportant,
                inbox.sentAt,
                inbox.subject,
                inbox.body,
                inbox.link,
                inbox.isInternalLink,
                inbox.image,
                inbox.icon,
                inbox.attachments,
                inbox.isRead,
                inbox.isReadAtLeastOnce,
                inbox.meta,
                new MessageInboxCreatedAt({ currentTimestamp: true }),
                new MessageInboxUpdatedAt({ currentTimestamp: true }),
                null, // deleteAt
            ),
        );

        // insert
        await this.repository.insert(inboxes, {
            insertOptions: cQMetadata?.repositoryOptions,
        });

        // create AddInboxesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const inboxesRegistered = this.publisher.mergeObjectContext(
            new MessageAddInboxesContextEvent(inboxes, cQMetadata),
        );

        inboxesRegistered.created(); // apply event to model events
        inboxesRegistered.commit(); // commit all events of model
    }
}
