/* eslint-disable key-spacing */
import {
    ToolsCreatedWebhookEvent,
    ToolsDeletedWebhookEvent,
    ToolsUpdatedWebhookEvent,
} from '@app/tools/webhook';
import {
    ToolsWebhookCreatedAt,
    ToolsWebhookDeletedAt,
    ToolsWebhookEndpoint,
    ToolsWebhookEvents,
    ToolsWebhookExternalId,
    ToolsWebhookId,
    ToolsWebhookMeta,
    ToolsWebhookName,
    ToolsWebhookRowId,
    ToolsWebhookSecret,
    ToolsWebhookService,
    ToolsWebhookUpdatedAt,
} from '@app/tools/webhook/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsWebhook extends AggregateRoot {
    id: ToolsWebhookId;
    rowId: ToolsWebhookRowId;
    name: ToolsWebhookName;
    service: ToolsWebhookService;
    endpoint: ToolsWebhookEndpoint;
    externalId: ToolsWebhookExternalId;
    events: ToolsWebhookEvents;
    secret: ToolsWebhookSecret;
    meta: ToolsWebhookMeta;
    createdAt: ToolsWebhookCreatedAt;
    updatedAt: ToolsWebhookUpdatedAt;
    deletedAt: ToolsWebhookDeletedAt;

    constructor(
        id: ToolsWebhookId,
        rowId: ToolsWebhookRowId,
        name: ToolsWebhookName,
        service: ToolsWebhookService,
        endpoint: ToolsWebhookEndpoint,
        externalId: ToolsWebhookExternalId,
        events: ToolsWebhookEvents,
        secret: ToolsWebhookSecret,
        meta: ToolsWebhookMeta,
        createdAt: ToolsWebhookCreatedAt,
        updatedAt: ToolsWebhookUpdatedAt,
        deletedAt: ToolsWebhookDeletedAt,
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.name = name;
        this.service = service;
        this.endpoint = endpoint;
        this.externalId = externalId;
        this.events = events;
        this.secret = secret;
        this.meta = meta;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: ToolsWebhookId,
        rowId: ToolsWebhookRowId,
        name: ToolsWebhookName,
        service: ToolsWebhookService,
        endpoint: ToolsWebhookEndpoint,
        externalId: ToolsWebhookExternalId,
        events: ToolsWebhookEvents,
        secret: ToolsWebhookSecret,
        meta: ToolsWebhookMeta,
        createdAt: ToolsWebhookCreatedAt,
        updatedAt: ToolsWebhookUpdatedAt,
        deletedAt: ToolsWebhookDeletedAt,
    ): ToolsWebhook {
        return new ToolsWebhook(
            id,
            rowId,
            name,
            service,
            endpoint,
            externalId,
            events,
            secret,
            meta,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(event: { payload: ToolsWebhook; cQMetadata?: CQMetadata }): void {
        this.apply(
            new ToolsCreatedWebhookEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    service: event.payload.service.value,
                    endpoint: event.payload.endpoint.value,
                    externalId: event.payload.externalId?.value,
                    events: event.payload.events?.value,
                    secret: event.payload.secret?.value,
                    meta: event.payload.meta?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: { payload: ToolsWebhook; cQMetadata?: CQMetadata }): void {
        this.apply(
            new ToolsUpdatedWebhookEvent({
                payload: {
                    id: event.payload.id?.value,
                    name: event.payload.name?.value,
                    service: event.payload.service?.value,
                    endpoint: event.payload.endpoint?.value,
                    externalId: event.payload.externalId?.value,
                    events: event.payload.events?.value,
                    secret: event.payload.secret?.value,
                    meta: event.payload.meta?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: { payload: ToolsWebhook; cQMetadata?: CQMetadata }): void {
        this.apply(
            new ToolsDeletedWebhookEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    name: event.payload.name.value,
                    service: event.payload.service.value,
                    endpoint: event.payload.endpoint.value,
                    externalId: event.payload.externalId?.value,
                    events: event.payload.events?.value,
                    secret: event.payload.secret?.value,
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
            name: this.name.value,
            service: this.service.value,
            endpoint: this.endpoint.value,
            externalId: this.externalId?.value,
            events: this.events?.value,
            secret: this.secret?.value,
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
        return {
            id: this.id.value,
            name: this.name.value,
            service: this.service.value,
            endpoint: this.endpoint.value,
            externalId: this.externalId?.value,
            events: this.events?.value,
            secret: this.secret?.value,
            meta: this.meta?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
