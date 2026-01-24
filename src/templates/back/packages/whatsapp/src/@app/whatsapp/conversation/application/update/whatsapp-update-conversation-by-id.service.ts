import {
  WhatsappConversation,
  WhatsappIConversationRepository,
} from '@app/whatsapp/conversation';
import {
  WhatsappConversationCategory,
  WhatsappConversationExpiration,
  WhatsappConversationId,
  WhatsappConversationIsBillable,
  WhatsappConversationPricingModel,
  WhatsappConversationTimelineId,
  WhatsappConversationUpdatedAt,
  WhatsappConversationWabaContactId,
  WhatsappConversationWabaConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappUpdateConversationByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: WhatsappIConversationRepository,
  ) {}

  async main(
    payload: {
      id: WhatsappConversationId;
      wabaConversationId?: WhatsappConversationWabaConversationId;
      timelineId?: WhatsappConversationTimelineId;
      wabaContactId?: WhatsappConversationWabaContactId;
      expiration?: WhatsappConversationExpiration;
      category?: WhatsappConversationCategory;
      isBillable?: WhatsappConversationIsBillable;
      pricingModel?: WhatsappConversationPricingModel;
    },
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const conversation = WhatsappConversation.register(
      payload.id,
      payload.wabaConversationId,
      payload.timelineId,
      payload.wabaContactId,
      payload.expiration,
      payload.category,
      payload.isBillable,
      payload.pricingModel,
      null, // createdAt
      new WhatsappConversationUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    // update by id
    await this.repository.updateById(conversation, {
      constraint,
      cQMetadata,
      updateByIdOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const conversationRegister =
      this.publisher.mergeObjectContext(conversation);

    conversationRegister.updated(conversation); // apply event to model events
    conversationRegister.commit(); // commit all events of model
  }
}
