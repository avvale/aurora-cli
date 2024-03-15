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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class WhatsappUpdateAndIncrementMessagesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: WhatsappIMessageRepository,
    ) {}

    async main(
        payload: {
            id?: WhatsappMessageId;
            whatsappMessageId?: WhatsappMessageWhatsappMessageId;
            conversationId?: WhatsappMessageConversationId;
            direction?: WhatsappMessageDirection;
            accountId?: WhatsappMessageAccountId;
            displayPhoneNumber?: WhatsappMessageDisplayPhoneNumber;
            phoneNumberId?: WhatsappMessagePhoneNumberId;
            type?: WhatsappMessageType;
            payload?: WhatsappMessagePayload;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const message = WhatsappMessage.register(
            payload.id,
            payload.whatsappMessageId,
            payload.conversationId,
            payload.direction,
            payload.accountId,
            payload.displayPhoneNumber,
            payload.phoneNumberId,
            payload.type,
            payload.payload,
            null, // createdAt
            new WhatsappMessageUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update and increment
        await this.repository.updateAndIncrement(
            message,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const messages = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const messagesRegister = this.publisher.mergeObjectContext(
            new WhatsappAddMessagesContextEvent(messages),
        );

        messagesRegister.updatedAndIncremented(); // apply event to model events
        messagesRegister.commit(); // commit all events of model
    }
}
