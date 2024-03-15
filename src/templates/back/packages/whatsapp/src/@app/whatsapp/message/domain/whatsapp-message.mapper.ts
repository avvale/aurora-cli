import { IamAccountMapper } from '@app/iam/account';
import { WhatsappConversationMapper } from '@app/whatsapp/conversation';
import { WhatsappMessage, WhatsappMessageResponse } from '@app/whatsapp/message';
import {
    WhatsappMessageAccountId,
    WhatsappMessageConversationId,
    WhatsappMessageCreatedAt,
    WhatsappMessageDeletedAt,
    WhatsappMessageDirection,
    WhatsappMessageDisplayPhoneNumber,
    WhatsappMessageId,
    WhatsappMessagePayload,
    WhatsappMessagePhoneNumberId,
    WhatsappMessageType,
    WhatsappMessageUpdatedAt,
    WhatsappMessageWhatsappMessageId,
} from '@app/whatsapp/message/domain/value-objects';
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class WhatsappMessageMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param message
     */
    mapModelToAggregate(message: LiteralObject, cQMetadata?: CQMetadata): WhatsappMessage
    {
        if (!message) return;

        return this.makeAggregate(message, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param messages
     */
    mapModelsToAggregates(messages: LiteralObject[], cQMetadata?: CQMetadata): WhatsappMessage[]
    {
        if (!Array.isArray(messages)) return;

        return messages.map(message => this.makeAggregate(message, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param message
     */
    mapAggregateToResponse(message: WhatsappMessage): WhatsappMessageResponse
    {
        return this.makeResponse(message);
    }

    /**
     * Map array of aggregates to array responses
     * @param messages
     */
    mapAggregatesToResponses(messages: WhatsappMessage[]): WhatsappMessageResponse[]
    {
        if (!Array.isArray(messages)) return;

        return messages.map(message => this.makeResponse(message));
    }

    private makeAggregate(message: LiteralObject, cQMetadata?: CQMetadata): WhatsappMessage
    {
        return WhatsappMessage.register(
            new WhatsappMessageId(message.id, { undefinable: true }),
            new WhatsappMessageWhatsappMessageId(message.whatsappMessageId, { undefinable: true }),
            new WhatsappMessageConversationId(message.conversationId, { undefinable: true }),
            new WhatsappMessageDirection(message.direction, { undefinable: true }),
            new WhatsappMessageAccountId(message.accountId, { undefinable: true }),
            new WhatsappMessageDisplayPhoneNumber(message.displayPhoneNumber, { undefinable: true }),
            new WhatsappMessagePhoneNumberId(message.phoneNumberId, { undefinable: true }),
            new WhatsappMessageType(message.type, { undefinable: true }),
            new WhatsappMessagePayload(message.payload, { undefinable: true }),
            new WhatsappMessageCreatedAt(message.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new WhatsappMessageUpdatedAt(message.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new WhatsappMessageDeletedAt(message.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new IamAccountMapper({ eagerLoading: true }).mapModelToAggregate(message.account, cQMetadata) : undefined,
            this.options.eagerLoading ? new WhatsappConversationMapper({ eagerLoading: true }).mapModelToAggregate(message.conversation, cQMetadata) : undefined,
        );
    }

    private makeResponse(message: WhatsappMessage): WhatsappMessageResponse
    {
        if (!message) return;

        return new WhatsappMessageResponse(
            message.id.value,
            message.whatsappMessageId.value,
            message.conversationId.value,
            message.direction.value,
            message.accountId.value,
            message.displayPhoneNumber.value,
            message.phoneNumberId.value,
            message.type.value,
            message.payload.value,
            message.createdAt.value,
            message.updatedAt.value,
            message.deletedAt.value,
            this.options.eagerLoading ? new IamAccountMapper({ eagerLoading: true }).mapAggregateToResponse(message.account) : undefined,
            this.options.eagerLoading ? new WhatsappConversationMapper({ eagerLoading: true }).mapAggregateToResponse(message.conversation) : undefined,
        );
    }
}
