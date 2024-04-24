import { WhatsappConversation, WhatsappIConversationRepository } from '@app/whatsapp/conversation';
import {
    WhatsappConversationCategory,
    WhatsappConversationCreatedAt,
    WhatsappConversationDeletedAt,
    WhatsappConversationExpiration,
    WhatsappConversationId,
    WhatsappConversationIsBillable,
    WhatsappConversationPricingModel,
    WhatsappConversationTimelineId,
    WhatsappConversationUpdatedAt,
    WhatsappConversationWabaContactId,
    WhatsappConversationWabaConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappUpsertConversationService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: WhatsappIConversationRepository,
    ) {}

    async main(
        payload: {
            id: WhatsappConversationId;
            wabaConversationId: WhatsappConversationWabaConversationId;
            timelineId: WhatsappConversationTimelineId;
            wabaContactId: WhatsappConversationWabaContactId;
            expiration: WhatsappConversationExpiration;
            category: WhatsappConversationCategory;
            isBillable: WhatsappConversationIsBillable;
            pricingModel: WhatsappConversationPricingModel;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const conversation = WhatsappConversation.register(
            payload.id,
            payload.wabaConversationId,
            payload.timelineId,
            payload.wabaContactId,
            payload.expiration,
            payload.category,
            payload.isBillable,
            payload.pricingModel,
            new WhatsappConversationCreatedAt({ currentTimestamp: true }),
            new WhatsappConversationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(
                conversation,
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const conversationRegister = this.publisher.mergeObjectContext(
            conversation,
        );

        conversationRegister.created(conversation); // apply event to model events
        conversationRegister.commit(); // commit all events of model
    }
}
