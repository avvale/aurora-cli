import {
  WhatsappAddConversationsContextEvent,
  WhatsappIConversationRepository,
} from '@app/whatsapp/conversation';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappDeleteConversationsService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: WhatsappIConversationRepository,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get objects to delete
    const conversations = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    if (conversations.length === 0) return;

    await this.repository.delete({
      queryStatement,
      constraint,
      cQMetadata,
      deleteOptions: cQMetadata?.repositoryOptions,
    });

    // create AddConversationsContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const conversationsRegistered = this.publisher.mergeObjectContext(
      new WhatsappAddConversationsContextEvent(conversations),
    );

    conversationsRegistered.deleted(); // apply event to model events
    conversationsRegistered.commit(); // commit all events of model
  }
}
