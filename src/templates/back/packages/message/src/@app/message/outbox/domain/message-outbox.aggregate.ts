/* eslint-disable key-spacing */
import { MessageMessage } from '@app/message/message';
import { MessageCreatedOutboxEvent, MessageDeletedOutboxEvent, MessageUpdatedOutboxEvent } from '@app/message/outbox';
import {
    MessageOutboxAccountRecipientIds,
    MessageOutboxCreatedAt,
    MessageOutboxDeletedAt,
    MessageOutboxId,
    MessageOutboxMessageId,
    MessageOutboxMeta,
    MessageOutboxScopeRecipients,
    MessageOutboxSort,
    MessageOutboxTagRecipients,
    MessageOutboxTenantRecipientIds,
    MessageOutboxUpdatedAt,
} from '@app/message/outbox/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageOutbox extends AggregateRoot
{
    id: MessageOutboxId;
    messageId: MessageOutboxMessageId;
    sort: MessageOutboxSort;
    accountRecipientIds: MessageOutboxAccountRecipientIds;
    tenantRecipientIds: MessageOutboxTenantRecipientIds;
    scopeRecipients: MessageOutboxScopeRecipients;
    tagRecipients: MessageOutboxTagRecipients;
    meta: MessageOutboxMeta;
    createdAt: MessageOutboxCreatedAt;
    updatedAt: MessageOutboxUpdatedAt;
    deletedAt: MessageOutboxDeletedAt;
    message: MessageMessage;

    constructor(
        id: MessageOutboxId,
        messageId: MessageOutboxMessageId,
        sort: MessageOutboxSort,
        accountRecipientIds: MessageOutboxAccountRecipientIds,
        tenantRecipientIds: MessageOutboxTenantRecipientIds,
        scopeRecipients: MessageOutboxScopeRecipients,
        tagRecipients: MessageOutboxTagRecipients,
        meta: MessageOutboxMeta,
        createdAt: MessageOutboxCreatedAt,
        updatedAt: MessageOutboxUpdatedAt,
        deletedAt: MessageOutboxDeletedAt,
        message?: MessageMessage,
    )
    {
        super();
        this.id = id;
        this.messageId = messageId;
        this.sort = sort;
        this.accountRecipientIds = accountRecipientIds;
        this.tenantRecipientIds = tenantRecipientIds;
        this.scopeRecipients = scopeRecipients;
        this.tagRecipients = tagRecipients;
        this.meta = meta;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.message = message;
    }

    static register(
        id: MessageOutboxId,
        messageId: MessageOutboxMessageId,
        sort: MessageOutboxSort,
        accountRecipientIds: MessageOutboxAccountRecipientIds,
        tenantRecipientIds: MessageOutboxTenantRecipientIds,
        scopeRecipients: MessageOutboxScopeRecipients,
        tagRecipients: MessageOutboxTagRecipients,
        meta: MessageOutboxMeta,
        createdAt: MessageOutboxCreatedAt,
        updatedAt: MessageOutboxUpdatedAt,
        deletedAt: MessageOutboxDeletedAt,
        message?: MessageMessage,
    ): MessageOutbox
    {
        return new MessageOutbox(
            id,
            messageId,
            sort,
            accountRecipientIds,
            tenantRecipientIds,
            scopeRecipients,
            tagRecipients,
            meta,
            createdAt,
            updatedAt,
            deletedAt,
            message,
        );
    }

    created(outbox: MessageOutbox): void
    {
        this.apply(
            new MessageCreatedOutboxEvent(
                outbox.id.value,
                outbox.messageId.value,
                outbox.sort.value,
                outbox.accountRecipientIds?.value,
                outbox.tenantRecipientIds?.value,
                outbox.scopeRecipients?.value,
                outbox.tagRecipients?.value,
                outbox.meta?.value,
                outbox.createdAt?.value,
                outbox.updatedAt?.value,
                outbox.deletedAt?.value,
            ),
        );
    }

    updated(outbox: MessageOutbox): void
    {
        this.apply(
            new MessageUpdatedOutboxEvent(
                outbox.id?.value,
                outbox.messageId?.value,
                outbox.sort?.value,
                outbox.accountRecipientIds?.value,
                outbox.tenantRecipientIds?.value,
                outbox.scopeRecipients?.value,
                outbox.tagRecipients?.value,
                outbox.meta?.value,
                outbox.createdAt?.value,
                outbox.updatedAt?.value,
                outbox.deletedAt?.value,
            ),
        );
    }

    deleted(outbox: MessageOutbox): void
    {
        this.apply(
            new MessageDeletedOutboxEvent(
                outbox.id.value,
                outbox.messageId.value,
                outbox.sort.value,
                outbox.accountRecipientIds?.value,
                outbox.tenantRecipientIds?.value,
                outbox.scopeRecipients?.value,
                outbox.tagRecipients?.value,
                outbox.meta?.value,
                outbox.createdAt?.value,
                outbox.updatedAt?.value,
                outbox.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            messageId: this.messageId.value,
            sort: this.sort.value,
            accountRecipientIds: this.accountRecipientIds?.value,
            tenantRecipientIds: this.tenantRecipientIds?.value,
            scopeRecipients: this.scopeRecipients?.value,
            tagRecipients: this.tagRecipients?.value,
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
            messageId: this.messageId.value,
            sort: this.sort.value,
            accountRecipientIds: this.accountRecipientIds?.value,
            tenantRecipientIds: this.tenantRecipientIds?.value,
            scopeRecipients: this.scopeRecipients?.value,
            tagRecipients: this.tagRecipients?.value,
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            message: this.message?.toDTO(),
        };
    }
}
