import { WhatsappAddConversationsContextEvent, WhatsappConversation, WhatsappIConversationRepository } from '@app/whatsapp/conversation';
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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappUpdateAndIncrementConversationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: WhatsappIConversationRepository,
    ) {}

    async main(
        payload: {
            id?: WhatsappConversationId;
            wabaConversationId?: WhatsappConversationWabaConversationId;
            timelineId?: WhatsappConversationTimelineId;
            wabaContactId?: WhatsappConversationWabaContactId;
            expiration?: WhatsappConversationExpiration;
            category?: WhatsappConversationCategory;
            isBillable?: WhatsappConversationIsBillable;
            pricingModel?: WhatsappConversationPricingModel;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
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

        // update and increment
        await this.repository.updateAndIncrement(
            conversation,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const conversations = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const conversationsRegister = this.publisher.mergeObjectContext(
            new WhatsappAddConversationsContextEvent(conversations),
        );

        conversationsRegister.updatedAndIncremented(); // apply event to model events
        conversationsRegister.commit(); // commit all events of model
    }
}
