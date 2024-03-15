import { WhatsappAddMessagesContextEvent, WhatsappIMessageRepository, WhatsappMessage } from '@app/whatsapp/message';
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
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappCreateMessagesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: WhatsappIMessageRepository,
    ) {}

    async main(
        payload: {
            id: WhatsappMessageId;
            whatsappMessageId: WhatsappMessageWhatsappMessageId;
            conversationId: WhatsappMessageConversationId;
            direction: WhatsappMessageDirection;
            accountId: WhatsappMessageAccountId;
            displayPhoneNumber: WhatsappMessageDisplayPhoneNumber;
            phoneNumberId: WhatsappMessagePhoneNumberId;
            type: WhatsappMessageType;
            payload: WhatsappMessagePayload;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateMessages = payload.map(message => WhatsappMessage.register(
            message.id,
            message.whatsappMessageId,
            message.conversationId,
            message.direction,
            message.accountId,
            message.displayPhoneNumber,
            message.phoneNumberId,
            message.type,
            message.payload,
            new WhatsappMessageCreatedAt({ currentTimestamp: true }),
            new WhatsappMessageUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateMessages,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddMessagesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const messagesRegistered = this.publisher.mergeObjectContext(new WhatsappAddMessagesContextEvent(aggregateMessages));

        messagesRegistered.created(); // apply event to model events
        messagesRegistered.commit(); // commit all events of model
    }
}
