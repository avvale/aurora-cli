/* eslint-disable key-spacing */
import {
    MessageCreatedInboxEvent,
    MessageDeletedInboxEvent,
    MessageUpdatedInboxEvent,
} from '@app/message/inbox';
import {
    MessageInboxAccountCode,
    MessageInboxAccountId,
    MessageInboxAttachments,
    MessageInboxBody,
    MessageInboxCreatedAt,
    MessageInboxDeletedAt,
    MessageInboxIcon,
    MessageInboxId,
    MessageInboxImage,
    MessageInboxIsImportant,
    MessageInboxIsInternalLink,
    MessageInboxIsRead,
    MessageInboxIsReadAtLeastOnce,
    MessageInboxLink,
    MessageInboxMessageId,
    MessageInboxMessageRowId,
    MessageInboxMeta,
    MessageInboxRowId,
    MessageInboxSentAt,
    MessageInboxSubject,
    MessageInboxTenantIds,
    MessageInboxUpdatedAt,
} from '@app/message/inbox/domain/value-objects';
import { MessageMessage } from '@app/message/message';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageInbox extends AggregateRoot {
    id: MessageInboxId;
    rowId: MessageInboxRowId;
    tenantIds: MessageInboxTenantIds;
    messageId: MessageInboxMessageId;
    messageRowId: MessageInboxMessageRowId;
    accountId: MessageInboxAccountId;
    accountCode: MessageInboxAccountCode;
    isImportant: MessageInboxIsImportant;
    sentAt: MessageInboxSentAt;
    subject: MessageInboxSubject;
    body: MessageInboxBody;
    link: MessageInboxLink;
    isInternalLink: MessageInboxIsInternalLink;
    image: MessageInboxImage;
    icon: MessageInboxIcon;
    attachments: MessageInboxAttachments;
    isRead: MessageInboxIsRead;
    isReadAtLeastOnce: MessageInboxIsReadAtLeastOnce;
    meta: MessageInboxMeta;
    createdAt: MessageInboxCreatedAt;
    updatedAt: MessageInboxUpdatedAt;
    deletedAt: MessageInboxDeletedAt;
    message: MessageMessage;

    constructor(
        id: MessageInboxId,
        rowId: MessageInboxRowId,
        tenantIds: MessageInboxTenantIds,
        messageId: MessageInboxMessageId,
        messageRowId: MessageInboxMessageRowId,
        accountId: MessageInboxAccountId,
        accountCode: MessageInboxAccountCode,
        isImportant: MessageInboxIsImportant,
        sentAt: MessageInboxSentAt,
        subject: MessageInboxSubject,
        body: MessageInboxBody,
        link: MessageInboxLink,
        isInternalLink: MessageInboxIsInternalLink,
        image: MessageInboxImage,
        icon: MessageInboxIcon,
        attachments: MessageInboxAttachments,
        isRead: MessageInboxIsRead,
        isReadAtLeastOnce: MessageInboxIsReadAtLeastOnce,
        meta: MessageInboxMeta,
        createdAt: MessageInboxCreatedAt,
        updatedAt: MessageInboxUpdatedAt,
        deletedAt: MessageInboxDeletedAt,
        message?: MessageMessage,
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.tenantIds = tenantIds;
        this.messageId = messageId;
        this.messageRowId = messageRowId;
        this.accountId = accountId;
        this.accountCode = accountCode;
        this.isImportant = isImportant;
        this.sentAt = sentAt;
        this.subject = subject;
        this.body = body;
        this.link = link;
        this.isInternalLink = isInternalLink;
        this.image = image;
        this.icon = icon;
        this.attachments = attachments;
        this.isRead = isRead;
        this.isReadAtLeastOnce = isReadAtLeastOnce;
        this.meta = meta;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.message = message;
    }

    static register(
        id: MessageInboxId,
        rowId: MessageInboxRowId,
        tenantIds: MessageInboxTenantIds,
        messageId: MessageInboxMessageId,
        messageRowId: MessageInboxMessageRowId,
        accountId: MessageInboxAccountId,
        accountCode: MessageInboxAccountCode,
        isImportant: MessageInboxIsImportant,
        sentAt: MessageInboxSentAt,
        subject: MessageInboxSubject,
        body: MessageInboxBody,
        link: MessageInboxLink,
        isInternalLink: MessageInboxIsInternalLink,
        image: MessageInboxImage,
        icon: MessageInboxIcon,
        attachments: MessageInboxAttachments,
        isRead: MessageInboxIsRead,
        isReadAtLeastOnce: MessageInboxIsReadAtLeastOnce,
        meta: MessageInboxMeta,
        createdAt: MessageInboxCreatedAt,
        updatedAt: MessageInboxUpdatedAt,
        deletedAt: MessageInboxDeletedAt,
        message?: MessageMessage,
    ): MessageInbox {
        return new MessageInbox(
            id,
            rowId,
            tenantIds,
            messageId,
            messageRowId,
            accountId,
            accountCode,
            isImportant,
            sentAt,
            subject,
            body,
            link,
            isInternalLink,
            image,
            icon,
            attachments,
            isRead,
            isReadAtLeastOnce,
            meta,
            createdAt,
            updatedAt,
            deletedAt,
            message,
        );
    }

    created(event: { payload: MessageInbox; cQMetadata?: CQMetadata }): void {
        this.apply(
            new MessageCreatedInboxEvent({
                payload: {
                    id: event.payload.id.value,
                    tenantIds: event.payload.tenantIds?.value,
                    messageId: event.payload.messageId?.value,
                    messageRowId: event.payload.messageRowId.value,
                    accountId: event.payload.accountId.value,
                    accountCode: event.payload.accountCode?.value,
                    isImportant: event.payload.isImportant.value,
                    sentAt: event.payload.sentAt.value,
                    subject: event.payload.subject.value,
                    body: event.payload.body.value,
                    link: event.payload.link?.value,
                    isInternalLink: event.payload.isInternalLink?.value,
                    image: event.payload.image?.value,
                    icon: event.payload.icon?.value,
                    attachments: event.payload.attachments?.value,
                    isRead: event.payload.isRead.value,
                    isReadAtLeastOnce: event.payload.isReadAtLeastOnce.value,
                    meta: event.payload.meta?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: { payload: MessageInbox; cQMetadata?: CQMetadata }): void {
        this.apply(
            new MessageUpdatedInboxEvent({
                payload: {
                    id: event.payload.id?.value,
                    tenantIds: event.payload.tenantIds?.value,
                    messageId: event.payload.messageId?.value,
                    messageRowId: event.payload.messageRowId?.value,
                    accountId: event.payload.accountId?.value,
                    accountCode: event.payload.accountCode?.value,
                    isImportant: event.payload.isImportant?.value,
                    sentAt: event.payload.sentAt?.value,
                    subject: event.payload.subject?.value,
                    body: event.payload.body?.value,
                    link: event.payload.link?.value,
                    isInternalLink: event.payload.isInternalLink?.value,
                    image: event.payload.image?.value,
                    icon: event.payload.icon?.value,
                    attachments: event.payload.attachments?.value,
                    isRead: event.payload.isRead?.value,
                    isReadAtLeastOnce: event.payload.isReadAtLeastOnce?.value,
                    meta: event.payload.meta?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: { payload: MessageInbox; cQMetadata?: CQMetadata }): void {
        this.apply(
            new MessageDeletedInboxEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    tenantIds: event.payload.tenantIds?.value,
                    messageId: event.payload.messageId?.value,
                    messageRowId: event.payload.messageRowId.value,
                    accountId: event.payload.accountId.value,
                    accountCode: event.payload.accountCode?.value,
                    isImportant: event.payload.isImportant.value,
                    sentAt: event.payload.sentAt.value,
                    subject: event.payload.subject.value,
                    body: event.payload.body.value,
                    link: event.payload.link?.value,
                    isInternalLink: event.payload.isInternalLink?.value,
                    image: event.payload.image?.value,
                    icon: event.payload.icon?.value,
                    attachments: event.payload.attachments?.value,
                    isRead: event.payload.isRead.value,
                    isReadAtLeastOnce: event.payload.isReadAtLeastOnce.value,
                    meta: event.payload.meta?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    toDTO(): LiteralObject {
        return {
            id: this.id.value,
            rowId: this.rowId.value,
            tenantIds: this.tenantIds?.value,
            messageId: this.messageId?.value,
            messageRowId: this.messageRowId.value,
            accountId: this.accountId.value,
            accountCode: this.accountCode?.value,
            isImportant: this.isImportant.value,
            sentAt: this.sentAt.value,
            subject: this.subject.value,
            body: this.body.value,
            link: this.link?.value,
            isInternalLink: this.isInternalLink?.value,
            image: this.image?.value,
            icon: this.icon?.value,
            attachments: this.attachments?.value,
            isRead: this.isRead.value,
            isReadAtLeastOnce: this.isReadAtLeastOnce.value,
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            message: this.message?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
        return {
            id: this.id.value,
            tenantIds: this.tenantIds?.value,
            messageId: this.messageId?.value,
            messageRowId: this.messageRowId.value,
            accountId: this.accountId.value,
            accountCode: this.accountCode?.value,
            isImportant: this.isImportant.value,
            sentAt: this.sentAt.value,
            subject: this.subject.value,
            body: this.body.value,
            link: this.link?.value,
            isInternalLink: this.isInternalLink?.value,
            image: this.image?.value,
            icon: this.icon?.value,
            attachments: this.attachments?.value,
            isRead: this.isRead.value,
            isReadAtLeastOnce: this.isReadAtLeastOnce.value,
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            message: this.message?.toDTO(),
        };
    }
}
