import { MessageCreatedOutboxesEvent, MessageCreatedOutboxEvent, MessageDeletedOutboxesEvent, MessageDeletedOutboxEvent, MessageOutbox, MessageUpdatedAndIncrementedOutboxesEvent, MessageUpdatedAndIncrementedOutboxEvent, MessageUpdatedOutboxesEvent, MessageUpdatedOutboxEvent } from '@app/message/outbox';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageAddOutboxesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: MessageOutbox[] = [],
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
            new MessageCreatedOutboxesEvent(
                this.aggregateRoots.map(outbox =>
                    new MessageCreatedOutboxEvent(
                        outbox.id.value,
                        outbox.messageId.value,
                        outbox.sort.value,
                        outbox.accountRecipientIds?.value,
                        outbox.tenantRecipientIds?.value,
                        outbox.scopeRecipients?.value,
                        outbox.tagRecipients?.value,
                        outbox.meta?.value,
                        outbox.createdAt?.value,
                        outbox.updatedAt?.value,
                        outbox.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new MessageUpdatedOutboxesEvent(
                this.aggregateRoots.map(outbox =>
                    new MessageUpdatedOutboxEvent(
                        outbox.id.value,
                        outbox.messageId.value,
                        outbox.sort.value,
                        outbox.accountRecipientIds?.value,
                        outbox.tenantRecipientIds?.value,
                        outbox.scopeRecipients?.value,
                        outbox.tagRecipients?.value,
                        outbox.meta?.value,
                        outbox.createdAt?.value,
                        outbox.updatedAt?.value,
                        outbox.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new MessageUpdatedAndIncrementedOutboxesEvent(
                this.aggregateRoots.map(outbox =>
                    new MessageUpdatedAndIncrementedOutboxEvent(
                        outbox.id.value,
                        outbox.messageId.value,
                        outbox.sort.value,
                        outbox.accountRecipientIds?.value,
                        outbox.tenantRecipientIds?.value,
                        outbox.scopeRecipients?.value,
                        outbox.tagRecipients?.value,
                        outbox.meta?.value,
                        outbox.createdAt?.value,
                        outbox.updatedAt?.value,
                        outbox.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new MessageDeletedOutboxesEvent(
                this.aggregateRoots.map(outbox =>
                    new MessageDeletedOutboxEvent(
                        outbox.id.value,
                        outbox.messageId.value,
                        outbox.sort.value,
                        outbox.accountRecipientIds?.value,
                        outbox.tenantRecipientIds?.value,
                        outbox.scopeRecipients?.value,
                        outbox.tagRecipients?.value,
                        outbox.meta?.value,
                        outbox.createdAt?.value,
                        outbox.updatedAt?.value,
                        outbox.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
