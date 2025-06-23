import { MessageCreatedMessageEvent, MessageCreatedMessagesEvent, MessageDeletedMessageEvent, MessageDeletedMessagesEvent, MessageMessage, MessageUpdatedAndIncrementedMessageEvent, MessageUpdatedAndIncrementedMessagesEvent, MessageUpdatedMessageEvent, MessageUpdatedMessagesEvent } from '@app/message/message';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageAddMessagesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: MessageMessage[] = [],
        public readonly cQMetadata?: CQMetadata,
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
            new MessageCreatedMessagesEvent({
                payload: this.aggregateRoots.map(message =>
                    new MessageCreatedMessageEvent({
                        payload: {
                            id: message.id.value,
                            tenantIds: message.tenantIds?.value,
                            status: message.status.value,
                            accountRecipientIds: message.accountRecipientIds?.value,
                            tenantRecipientIds: message.tenantRecipientIds?.value,
                            scopeRecipients: message.scopeRecipients?.value,
                            tagRecipients: message.tagRecipients?.value,
                            sendAt: message.sendAt?.value,
                            isImportant: message.isImportant.value,
                            subject: message.subject.value,
                            body: message.body.value,
                            link: message.link?.value,
                            isInternalLink: message.isInternalLink?.value,
                            image: message.image?.value,
                            icon: message.icon?.value,
                            attachments: message.attachments?.value,
                            totalRecipients: message.totalRecipients.value,
                            reads: message.reads.value,
                            meta: message.meta?.value,
                            createdAt: message.createdAt?.value,
                            updatedAt: message.updatedAt?.value,
                            deletedAt: message.deletedAt?.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updated(): void
    {
        this.apply(
            new MessageUpdatedMessagesEvent({
                payload: this.aggregateRoots.map(message =>
                    new MessageUpdatedMessageEvent({
                        payload: {
                            id: message.id.value,
                            tenantIds: message.tenantIds?.value,
                            status: message.status.value,
                            accountRecipientIds: message.accountRecipientIds?.value,
                            tenantRecipientIds: message.tenantRecipientIds?.value,
                            scopeRecipients: message.scopeRecipients?.value,
                            tagRecipients: message.tagRecipients?.value,
                            sendAt: message.sendAt?.value,
                            isImportant: message.isImportant.value,
                            subject: message.subject.value,
                            body: message.body.value,
                            link: message.link?.value,
                            isInternalLink: message.isInternalLink?.value,
                            image: message.image?.value,
                            icon: message.icon?.value,
                            attachments: message.attachments?.value,
                            totalRecipients: message.totalRecipients.value,
                            reads: message.reads.value,
                            meta: message.meta?.value,
                            createdAt: message.createdAt?.value,
                            updatedAt: message.updatedAt?.value,
                            deletedAt: message.deletedAt?.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new MessageUpdatedAndIncrementedMessagesEvent({
                payload: this.aggregateRoots.map(message =>
                    new MessageUpdatedAndIncrementedMessageEvent({
                        payload: {
                            id: message.id.value,
                            tenantIds: message.tenantIds?.value,
                            status: message.status.value,
                            accountRecipientIds: message.accountRecipientIds?.value,
                            tenantRecipientIds: message.tenantRecipientIds?.value,
                            scopeRecipients: message.scopeRecipients?.value,
                            tagRecipients: message.tagRecipients?.value,
                            sendAt: message.sendAt?.value,
                            isImportant: message.isImportant.value,
                            subject: message.subject.value,
                            body: message.body.value,
                            link: message.link?.value,
                            isInternalLink: message.isInternalLink?.value,
                            image: message.image?.value,
                            icon: message.icon?.value,
                            attachments: message.attachments?.value,
                            totalRecipients: message.totalRecipients.value,
                            reads: message.reads.value,
                            meta: message.meta?.value,
                            createdAt: message.createdAt?.value,
                            updatedAt: message.updatedAt?.value,
                            deletedAt: message.deletedAt?.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    deleted(): void
    {
        this.apply(
            new MessageDeletedMessagesEvent({
                payload: this.aggregateRoots.map(message =>
                    new MessageDeletedMessageEvent({
                        payload: {
                            id: message.id.value,
                            tenantIds: message.tenantIds?.value,
                            status: message.status.value,
                            accountRecipientIds: message.accountRecipientIds?.value,
                            tenantRecipientIds: message.tenantRecipientIds?.value,
                            scopeRecipients: message.scopeRecipients?.value,
                            tagRecipients: message.tagRecipients?.value,
                            sendAt: message.sendAt?.value,
                            isImportant: message.isImportant.value,
                            subject: message.subject.value,
                            body: message.body.value,
                            link: message.link?.value,
                            isInternalLink: message.isInternalLink?.value,
                            image: message.image?.value,
                            icon: message.icon?.value,
                            attachments: message.attachments?.value,
                            totalRecipients: message.totalRecipients.value,
                            reads: message.reads.value,
                            meta: message.meta?.value,
                            createdAt: message.createdAt?.value,
                            updatedAt: message.updatedAt?.value,
                            deletedAt: message.deletedAt?.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
