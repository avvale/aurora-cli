/* eslint-disable key-spacing */
import { MessageCreatedMessageEvent, MessageDeletedMessageEvent, MessageUpdatedMessageEvent } from '@app/message/message';
import {
    MessageMessageAccountRecipientIds,
    MessageMessageAttachments,
    MessageMessageBody,
    MessageMessageCreatedAt,
    MessageMessageDeletedAt,
    MessageMessageIcon,
    MessageMessageId,
    MessageMessageImage,
    MessageMessageIsImportant,
    MessageMessageIsInternalLink,
    MessageMessageLink,
    MessageMessageMeta,
    MessageMessageReads,
    MessageMessageScopeRecipients,
    MessageMessageSendAt,
    MessageMessageStatus,
    MessageMessageSubject,
    MessageMessageTagRecipients,
    MessageMessageTenantIds,
    MessageMessageTenantRecipientIds,
    MessageMessageTotalRecipients,
    MessageMessageUpdatedAt,
} from '@app/message/message/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageMessage extends AggregateRoot
{
    id: MessageMessageId;
    tenantIds: MessageMessageTenantIds;
    status: MessageMessageStatus;
    accountRecipientIds: MessageMessageAccountRecipientIds;
    tenantRecipientIds: MessageMessageTenantRecipientIds;
    scopeRecipients: MessageMessageScopeRecipients;
    tagRecipients: MessageMessageTagRecipients;
    sendAt: MessageMessageSendAt;
    isImportant: MessageMessageIsImportant;
    subject: MessageMessageSubject;
    body: MessageMessageBody;
    link: MessageMessageLink;
    isInternalLink: MessageMessageIsInternalLink;
    image: MessageMessageImage;
    icon: MessageMessageIcon;
    attachments: MessageMessageAttachments;
    totalRecipients: MessageMessageTotalRecipients;
    reads: MessageMessageReads;
    meta: MessageMessageMeta;
    createdAt: MessageMessageCreatedAt;
    updatedAt: MessageMessageUpdatedAt;
    deletedAt: MessageMessageDeletedAt;

    constructor(
        id: MessageMessageId,
        tenantIds: MessageMessageTenantIds,
        status: MessageMessageStatus,
        accountRecipientIds: MessageMessageAccountRecipientIds,
        tenantRecipientIds: MessageMessageTenantRecipientIds,
        scopeRecipients: MessageMessageScopeRecipients,
        tagRecipients: MessageMessageTagRecipients,
        sendAt: MessageMessageSendAt,
        isImportant: MessageMessageIsImportant,
        subject: MessageMessageSubject,
        body: MessageMessageBody,
        link: MessageMessageLink,
        isInternalLink: MessageMessageIsInternalLink,
        image: MessageMessageImage,
        icon: MessageMessageIcon,
        attachments: MessageMessageAttachments,
        totalRecipients: MessageMessageTotalRecipients,
        reads: MessageMessageReads,
        meta: MessageMessageMeta,
        createdAt: MessageMessageCreatedAt,
        updatedAt: MessageMessageUpdatedAt,
        deletedAt: MessageMessageDeletedAt,
    )
    {
        super();
        this.id = id;
        this.tenantIds = tenantIds;
        this.status = status;
        this.accountRecipientIds = accountRecipientIds;
        this.tenantRecipientIds = tenantRecipientIds;
        this.scopeRecipients = scopeRecipients;
        this.tagRecipients = tagRecipients;
        this.sendAt = sendAt;
        this.isImportant = isImportant;
        this.subject = subject;
        this.body = body;
        this.link = link;
        this.isInternalLink = isInternalLink;
        this.image = image;
        this.icon = icon;
        this.attachments = attachments;
        this.totalRecipients = totalRecipients;
        this.reads = reads;
        this.meta = meta;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: MessageMessageId,
        tenantIds: MessageMessageTenantIds,
        status: MessageMessageStatus,
        accountRecipientIds: MessageMessageAccountRecipientIds,
        tenantRecipientIds: MessageMessageTenantRecipientIds,
        scopeRecipients: MessageMessageScopeRecipients,
        tagRecipients: MessageMessageTagRecipients,
        sendAt: MessageMessageSendAt,
        isImportant: MessageMessageIsImportant,
        subject: MessageMessageSubject,
        body: MessageMessageBody,
        link: MessageMessageLink,
        isInternalLink: MessageMessageIsInternalLink,
        image: MessageMessageImage,
        icon: MessageMessageIcon,
        attachments: MessageMessageAttachments,
        totalRecipients: MessageMessageTotalRecipients,
        reads: MessageMessageReads,
        meta: MessageMessageMeta,
        createdAt: MessageMessageCreatedAt,
        updatedAt: MessageMessageUpdatedAt,
        deletedAt: MessageMessageDeletedAt,
    ): MessageMessage
    {
        return new MessageMessage(
            id,
            tenantIds,
            status,
            accountRecipientIds,
            tenantRecipientIds,
            scopeRecipients,
            tagRecipients,
            sendAt,
            isImportant,
            subject,
            body,
            link,
            isInternalLink,
            image,
            icon,
            attachments,
            totalRecipients,
            reads,
            meta,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(
        event: {
            payload: MessageMessage;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new MessageCreatedMessageEvent({
                payload: {
                    id: event.payload.id.value,
                    tenantIds: event.payload.tenantIds?.value,
                    status: event.payload.status.value,
                    accountRecipientIds: event.payload.accountRecipientIds?.value,
                    tenantRecipientIds: event.payload.tenantRecipientIds?.value,
                    scopeRecipients: event.payload.scopeRecipients?.value,
                    tagRecipients: event.payload.tagRecipients?.value,
                    sendAt: event.payload.sendAt?.value,
                    isImportant: event.payload.isImportant.value,
                    subject: event.payload.subject.value,
                    body: event.payload.body.value,
                    link: event.payload.link?.value,
                    isInternalLink: event.payload.isInternalLink?.value,
                    image: event.payload.image?.value,
                    icon: event.payload.icon?.value,
                    attachments: event.payload.attachments?.value,
                    totalRecipients: event.payload.totalRecipients.value,
                    reads: event.payload.reads.value,
                    meta: event.payload.meta?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(
        event: {
            payload: MessageMessage;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new MessageUpdatedMessageEvent({
                payload: {
                    id: event.payload.id?.value,
                    tenantIds: event.payload.tenantIds?.value,
                    status: event.payload.status?.value,
                    accountRecipientIds: event.payload.accountRecipientIds?.value,
                    tenantRecipientIds: event.payload.tenantRecipientIds?.value,
                    scopeRecipients: event.payload.scopeRecipients?.value,
                    tagRecipients: event.payload.tagRecipients?.value,
                    sendAt: event.payload.sendAt?.value,
                    isImportant: event.payload.isImportant?.value,
                    subject: event.payload.subject?.value,
                    body: event.payload.body?.value,
                    link: event.payload.link?.value,
                    isInternalLink: event.payload.isInternalLink?.value,
                    image: event.payload.image?.value,
                    icon: event.payload.icon?.value,
                    attachments: event.payload.attachments?.value,
                    totalRecipients: event.payload.totalRecipients?.value,
                    reads: event.payload.reads?.value,
                    meta: event.payload.meta?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(
        event: {
            payload: MessageMessage;
            cQMetadata?: CQMetadata;
        },
    ): void
    {
        this.apply(
            new MessageDeletedMessageEvent({
                payload: {
                    id: event.payload.id.value,
                    tenantIds: event.payload.tenantIds?.value,
                    status: event.payload.status.value,
                    accountRecipientIds: event.payload.accountRecipientIds?.value,
                    tenantRecipientIds: event.payload.tenantRecipientIds?.value,
                    scopeRecipients: event.payload.scopeRecipients?.value,
                    tagRecipients: event.payload.tagRecipients?.value,
                    sendAt: event.payload.sendAt?.value,
                    isImportant: event.payload.isImportant.value,
                    subject: event.payload.subject.value,
                    body: event.payload.body.value,
                    link: event.payload.link?.value,
                    isInternalLink: event.payload.isInternalLink?.value,
                    image: event.payload.image?.value,
                    icon: event.payload.icon?.value,
                    attachments: event.payload.attachments?.value,
                    totalRecipients: event.payload.totalRecipients.value,
                    reads: event.payload.reads.value,
                    meta: event.payload.meta?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            tenantIds: this.tenantIds?.value,
            status: this.status.value,
            accountRecipientIds: this.accountRecipientIds?.value,
            tenantRecipientIds: this.tenantRecipientIds?.value,
            scopeRecipients: this.scopeRecipients?.value,
            tagRecipients: this.tagRecipients?.value,
            sendAt: this.sendAt?.value,
            isImportant: this.isImportant.value,
            subject: this.subject.value,
            body: this.body.value,
            link: this.link?.value,
            isInternalLink: this.isInternalLink?.value,
            image: this.image?.value,
            icon: this.icon?.value,
            attachments: this.attachments?.value,
            totalRecipients: this.totalRecipients.value,
            reads: this.reads.value,
            meta: this.meta?.value,
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
            tenantIds: this.tenantIds?.value,
            status: this.status.value,
            accountRecipientIds: this.accountRecipientIds?.value,
            tenantRecipientIds: this.tenantRecipientIds?.value,
            scopeRecipients: this.scopeRecipients?.value,
            tagRecipients: this.tagRecipients?.value,
            sendAt: this.sendAt?.value,
            isImportant: this.isImportant.value,
            subject: this.subject.value,
            body: this.body.value,
            link: this.link?.value,
            isInternalLink: this.isInternalLink?.value,
            image: this.image?.value,
            icon: this.icon?.value,
            attachments: this.attachments?.value,
            totalRecipients: this.totalRecipients.value,
            reads: this.reads.value,
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
