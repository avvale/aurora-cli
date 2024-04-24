/* eslint-disable key-spacing */
import { IamAccount } from '@app/iam/account';
import { WhatsappConversation } from '@app/whatsapp/conversation';
import { WhatsappCreatedMessageEvent, WhatsappDeletedMessageEvent, WhatsappUpdatedMessageEvent } from '@app/whatsapp/message';
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
import { WhatsappTimeline } from '@app/whatsapp/timeline';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class WhatsappMessage extends AggregateRoot
{
    id: WhatsappMessageId;
    wabaMessageId: WhatsappMessageWabaMessageId;
    timelineId: WhatsappMessageTimelineId;
    conversationId: WhatsappMessageConversationId;
    statuses: WhatsappMessageStatuses;
    direction: WhatsappMessageDirection;
    accountId: WhatsappMessageAccountId;
    wabaContactId: WhatsappMessageWabaContactId;
    contactName: WhatsappMessageContactName;
    type: WhatsappMessageType;
    payload: WhatsappMessagePayload;
    createdAt: WhatsappMessageCreatedAt;
    updatedAt: WhatsappMessageUpdatedAt;
    deletedAt: WhatsappMessageDeletedAt;
    account: IamAccount;
    timeline: WhatsappTimeline;
    conversation: WhatsappConversation;

    constructor(
        id: WhatsappMessageId,
        wabaMessageId: WhatsappMessageWabaMessageId,
        timelineId: WhatsappMessageTimelineId,
        conversationId: WhatsappMessageConversationId,
        statuses: WhatsappMessageStatuses,
        direction: WhatsappMessageDirection,
        accountId: WhatsappMessageAccountId,
        wabaContactId: WhatsappMessageWabaContactId,
        contactName: WhatsappMessageContactName,
        type: WhatsappMessageType,
        payload: WhatsappMessagePayload,
        createdAt: WhatsappMessageCreatedAt,
        updatedAt: WhatsappMessageUpdatedAt,
        deletedAt: WhatsappMessageDeletedAt,
        account?: IamAccount,
        timeline?: WhatsappTimeline,
        conversation?: WhatsappConversation,
    )
    {
        super();
        this.id = id;
        this.wabaMessageId = wabaMessageId;
        this.timelineId = timelineId;
        this.conversationId = conversationId;
        this.statuses = statuses;
        this.direction = direction;
        this.accountId = accountId;
        this.wabaContactId = wabaContactId;
        this.contactName = contactName;
        this.type = type;
        this.payload = payload;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.account = account;
        this.timeline = timeline;
        this.conversation = conversation;
    }

    static register(
        id: WhatsappMessageId,
        wabaMessageId: WhatsappMessageWabaMessageId,
        timelineId: WhatsappMessageTimelineId,
        conversationId: WhatsappMessageConversationId,
        statuses: WhatsappMessageStatuses,
        direction: WhatsappMessageDirection,
        accountId: WhatsappMessageAccountId,
        wabaContactId: WhatsappMessageWabaContactId,
        contactName: WhatsappMessageContactName,
        type: WhatsappMessageType,
        payload: WhatsappMessagePayload,
        createdAt: WhatsappMessageCreatedAt,
        updatedAt: WhatsappMessageUpdatedAt,
        deletedAt: WhatsappMessageDeletedAt,
        account?: IamAccount,
        timeline?: WhatsappTimeline,
        conversation?: WhatsappConversation,
    ): WhatsappMessage
    {
        return new WhatsappMessage(
            id,
            wabaMessageId,
            timelineId,
            conversationId,
            statuses,
            direction,
            accountId,
            wabaContactId,
            contactName,
            type,
            payload,
            createdAt,
            updatedAt,
            deletedAt,
            account,
            timeline,
            conversation,
        );
    }

    created(message: WhatsappMessage): void
    {
        this.apply(
            new WhatsappCreatedMessageEvent(
                message.id.value,
                message.wabaMessageId.value,
                message.timelineId.value,
                message.conversationId?.value,
                message.statuses.value,
                message.direction.value,
                message.accountId?.value,
                message.wabaContactId.value,
                message.contactName?.value,
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
                message.wabaMessageId?.value,
                message.timelineId?.value,
                message.conversationId?.value,
                message.statuses?.value,
                message.direction?.value,
                message.accountId?.value,
                message.wabaContactId?.value,
                message.contactName?.value,
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
                message.wabaMessageId.value,
                message.timelineId.value,
                message.conversationId?.value,
                message.statuses.value,
                message.direction.value,
                message.accountId?.value,
                message.wabaContactId.value,
                message.contactName?.value,
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
            wabaMessageId: this.wabaMessageId.value,
            timelineId: this.timelineId.value,
            conversationId: this.conversationId?.value,
            statuses: this.statuses.value,
            direction: this.direction.value,
            accountId: this.accountId?.value,
            wabaContactId: this.wabaContactId.value,
            contactName: this.contactName?.value,
            type: this.type.value,
            payload: this.payload.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            account: this.account?.toDTO(),
            timeline: this.timeline?.toDTO(),
            conversation: this.conversation?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            wabaMessageId: this.wabaMessageId.value,
            timelineId: this.timelineId.value,
            conversationId: this.conversationId?.value,
            statuses: this.statuses.value,
            direction: this.direction.value,
            accountId: this.accountId?.value,
            wabaContactId: this.wabaContactId.value,
            contactName: this.contactName?.value,
            type: this.type.value,
            payload: this.payload.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            account: this.account?.toDTO(),
            timeline: this.timeline?.toDTO(),
            conversation: this.conversation?.toDTO(),
        };
    }
}
