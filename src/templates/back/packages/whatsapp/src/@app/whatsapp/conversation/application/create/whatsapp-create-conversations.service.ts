import { WhatsappAddConversationsContextEvent, WhatsappConversation, WhatsappIConversationRepository } from '@app/whatsapp/conversation';
import {
    WhatsappConversationAccounts,
    WhatsappConversationCreatedAt,
    WhatsappConversationDeletedAt,
    WhatsappConversationId,
    WhatsappConversationUpdatedAt,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappCreateConversationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: WhatsappIConversationRepository,
    ) {}

    async main(
        payload: {
            id: WhatsappConversationId;
            accounts: WhatsappConversationAccounts;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateConversations = payload.map(conversation => WhatsappConversation.register(
            conversation.id,
            conversation.accounts,
            new WhatsappConversationCreatedAt({ currentTimestamp: true }),
            new WhatsappConversationUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateConversations,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddConversationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const conversationsRegistered = this.publisher.mergeObjectContext(new WhatsappAddConversationsContextEvent(aggregateConversations));

        conversationsRegistered.created(); // apply event to model events
        conversationsRegistered.commit(); // commit all events of model
    }
}
