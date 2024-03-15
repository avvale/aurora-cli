import { WhatsappConversation, WhatsappConversationResponse } from '@app/whatsapp/conversation';
import {
    WhatsappConversationAccounts,
    WhatsappConversationCreatedAt,
    WhatsappConversationDeletedAt,
    WhatsappConversationId,
    WhatsappConversationUpdatedAt,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class WhatsappConversationMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param conversation
     */
    mapModelToAggregate(conversation: LiteralObject, cQMetadata?: CQMetadata): WhatsappConversation
    {
        if (!conversation) return;

        return this.makeAggregate(conversation, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param conversations
     */
    mapModelsToAggregates(conversations: LiteralObject[], cQMetadata?: CQMetadata): WhatsappConversation[]
    {
        if (!Array.isArray(conversations)) return;

        return conversations.map(conversation => this.makeAggregate(conversation, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param conversation
     */
    mapAggregateToResponse(conversation: WhatsappConversation): WhatsappConversationResponse
    {
        return this.makeResponse(conversation);
    }

    /**
     * Map array of aggregates to array responses
     * @param conversations
     */
    mapAggregatesToResponses(conversations: WhatsappConversation[]): WhatsappConversationResponse[]
    {
        if (!Array.isArray(conversations)) return;

        return conversations.map(conversation => this.makeResponse(conversation));
    }

    private makeAggregate(conversation: LiteralObject, cQMetadata?: CQMetadata): WhatsappConversation
    {
        return WhatsappConversation.register(
            new WhatsappConversationId(conversation.id, { undefinable: true }),
            new WhatsappConversationAccounts(conversation.accounts, { undefinable: true }),
            new WhatsappConversationCreatedAt(conversation.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new WhatsappConversationUpdatedAt(conversation.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new WhatsappConversationDeletedAt(conversation.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(conversation: WhatsappConversation): WhatsappConversationResponse
    {
        if (!conversation) return;

        return new WhatsappConversationResponse(
            conversation.id.value,
            conversation.accounts.value,
            conversation.createdAt.value,
            conversation.updatedAt.value,
            conversation.deletedAt.value,
        );
    }
}
