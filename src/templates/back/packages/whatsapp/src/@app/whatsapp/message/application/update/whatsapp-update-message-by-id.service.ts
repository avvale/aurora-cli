import { WhatsappIMessageRepository, WhatsappMessage } from '@app/whatsapp/message';
import {
    WhatsappMessageAccountId,
    WhatsappMessageContactName,
    WhatsappMessageConversationId,
    WhatsappMessageCreatedAt,
    WhatsappMessageDeletedAt,
    WhatsappMessageDirection,
    WhatsappMessageId,
    WhatsappMessagePayload,
    WhatsappMessageStatuses,
    WhatsappMessageTimelineId,
    WhatsappMessageType,
    WhatsappMessageUpdatedAt,
    WhatsappMessageWabaContactId,
    WhatsappMessageWabaMessageId,
} from '@app/whatsapp/message/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappUpdateMessageByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: WhatsappIMessageRepository,
    ) {}

    async main(
        payload: {
            id: WhatsappMessageId;
            wabaMessageId?: WhatsappMessageWabaMessageId;
            timelineId?: WhatsappMessageTimelineId;
            conversationId?: WhatsappMessageConversationId;
            statuses?: WhatsappMessageStatuses;
            direction?: WhatsappMessageDirection;
            accountId?: WhatsappMessageAccountId;
            wabaContactId?: WhatsappMessageWabaContactId;
            contactName?: WhatsappMessageContactName;
            type?: WhatsappMessageType;
            payload?: WhatsappMessagePayload;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const message = WhatsappMessage.register(
            payload.id,
            payload.wabaMessageId,
            payload.timelineId,
            payload.conversationId,
            payload.statuses,
            payload.direction,
            payload.accountId,
            payload.wabaContactId,
            payload.contactName,
            payload.type,
            payload.payload,
            null, // createdAt
            new WhatsappMessageUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            message,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const messageRegister = this.publisher.mergeObjectContext(
            message,
        );

        messageRegister.updated(message); // apply event to model events
        messageRegister.commit(); // commit all events of model
    }
}
