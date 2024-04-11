import { MessageCreatedInboxesEvent, MessageCreatedInboxEvent, MessageDeletedInboxesEvent, MessageDeletedInboxEvent, MessageInbox, MessageUpdatedAndIncrementedInboxesEvent, MessageUpdatedAndIncrementedInboxEvent, MessageUpdatedInboxesEvent, MessageUpdatedInboxEvent } from '@app/message/inbox';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageAddInboxesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: MessageInbox[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new MessageCreatedInboxesEvent(
                this.aggregateRoots.map(inbox =>
                    new MessageCreatedInboxEvent(
                        inbox.id.value,
                        inbox.tenantIds?.value,
                        inbox.messageId?.value,
                        inbox.sort.value,
                        inbox.accountId.value,
                        inbox.accountCode?.value,
                        inbox.isImportant.value,
                        inbox.sentAt.value,
                        inbox.subject.value,
                        inbox.body.value,
                        inbox.link?.value,
                        inbox.isInternalLink?.value,
                        inbox.image?.value,
                        inbox.icon?.value,
                        inbox.attachments?.value,
                        inbox.isRead.value,
                        inbox.isReadAtLeastOnce.value,
                        inbox.meta?.value,
                        inbox.createdAt?.value,
                        inbox.updatedAt?.value,
                        inbox.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new MessageUpdatedInboxesEvent(
                this.aggregateRoots.map(inbox =>
                    new MessageUpdatedInboxEvent(
                        inbox.id.value,
                        inbox.tenantIds?.value,
                        inbox.messageId?.value,
                        inbox.sort.value,
                        inbox.accountId.value,
                        inbox.accountCode?.value,
                        inbox.isImportant.value,
                        inbox.sentAt.value,
                        inbox.subject.value,
                        inbox.body.value,
                        inbox.link?.value,
                        inbox.isInternalLink?.value,
                        inbox.image?.value,
                        inbox.icon?.value,
                        inbox.attachments?.value,
                        inbox.isRead.value,
                        inbox.isReadAtLeastOnce.value,
                        inbox.meta?.value,
                        inbox.createdAt?.value,
                        inbox.updatedAt?.value,
                        inbox.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new MessageUpdatedAndIncrementedInboxesEvent(
                this.aggregateRoots.map(inbox =>
                    new MessageUpdatedAndIncrementedInboxEvent(
                        inbox.id.value,
                        inbox.tenantIds?.value,
                        inbox.messageId?.value,
                        inbox.sort.value,
                        inbox.accountId.value,
                        inbox.accountCode?.value,
                        inbox.isImportant.value,
                        inbox.sentAt.value,
                        inbox.subject.value,
                        inbox.body.value,
                        inbox.link?.value,
                        inbox.isInternalLink?.value,
                        inbox.image?.value,
                        inbox.icon?.value,
                        inbox.attachments?.value,
                        inbox.isRead.value,
                        inbox.isReadAtLeastOnce.value,
                        inbox.meta?.value,
                        inbox.createdAt?.value,
                        inbox.updatedAt?.value,
                        inbox.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new MessageDeletedInboxesEvent(
                this.aggregateRoots.map(inbox =>
                    new MessageDeletedInboxEvent(
                        inbox.id.value,
                        inbox.tenantIds?.value,
                        inbox.messageId?.value,
                        inbox.sort.value,
                        inbox.accountId.value,
                        inbox.accountCode?.value,
                        inbox.isImportant.value,
                        inbox.sentAt.value,
                        inbox.subject.value,
                        inbox.body.value,
                        inbox.link?.value,
                        inbox.isInternalLink?.value,
                        inbox.image?.value,
                        inbox.icon?.value,
                        inbox.attachments?.value,
                        inbox.isRead.value,
                        inbox.isReadAtLeastOnce.value,
                        inbox.meta?.value,
                        inbox.createdAt?.value,
                        inbox.updatedAt?.value,
                        inbox.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
