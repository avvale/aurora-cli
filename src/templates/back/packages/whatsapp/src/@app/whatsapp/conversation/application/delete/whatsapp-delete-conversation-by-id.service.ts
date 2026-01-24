import { WhatsappIConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappConversationId } from '@app/whatsapp/conversation/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappDeleteConversationByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: WhatsappIConversationRepository,
  ) {}

  async main(
    id: WhatsappConversationId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const conversation = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(conversation.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const conversationRegister =
      this.publisher.mergeObjectContext(conversation);

    conversationRegister.deleted(conversation); // apply event to model events
    conversationRegister.commit(); // commit all events of model
  }
}
