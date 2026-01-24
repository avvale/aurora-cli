import {
  MessageCreatedOutboxesEvent,
  MessageCreatedOutboxEvent,
  MessageDeletedOutboxesEvent,
  MessageDeletedOutboxEvent,
  MessageOutbox,
  MessageUpdatedOutboxesEvent,
  MessageUpdatedOutboxEvent,
} from '@app/message/outbox';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageAddOutboxesContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: MessageOutbox[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new MessageCreatedOutboxesEvent({
        payload: this.aggregateRoots.map(
          (outbox) =>
            new MessageCreatedOutboxEvent({
              payload: {
                id: outbox.id.value,
                messageId: outbox.messageId.value,
                accountRecipientIds: outbox.accountRecipientIds?.value,
                tenantRecipientIds: outbox.tenantRecipientIds?.value,
                scopeRecipients: outbox.scopeRecipients?.value,
                tagRecipients: outbox.tagRecipients?.value,
                meta: outbox.meta?.value,
                createdAt: outbox.createdAt?.value,
                updatedAt: outbox.updatedAt?.value,
                deletedAt: outbox.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  updated(): void {
    this.apply(
      new MessageUpdatedOutboxesEvent({
        payload: this.aggregateRoots.map(
          (outbox) =>
            new MessageUpdatedOutboxEvent({
              payload: {
                id: outbox.id.value,
                messageId: outbox.messageId.value,
                accountRecipientIds: outbox.accountRecipientIds?.value,
                tenantRecipientIds: outbox.tenantRecipientIds?.value,
                scopeRecipients: outbox.scopeRecipients?.value,
                tagRecipients: outbox.tagRecipients?.value,
                meta: outbox.meta?.value,
                createdAt: outbox.createdAt?.value,
                updatedAt: outbox.updatedAt?.value,
                deletedAt: outbox.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }

  deleted(): void {
    this.apply(
      new MessageDeletedOutboxesEvent({
        payload: this.aggregateRoots.map(
          (outbox) =>
            new MessageDeletedOutboxEvent({
              payload: {
                id: outbox.id.value,
                rowId: outbox.rowId.value,
                messageId: outbox.messageId.value,
                accountRecipientIds: outbox.accountRecipientIds?.value,
                tenantRecipientIds: outbox.tenantRecipientIds?.value,
                scopeRecipients: outbox.scopeRecipients?.value,
                tagRecipients: outbox.tagRecipients?.value,
                meta: outbox.meta?.value,
                createdAt: outbox.createdAt?.value,
                updatedAt: outbox.updatedAt?.value,
                deletedAt: outbox.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
