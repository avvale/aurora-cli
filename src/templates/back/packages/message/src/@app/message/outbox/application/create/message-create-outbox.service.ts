import { MessageIOutboxRepository, MessageOutbox } from '@app/message/outbox';
import {
  MessageOutboxAccountRecipientIds,
  MessageOutboxCreatedAt,
  MessageOutboxId,
  MessageOutboxMessageId,
  MessageOutboxMeta,
  MessageOutboxScopeRecipients,
  MessageOutboxTagRecipients,
  MessageOutboxTenantRecipientIds,
  MessageOutboxUpdatedAt,
} from '@app/message/outbox/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageCreateOutboxService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: MessageIOutboxRepository,
  ) {}

  async main(
    payload: {
      id: MessageOutboxId;
      messageId: MessageOutboxMessageId;
      accountRecipientIds: MessageOutboxAccountRecipientIds;
      tenantRecipientIds: MessageOutboxTenantRecipientIds;
      scopeRecipients: MessageOutboxScopeRecipients;
      tagRecipients: MessageOutboxTagRecipients;
      meta: MessageOutboxMeta;
    },
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const outbox = MessageOutbox.register(
      payload.id,
      undefined, // rowId
      payload.messageId,
      payload.accountRecipientIds,
      payload.tenantRecipientIds,
      payload.scopeRecipients,
      payload.tagRecipients,
      payload.meta,
      new MessageOutboxCreatedAt({ currentTimestamp: true }),
      new MessageOutboxUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    await this.repository.create(outbox, {
      createOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const outboxRegister = this.publisher.mergeObjectContext(outbox);

    outboxRegister.created({
      payload: outbox,
      cQMetadata,
    }); // apply event to model events
    outboxRegister.commit(); // commit all events of model
  }
}
