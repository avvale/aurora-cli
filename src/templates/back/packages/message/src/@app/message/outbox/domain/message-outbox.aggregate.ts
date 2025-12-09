/* eslint-disable key-spacing */
import { MessageMessage } from '@app/message/message';
import {
    MessageCreatedOutboxEvent,
    MessageDeletedOutboxEvent,
    MessageUpdatedOutboxEvent,
} from '@app/message/outbox';
import {
    MessageOutboxAccountRecipientIds,
    MessageOutboxCreatedAt,
    MessageOutboxDeletedAt,
    MessageOutboxId,
    MessageOutboxMessageId,
    MessageOutboxMeta,
    MessageOutboxRowId,
    MessageOutboxScopeRecipients,
    MessageOutboxTagRecipients,
    MessageOutboxTenantRecipientIds,
    MessageOutboxUpdatedAt,
} from '@app/message/outbox/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class MessageOutbox extends AggregateRoot {
    id: MessageOutboxId;
    rowId: MessageOutboxRowId;
    messageId: MessageOutboxMessageId;
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
        rowId: MessageOutboxRowId,
        messageId: MessageOutboxMessageId,
        accountRecipientIds: MessageOutboxAccountRecipientIds,
        tenantRecipientIds: MessageOutboxTenantRecipientIds,
        scopeRecipients: MessageOutboxScopeRecipients,
        tagRecipients: MessageOutboxTagRecipients,
        meta: MessageOutboxMeta,
        createdAt: MessageOutboxCreatedAt,
        updatedAt: MessageOutboxUpdatedAt,
        deletedAt: MessageOutboxDeletedAt,
        message?: MessageMessage,
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.messageId = messageId;
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
        rowId: MessageOutboxRowId,
        messageId: MessageOutboxMessageId,
        accountRecipientIds: MessageOutboxAccountRecipientIds,
        tenantRecipientIds: MessageOutboxTenantRecipientIds,
        scopeRecipients: MessageOutboxScopeRecipients,
        tagRecipients: MessageOutboxTagRecipients,
        meta: MessageOutboxMeta,
        createdAt: MessageOutboxCreatedAt,
        updatedAt: MessageOutboxUpdatedAt,
        deletedAt: MessageOutboxDeletedAt,
        message?: MessageMessage,
    ): MessageOutbox {
        return new MessageOutbox(
            id,
            rowId,
            messageId,
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

    created(event: { payload: MessageOutbox; cQMetadata?: CQMetadata }): void {
        this.apply(
            new MessageCreatedOutboxEvent({
                payload: {
                    id: event.payload.id.value,
                    messageId: event.payload.messageId.value,
                    accountRecipientIds:
                        event.payload.accountRecipientIds?.value,
                    tenantRecipientIds: event.payload.tenantRecipientIds?.value,
                    scopeRecipients: event.payload.scopeRecipients?.value,
                    tagRecipients: event.payload.tagRecipients?.value,
                    meta: event.payload.meta?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: { payload: MessageOutbox; cQMetadata?: CQMetadata }): void {
        this.apply(
            new MessageUpdatedOutboxEvent({
                payload: {
                    id: event.payload.id?.value,
                    messageId: event.payload.messageId?.value,
                    accountRecipientIds:
                        event.payload.accountRecipientIds?.value,
                    tenantRecipientIds: event.payload.tenantRecipientIds?.value,
                    scopeRecipients: event.payload.scopeRecipients?.value,
                    tagRecipients: event.payload.tagRecipients?.value,
                    meta: event.payload.meta?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: { payload: MessageOutbox; cQMetadata?: CQMetadata }): void {
        this.apply(
            new MessageDeletedOutboxEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    messageId: event.payload.messageId.value,
                    accountRecipientIds:
                        event.payload.accountRecipientIds?.value,
                    tenantRecipientIds: event.payload.tenantRecipientIds?.value,
                    scopeRecipients: event.payload.scopeRecipients?.value,
                    tagRecipients: event.payload.tagRecipients?.value,
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
            messageId: this.messageId.value,
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
    toRepository(): LiteralObject {
        return {
            id: this.id.value,
            messageId: this.messageId.value,
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
