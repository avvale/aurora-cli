/* eslint-disable key-spacing */
import { MessageCreatedInboxEvent, MessageDeletedInboxEvent, MessageUpdatedInboxEvent } from '@app/message/inbox';
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
    MessageInboxMeta,
    MessageInboxSentAt,
    MessageInboxSort,
    MessageInboxSubject,
    MessageInboxTenantIds,
    MessageInboxUpdatedAt,
} from '@app/message/inbox/domain/value-objects';
import { MessageMessage } from '@app/message/message';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageInbox extends AggregateRoot
{
    id: MessageInboxId;
    tenantIds: MessageInboxTenantIds;
    messageId: MessageInboxMessageId;
    sort: MessageInboxSort;
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
        tenantIds: MessageInboxTenantIds,
        messageId: MessageInboxMessageId,
        sort: MessageInboxSort,
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
    )
    {
        super();
        this.id = id;
        this.tenantIds = tenantIds;
        this.messageId = messageId;
        this.sort = sort;
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
        tenantIds: MessageInboxTenantIds,
        messageId: MessageInboxMessageId,
        sort: MessageInboxSort,
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
    ): MessageInbox
    {
        return new MessageInbox(
            id,
            tenantIds,
            messageId,
            sort,
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

    created(inbox: MessageInbox): void
    {
        this.apply(
            new MessageCreatedInboxEvent(
                inbox.id.value,
                inbox.tenantIds?.value,
                inbox.messageId?.value,
                inbox.sort.value,
                inbox.accountId.value,
                inbox.accountCode?.value,
                inbox.isImportant.value,
                inbox.sentAt.value,
                inbox.subject.value,
                inbox.body.value,
                inbox.link?.value,
                inbox.isInternalLink?.value,
                inbox.image?.value,
                inbox.icon?.value,
                inbox.attachments?.value,
                inbox.isRead.value,
                inbox.isReadAtLeastOnce.value,
                inbox.meta?.value,
                inbox.createdAt?.value,
                inbox.updatedAt?.value,
                inbox.deletedAt?.value,
            ),
        );
    }

    updated(inbox: MessageInbox): void
    {
        this.apply(
            new MessageUpdatedInboxEvent(
                inbox.id?.value,
                inbox.tenantIds?.value,
                inbox.messageId?.value,
                inbox.sort?.value,
                inbox.accountId?.value,
                inbox.accountCode?.value,
                inbox.isImportant?.value,
                inbox.sentAt?.value,
                inbox.subject?.value,
                inbox.body?.value,
                inbox.link?.value,
                inbox.isInternalLink?.value,
                inbox.image?.value,
                inbox.icon?.value,
                inbox.attachments?.value,
                inbox.isRead?.value,
                inbox.isReadAtLeastOnce?.value,
                inbox.meta?.value,
                inbox.createdAt?.value,
                inbox.updatedAt?.value,
                inbox.deletedAt?.value,
            ),
        );
    }

    deleted(inbox: MessageInbox): void
    {
        this.apply(
            new MessageDeletedInboxEvent(
                inbox.id.value,
                inbox.tenantIds?.value,
                inbox.messageId?.value,
                inbox.sort.value,
                inbox.accountId.value,
                inbox.accountCode?.value,
                inbox.isImportant.value,
                inbox.sentAt.value,
                inbox.subject.value,
                inbox.body.value,
                inbox.link?.value,
                inbox.isInternalLink?.value,
                inbox.image?.value,
                inbox.icon?.value,
                inbox.attachments?.value,
                inbox.isRead.value,
                inbox.isReadAtLeastOnce.value,
                inbox.meta?.value,
                inbox.createdAt?.value,
                inbox.updatedAt?.value,
                inbox.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            tenantIds: this.tenantIds?.value,
            messageId: this.messageId?.value,
            sort: this.sort.value,
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
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            tenantIds: this.tenantIds?.value,
            messageId: this.messageId?.value,
            sort: this.sort.value,
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
