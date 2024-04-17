import { WhatsappIMessageRepository, WhatsappMessage } from '@app/whatsapp/message';
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
export class WhatsappUpdateMessageByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: WhatsappIMessageRepository,
    ) {}

    async main(
        payload: {
            id: WhatsappMessageId;
            whatsappMessageId?: WhatsappMessageWhatsappMessageId;
            conversationId?: WhatsappMessageConversationId;
            direction?: WhatsappMessageDirection;
            accountId?: WhatsappMessageAccountId;
            displayPhoneNumber?: WhatsappMessageDisplayPhoneNumber;
            phoneNumberId?: WhatsappMessagePhoneNumberId;
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