/* eslint-disable key-spacing */
import { WhatsappCreatedConversationEvent, WhatsappDeletedConversationEvent, WhatsappUpdatedConversationEvent } from '@app/whatsapp/conversation';
import {
    WhatsappConversationAccounts,
    WhatsappConversationCreatedAt,
    WhatsappConversationDeletedAt,
    WhatsappConversationId,
    WhatsappConversationUpdatedAt,
} from '@app/whatsapp/conversation/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class WhatsappConversation extends AggregateRoot
{
    id: WhatsappConversationId;
    accounts: WhatsappConversationAccounts;
    createdAt: WhatsappConversationCreatedAt;
    updatedAt: WhatsappConversationUpdatedAt;
    deletedAt: WhatsappConversationDeletedAt;

    constructor(
        id: WhatsappConversationId,
        accounts: WhatsappConversationAccounts,
        createdAt: WhatsappConversationCreatedAt,
        updatedAt: WhatsappConversationUpdatedAt,
        deletedAt: WhatsappConversationDeletedAt,
    )
    {
        super();
        this.id = id;
        this.accounts = accounts;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: WhatsappConversationId,
        accounts: WhatsappConversationAccounts,
        createdAt: WhatsappConversationCreatedAt,
        updatedAt: WhatsappConversationUpdatedAt,
        deletedAt: WhatsappConversationDeletedAt,
    ): WhatsappConversation
    {
        return new WhatsappConversation(
            id,
            accounts,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(conversation: WhatsappConversation): void
    {
        this.apply(
            new WhatsappCreatedConversationEvent(
                conversation.id.value,
                conversation.accounts?.value,
                conversation.createdAt?.value,
                conversation.updatedAt?.value,
                conversation.deletedAt?.value,
            ),
        );
    }

    updated(conversation: WhatsappConversation): void
    {
        this.apply(
            new WhatsappUpdatedConversationEvent(
                conversation.id?.value,
                conversation.accounts?.value,
                conversation.createdAt?.value,
                conversation.updatedAt?.value,
                conversation.deletedAt?.value,
            ),
        );
    }

    deleted(conversation: WhatsappConversation): void
    {
        this.apply(
            new WhatsappDeletedConversationEvent(
                conversation.id.value,
                conversation.accounts?.value,
                conversation.createdAt?.value,
                conversation.updatedAt?.value,
                conversation.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            accounts: this.accounts?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            accounts: this.accounts?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
