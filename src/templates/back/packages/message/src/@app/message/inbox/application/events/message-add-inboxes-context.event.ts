import {
  MessageCreatedInboxesEvent,
  MessageCreatedInboxEvent,
  MessageDeletedInboxesEvent,
  MessageDeletedInboxEvent,
  MessageInbox,
  MessageUpdatedInboxesEvent,
  MessageUpdatedInboxEvent,
} from '@app/message/inbox';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageAddInboxesContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: MessageInbox[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new MessageCreatedInboxesEvent({
        payload: this.aggregateRoots.map(
          (inbox) =>
            new MessageCreatedInboxEvent({
              payload: {
                id: inbox.id.value,
                tenantIds: inbox.tenantIds?.value,
                messageId: inbox.messageId?.value,
                messageRowId: inbox.messageRowId.value,
                accountId: inbox.accountId.value,
                accountCode: inbox.accountCode?.value,
                isImportant: inbox.isImportant.value,
                sentAt: inbox.sentAt.value,
                subject: inbox.subject.value,
                body: inbox.body.value,
                link: inbox.link?.value,
                isInternalLink: inbox.isInternalLink?.value,
                image: inbox.image?.value,
                icon: inbox.icon?.value,
                attachments: inbox.attachments?.value,
                isRead: inbox.isRead.value,
                isReadAtLeastOnce: inbox.isReadAtLeastOnce.value,
                meta: inbox.meta?.value,
                createdAt: inbox.createdAt?.value,
                updatedAt: inbox.updatedAt?.value,
                deletedAt: inbox.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  updated(): void {
    this.apply(
      new MessageUpdatedInboxesEvent({
        payload: this.aggregateRoots.map(
          (inbox) =>
            new MessageUpdatedInboxEvent({
              payload: {
                id: inbox.id.value,
                tenantIds: inbox.tenantIds?.value,
                messageId: inbox.messageId?.value,
                messageRowId: inbox.messageRowId.value,
                accountId: inbox.accountId.value,
                accountCode: inbox.accountCode?.value,
                isImportant: inbox.isImportant.value,
                sentAt: inbox.sentAt.value,
                subject: inbox.subject.value,
                body: inbox.body.value,
                link: inbox.link?.value,
                isInternalLink: inbox.isInternalLink?.value,
                image: inbox.image?.value,
                icon: inbox.icon?.value,
                attachments: inbox.attachments?.value,
                isRead: inbox.isRead.value,
                isReadAtLeastOnce: inbox.isReadAtLeastOnce.value,
                meta: inbox.meta?.value,
                createdAt: inbox.createdAt?.value,
                updatedAt: inbox.updatedAt?.value,
                deletedAt: inbox.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new MessageDeletedInboxesEvent({
        payload: this.aggregateRoots.map(
          (inbox) =>
            new MessageDeletedInboxEvent({
              payload: {
                id: inbox.id.value,
                rowId: inbox.rowId.value,
                tenantIds: inbox.tenantIds?.value,
                messageId: inbox.messageId?.value,
                messageRowId: inbox.messageRowId.value,
                accountId: inbox.accountId.value,
                accountCode: inbox.accountCode?.value,
                isImportant: inbox.isImportant.value,
                sentAt: inbox.sentAt.value,
                subject: inbox.subject.value,
                body: inbox.body.value,
                link: inbox.link?.value,
                isInternalLink: inbox.isInternalLink?.value,
                image: inbox.image?.value,
                icon: inbox.icon?.value,
                attachments: inbox.attachments?.value,
                isRead: inbox.isRead.value,
                isReadAtLeastOnce: inbox.isReadAtLeastOnce.value,
                meta: inbox.meta?.value,
                createdAt: inbox.createdAt?.value,
                updatedAt: inbox.updatedAt?.value,
                deletedAt: inbox.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
