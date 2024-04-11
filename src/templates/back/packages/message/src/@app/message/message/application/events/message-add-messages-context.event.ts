import { MessageCreatedMessageEvent, MessageCreatedMessagesEvent, MessageDeletedMessageEvent, MessageDeletedMessagesEvent, MessageMessage, MessageUpdatedAndIncrementedMessageEvent, MessageUpdatedAndIncrementedMessagesEvent, MessageUpdatedMessageEvent, MessageUpdatedMessagesEvent } from '@app/message/message';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageAddMessagesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: MessageMessage[] = [],
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
            new MessageCreatedMessagesEvent(
                this.aggregateRoots.map(message =>
                    new MessageCreatedMessageEvent(
                        message.id.value,
                        message.tenantIds?.value,
                        message.status.value,
                        message.accountRecipientIds?.value,
                        message.tenantRecipientIds?.value,
                        message.scopeRecipients?.value,
                        message.tagRecipients?.value,
                        message.sendAt?.value,
                        message.isImportant.value,
                        message.subject.value,
                        message.body.value,
                        message.link?.value,
                        message.isInternalLink?.value,
                        message.image?.value,
                        message.icon?.value,
                        message.attachments?.value,
                        message.totalRecipients.value,
                        message.reads.value,
                        message.meta?.value,
                        message.createdAt?.value,
                        message.updatedAt?.value,
                        message.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new MessageUpdatedMessagesEvent(
                this.aggregateRoots.map(message =>
                    new MessageUpdatedMessageEvent(
                        message.id.value,
                        message.tenantIds?.value,
                        message.status.value,
                        message.accountRecipientIds?.value,
                        message.tenantRecipientIds?.value,
                        message.scopeRecipients?.value,
                        message.tagRecipients?.value,
                        message.sendAt?.value,
                        message.isImportant.value,
                        message.subject.value,
                        message.body.value,
                        message.link?.value,
                        message.isInternalLink?.value,
                        message.image?.value,
                        message.icon?.value,
                        message.attachments?.value,
                        message.totalRecipients.value,
                        message.reads.value,
                        message.meta?.value,
                        message.createdAt?.value,
                        message.updatedAt?.value,
                        message.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new MessageUpdatedAndIncrementedMessagesEvent(
                this.aggregateRoots.map(message =>
                    new MessageUpdatedAndIncrementedMessageEvent(
                        message.id.value,
                        message.tenantIds?.value,
                        message.status.value,
                        message.accountRecipientIds?.value,
                        message.tenantRecipientIds?.value,
                        message.scopeRecipients?.value,
                        message.tagRecipients?.value,
                        message.sendAt?.value,
                        message.isImportant.value,
                        message.subject.value,
                        message.body.value,
                        message.link?.value,
                        message.isInternalLink?.value,
                        message.image?.value,
                        message.icon?.value,
                        message.attachments?.value,
                        message.totalRecipients.value,
                        message.reads.value,
                        message.meta?.value,
                        message.createdAt?.value,
                        message.updatedAt?.value,
                        message.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new MessageDeletedMessagesEvent(
                this.aggregateRoots.map(message =>
                    new MessageDeletedMessageEvent(
                        message.id.value,
                        message.tenantIds?.value,
                        message.status.value,
                        message.accountRecipientIds?.value,
                        message.tenantRecipientIds?.value,
                        message.scopeRecipients?.value,
                        message.tagRecipients?.value,
                        message.sendAt?.value,
                        message.isImportant.value,
                        message.subject.value,
                        message.body.value,
                        message.link?.value,
                        message.isInternalLink?.value,
                        message.image?.value,
                        message.icon?.value,
                        message.attachments?.value,
                        message.totalRecipients.value,
                        message.reads.value,
                        message.meta?.value,
                        message.createdAt?.value,
                        message.updatedAt?.value,
                        message.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
