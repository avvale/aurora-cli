/* eslint-disable key-spacing */
import {
    ToolsCreatedWebhookLogEvent,
    ToolsDeletedWebhookLogEvent,
    ToolsUpdatedWebhookLogEvent,
} from '@app/tools/webhook-log';
import {
    ToolsWebhookLogBodyRequest,
    ToolsWebhookLogCreatedAt,
    ToolsWebhookLogDeletedAt,
    ToolsWebhookLogHeaderRequest,
    ToolsWebhookLogId,
    ToolsWebhookLogRowId,
    ToolsWebhookLogUpdatedAt,
    ToolsWebhookLogUrl,
} from '@app/tools/webhook-log/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsWebhookLog extends AggregateRoot {
    id: ToolsWebhookLogId;
    rowId: ToolsWebhookLogRowId;
    url: ToolsWebhookLogUrl;
    headerRequest: ToolsWebhookLogHeaderRequest;
    bodyRequest: ToolsWebhookLogBodyRequest;
    createdAt: ToolsWebhookLogCreatedAt;
    updatedAt: ToolsWebhookLogUpdatedAt;
    deletedAt: ToolsWebhookLogDeletedAt;

    constructor(
        id: ToolsWebhookLogId,
        rowId: ToolsWebhookLogRowId,
        url: ToolsWebhookLogUrl,
        headerRequest: ToolsWebhookLogHeaderRequest,
        bodyRequest: ToolsWebhookLogBodyRequest,
        createdAt: ToolsWebhookLogCreatedAt,
        updatedAt: ToolsWebhookLogUpdatedAt,
        deletedAt: ToolsWebhookLogDeletedAt,
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.url = url;
        this.headerRequest = headerRequest;
        this.bodyRequest = bodyRequest;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: ToolsWebhookLogId,
        rowId: ToolsWebhookLogRowId,
        url: ToolsWebhookLogUrl,
        headerRequest: ToolsWebhookLogHeaderRequest,
        bodyRequest: ToolsWebhookLogBodyRequest,
        createdAt: ToolsWebhookLogCreatedAt,
        updatedAt: ToolsWebhookLogUpdatedAt,
        deletedAt: ToolsWebhookLogDeletedAt,
    ): ToolsWebhookLog {
        return new ToolsWebhookLog(
            id,
            rowId,
            url,
            headerRequest,
            bodyRequest,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(event: {
        payload: ToolsWebhookLog;
        cQMetadata?: CQMetadata;
    }): void {
        this.apply(
            new ToolsCreatedWebhookLogEvent({
                payload: {
                    id: event.payload.id.value,
                    url: event.payload.url.value,
                    headerRequest: event.payload.headerRequest?.value,
                    bodyRequest: event.payload.bodyRequest?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: {
        payload: ToolsWebhookLog;
        cQMetadata?: CQMetadata;
    }): void {
        this.apply(
            new ToolsUpdatedWebhookLogEvent({
                payload: {
                    id: event.payload.id?.value,
                    url: event.payload.url?.value,
                    headerRequest: event.payload.headerRequest?.value,
                    bodyRequest: event.payload.bodyRequest?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: {
        payload: ToolsWebhookLog;
        cQMetadata?: CQMetadata;
    }): void {
        this.apply(
            new ToolsDeletedWebhookLogEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    url: event.payload.url.value,
                    headerRequest: event.payload.headerRequest?.value,
                    bodyRequest: event.payload.bodyRequest?.value,
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
            url: this.url.value,
            headerRequest: this.headerRequest?.value,
            bodyRequest: this.bodyRequest?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
        return {
            id: this.id.value,
            url: this.url.value,
            headerRequest: this.headerRequest?.value,
            bodyRequest: this.bodyRequest?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
