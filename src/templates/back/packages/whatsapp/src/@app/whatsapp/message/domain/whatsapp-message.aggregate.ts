/* eslint-disable key-spacing */
import { IamAccount } from '@app/iam/account';
import { WhatsappConversation } from '@app/whatsapp/conversation';
import { WhatsappCreatedMessageEvent, WhatsappDeletedMessageEvent, WhatsappUpdatedMessageEvent } from '@app/whatsapp/message';
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
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class WhatsappMessage extends AggregateRoot
{
    id: WhatsappMessageId;
    whatsappMessageId: WhatsappMessageWhatsappMessageId;
    conversationId: WhatsappMessageConversationId;
    direction: WhatsappMessageDirection;
    accountId: WhatsappMessageAccountId;
    displayPhoneNumber: WhatsappMessageDisplayPhoneNumber;
    phoneNumberId: WhatsappMessagePhoneNumberId;
    type: WhatsappMessageType;
    payload: WhatsappMessagePayload;
    createdAt: WhatsappMessageCreatedAt;
    updatedAt: WhatsappMessageUpdatedAt;
    deletedAt: WhatsappMessageDeletedAt;
    account: IamAccount;
    conversation: WhatsappConversation;

    constructor(
        id: WhatsappMessageId,
        whatsappMessageId: WhatsappMessageWhatsappMessageId,
        conversationId: WhatsappMessageConversationId,
        direction: WhatsappMessageDirection,
        accountId: WhatsappMessageAccountId,
        displayPhoneNumber: WhatsappMessageDisplayPhoneNumber,
        phoneNumberId: WhatsappMessagePhoneNumberId,
        type: WhatsappMessageType,
        payload: WhatsappMessagePayload,
        createdAt: WhatsappMessageCreatedAt,
        updatedAt: WhatsappMessageUpdatedAt,
        deletedAt: WhatsappMessageDeletedAt,
        account?: IamAccount,
        conversation?: WhatsappConversation,
    )
    {
        super();
        this.id = id;
        this.whatsappMessageId = whatsappMessageId;
        this.conversationId = conversationId;
        this.direction = direction;
        this.accountId = accountId;
        this.displayPhoneNumber = displayPhoneNumber;
        this.phoneNumberId = phoneNumberId;
        this.type = type;
        this.payload = payload;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.account = account;
        this.conversation = conversation;
    }

    static register(
        id: WhatsappMessageId,
        whatsappMessageId: WhatsappMessageWhatsappMessageId,
        conversationId: WhatsappMessageConversationId,
        direction: WhatsappMessageDirection,
        accountId: WhatsappMessageAccountId,
        displayPhoneNumber: WhatsappMessageDisplayPhoneNumber,
        phoneNumberId: WhatsappMessagePhoneNumberId,
        type: WhatsappMessageType,
        payload: WhatsappMessagePayload,
        createdAt: WhatsappMessageCreatedAt,
        updatedAt: WhatsappMessageUpdatedAt,
        deletedAt: WhatsappMessageDeletedAt,
        account?: IamAccount,
        conversation?: WhatsappConversation,
    ): WhatsappMessage
    {
        return new WhatsappMessage(
            id,
            whatsappMessageId,
            conversationId,
            direction,
            accountId,
            displayPhoneNumber,
            phoneNumberId,
            type,
            payload,
            createdAt,
            updatedAt,
            deletedAt,
            account,
            conversation,
        );
    }

    created(message: WhatsappMessage): void
    {
        this.apply(
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
        );
    }

    updated(message: WhatsappMessage): void
    {
        this.apply(
            new WhatsappUpdatedMessageEvent(
                message.id?.value,
                message.whatsappMessageId?.value,
                message.conversationId?.value,
                message.direction?.value,
                message.accountId?.value,
                message.displayPhoneNumber?.value,
                message.phoneNumberId?.value,
                message.type?.value,
                message.payload?.value,
                message.createdAt?.value,
                message.updatedAt?.value,
                message.deletedAt?.value,
            ),
        );
    }

    deleted(message: WhatsappMessage): void
    {
        this.apply(
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
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            whatsappMessageId: this.whatsappMessageId.value,
            conversationId: this.conversationId.value,
            direction: this.direction.value,
            accountId: this.accountId?.value,
            displayPhoneNumber: this.displayPhoneNumber.value,
            phoneNumberId: this.phoneNumberId.value,
            type: this.type.value,
            payload: this.payload.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            account: this.account?.toDTO(),
            conversation: this.conversation?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            whatsappMessageId: this.whatsappMessageId.value,
            conversationId: this.conversationId.value,
            direction: this.direction.value,
            accountId: this.accountId?.value,
            displayPhoneNumber: this.displayPhoneNumber.value,
            phoneNumberId: this.phoneNumberId.value,
            type: this.type.value,
            payload: this.payload.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            account: this.account?.toDTO(),
            conversation: this.conversation?.toDTO(),
        };
    }
}
