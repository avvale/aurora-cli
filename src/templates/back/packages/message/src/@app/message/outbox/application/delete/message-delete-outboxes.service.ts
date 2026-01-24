import {
  MessageAddOutboxesContextEvent,
  MessageIOutboxRepository,
} from '@app/message/outbox';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class MessageDeleteOutboxesService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: MessageIOutboxRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const outboxes = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (outboxes.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddOutboxesContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const outboxesRegistered = this.publisher.mergeObjectContext(
      new MessageAddOutboxesContextEvent(outboxes, cQMetadata),
    );

    outboxesRegistered.deleted(); // apply event to model events
    outboxesRegistered.commit(); // commit all events of model
  }
}
