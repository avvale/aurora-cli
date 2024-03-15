import { WhatsappConversation, WhatsappIConversationRepository } from '@app/whatsapp/conversation';
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
export class WhatsappCreateConversationService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: WhatsappIConversationRepository,
    ) {}

    async main(
        payload: {
            id: WhatsappConversationId;
            accounts: WhatsappConversationAccounts;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const conversation = WhatsappConversation.register(
            payload.id,
            payload.accounts,
            new WhatsappConversationCreatedAt({ currentTimestamp: true }),
            new WhatsappConversationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            conversation,
            {
                createOptions: cQMetadata?.repositoryOptions,
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
