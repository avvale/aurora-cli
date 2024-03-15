import { WhatsappCreatedMessageEvent, WhatsappCreatedMessagesEvent, WhatsappDeletedMessageEvent, WhatsappDeletedMessagesEvent, WhatsappMessage, WhatsappUpdatedAndIncrementedMessageEvent, WhatsappUpdatedAndIncrementedMessagesEvent, WhatsappUpdatedMessageEvent, WhatsappUpdatedMessagesEvent } from '@app/whatsapp/message';
import { AggregateRoot } from '@nestjs/cqrs';

export class WhatsappAddMessagesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: WhatsappMessage[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new WhatsappCreatedMessagesEvent(
                this.aggregateRoots.map(message =>
                    new WhatsappCreatedMessageEvent(
                        message.id.value,
                        message.whatsappMessageId.value,
                        message.conversationId.value,
                        message.direction.value,
                        message.accountId?.value,
                        message.displayPhoneNumber.value,
                        message.phoneNumberId.value,
                        message.type.value,
                        message.payload.value,
                        message.createdAt?.value,
                        message.updatedAt?.value,
                        message.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new WhatsappUpdatedMessagesEvent(
                this.aggregateRoots.map(message =>
                    new WhatsappUpdatedMessageEvent(
                        message.id.value,
                        message.whatsappMessageId.value,
                        message.conversationId.value,
                        message.direction.value,
                        message.accountId?.value,
                        message.displayPhoneNumber.value,
                        message.phoneNumberId.value,
                        message.type.value,
                        message.payload.value,
                        message.createdAt?.value,
                        message.updatedAt?.value,
                        message.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new WhatsappUpdatedAndIncrementedMessagesEvent(
                this.aggregateRoots.map(message =>
                    new WhatsappUpdatedAndIncrementedMessageEvent(
                        message.id.value,
                        message.whatsappMessageId.value,
                        message.conversationId.value,
                        message.direction.value,
                        message.accountId?.value,
                        message.displayPhoneNumber.value,
                        message.phoneNumberId.value,
                        message.type.value,
                        message.payload.value,
                        message.createdAt?.value,
                        message.updatedAt?.value,
                        message.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new WhatsappDeletedMessagesEvent(
                this.aggregateRoots.map(message =>
                    new WhatsappDeletedMessageEvent(
                        message.id.value,
                        message.whatsappMessageId.value,
                        message.conversationId.value,
                        message.direction.value,
                        message.accountId?.value,
                        message.displayPhoneNumber.value,
                        message.phoneNumberId.value,
                        message.type.value,
                        message.payload.value,
                        message.createdAt?.value,
                        message.updatedAt?.value,
                        message.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
