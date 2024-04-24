import { WhatsappConversation, WhatsappCreatedConversationEvent, WhatsappCreatedConversationsEvent, WhatsappDeletedConversationEvent, WhatsappDeletedConversationsEvent, WhatsappUpdatedAndIncrementedConversationEvent, WhatsappUpdatedAndIncrementedConversationsEvent, WhatsappUpdatedConversationEvent, WhatsappUpdatedConversationsEvent } from '@app/whatsapp/conversation';
import { AggregateRoot } from '@nestjs/cqrs';

export class WhatsappAddConversationsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: WhatsappConversation[] = [],
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
            new WhatsappCreatedConversationsEvent(
                this.aggregateRoots.map(conversation =>
                    new WhatsappCreatedConversationEvent(
                        conversation.id.value,
                        conversation.wabaConversationId.value,
                        conversation.timelineId.value,
                        conversation.wabaContactId.value,
                        conversation.expiration.value,
                        conversation.category.value,
                        conversation.isBillable.value,
                        conversation.pricingModel.value,
                        conversation.createdAt?.value,
                        conversation.updatedAt?.value,
                        conversation.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new WhatsappUpdatedConversationsEvent(
                this.aggregateRoots.map(conversation =>
                    new WhatsappUpdatedConversationEvent(
                        conversation.id.value,
                        conversation.wabaConversationId.value,
                        conversation.timelineId.value,
                        conversation.wabaContactId.value,
                        conversation.expiration.value,
                        conversation.category.value,
                        conversation.isBillable.value,
                        conversation.pricingModel.value,
                        conversation.createdAt?.value,
                        conversation.updatedAt?.value,
                        conversation.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new WhatsappUpdatedAndIncrementedConversationsEvent(
                this.aggregateRoots.map(conversation =>
                    new WhatsappUpdatedAndIncrementedConversationEvent(
                        conversation.id.value,
                        conversation.wabaConversationId.value,
                        conversation.timelineId.value,
                        conversation.wabaContactId.value,
                        conversation.expiration.value,
                        conversation.category.value,
                        conversation.isBillable.value,
                        conversation.pricingModel.value,
                        conversation.createdAt?.value,
                        conversation.updatedAt?.value,
                        conversation.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new WhatsappDeletedConversationsEvent(
                this.aggregateRoots.map(conversation =>
                    new WhatsappDeletedConversationEvent(
                        conversation.id.value,
                        conversation.wabaConversationId.value,
                        conversation.timelineId.value,
                        conversation.wabaContactId.value,
                        conversation.expiration.value,
                        conversation.category.value,
                        conversation.isBillable.value,
                        conversation.pricingModel.value,
                        conversation.createdAt?.value,
                        conversation.updatedAt?.value,
                        conversation.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
