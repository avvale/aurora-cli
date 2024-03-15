import { WhatsappAddConversationsContextEvent, WhatsappConversation, WhatsappIConversationRepository } from '@app/whatsapp/conversation';
import {
    WhatsappConversationAccounts,
    WhatsappConversationCreatedAt,
    WhatsappConversationDeletedAt,
    WhatsappConversationId,
    WhatsappConversationUpdatedAt,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappUpdateConversationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: WhatsappIConversationRepository,
    ) {}

    async main(
        payload: {
            id?: WhatsappConversationId;
            accounts?: WhatsappConversationAccounts;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const conversation = WhatsappConversation.register(
            payload.id,
            payload.accounts,
            null, // createdAt
            new WhatsappConversationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(
            conversation,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
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

        conversationsRegister.updated(); // apply event to model events
        conversationsRegister.commit(); // commit all events of model
    }
}
