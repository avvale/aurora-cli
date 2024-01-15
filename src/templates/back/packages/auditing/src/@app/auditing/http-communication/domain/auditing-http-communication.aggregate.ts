/* eslint-disable key-spacing */
import { AuditingCreatedHttpCommunicationEvent, AuditingDeletedHttpCommunicationEvent, AuditingUpdatedHttpCommunicationEvent } from '@app/auditing/http-communication';
import {
    AuditingHttpCommunicationCreatedAt,
    AuditingHttpCommunicationDeletedAt,
    AuditingHttpCommunicationEvent,
    AuditingHttpCommunicationHttpRequest,
    AuditingHttpCommunicationHttpRequestRejected,
    AuditingHttpCommunicationHttpResponse,
    AuditingHttpCommunicationHttpResponseRejected,
    AuditingHttpCommunicationId,
    AuditingHttpCommunicationIsReprocessing,
    AuditingHttpCommunicationMethod,
    AuditingHttpCommunicationReprocessingHttpCommunicationId,
    AuditingHttpCommunicationStatus,
    AuditingHttpCommunicationTags,
    AuditingHttpCommunicationUpdatedAt,
    AuditingHttpCommunicationUrl,
} from '@app/auditing/http-communication/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class AuditingHttpCommunication extends AggregateRoot
{
    id: AuditingHttpCommunicationId;
    tags: AuditingHttpCommunicationTags;
    event: AuditingHttpCommunicationEvent;
    status: AuditingHttpCommunicationStatus;
    method: AuditingHttpCommunicationMethod;
    url: AuditingHttpCommunicationUrl;
    httpRequest: AuditingHttpCommunicationHttpRequest;
    httpRequestRejected: AuditingHttpCommunicationHttpRequestRejected;
    httpResponse: AuditingHttpCommunicationHttpResponse;
    httpResponseRejected: AuditingHttpCommunicationHttpResponseRejected;
    isReprocessing: AuditingHttpCommunicationIsReprocessing;
    reprocessingHttpCommunicationId: AuditingHttpCommunicationReprocessingHttpCommunicationId;
    createdAt: AuditingHttpCommunicationCreatedAt;
    updatedAt: AuditingHttpCommunicationUpdatedAt;
    deletedAt: AuditingHttpCommunicationDeletedAt;

    constructor(
        id: AuditingHttpCommunicationId,
        tags: AuditingHttpCommunicationTags,
        event: AuditingHttpCommunicationEvent,
        status: AuditingHttpCommunicationStatus,
        method: AuditingHttpCommunicationMethod,
        url: AuditingHttpCommunicationUrl,
        httpRequest: AuditingHttpCommunicationHttpRequest,
        httpRequestRejected: AuditingHttpCommunicationHttpRequestRejected,
        httpResponse: AuditingHttpCommunicationHttpResponse,
        httpResponseRejected: AuditingHttpCommunicationHttpResponseRejected,
        isReprocessing: AuditingHttpCommunicationIsReprocessing,
        reprocessingHttpCommunicationId: AuditingHttpCommunicationReprocessingHttpCommunicationId,
        createdAt: AuditingHttpCommunicationCreatedAt,
        updatedAt: AuditingHttpCommunicationUpdatedAt,
        deletedAt: AuditingHttpCommunicationDeletedAt,
    )
    {
        super();
        this.id = id;
        this.tags = tags;
        this.event = event;
        this.status = status;
        this.method = method;
        this.url = url;
        this.httpRequest = httpRequest;
        this.httpRequestRejected = httpRequestRejected;
        this.httpResponse = httpResponse;
        this.httpResponseRejected = httpResponseRejected;
        this.isReprocessing = isReprocessing;
        this.reprocessingHttpCommunicationId = reprocessingHttpCommunicationId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: AuditingHttpCommunicationId,
        tags: AuditingHttpCommunicationTags,
        event: AuditingHttpCommunicationEvent,
        status: AuditingHttpCommunicationStatus,
        method: AuditingHttpCommunicationMethod,
        url: AuditingHttpCommunicationUrl,
        httpRequest: AuditingHttpCommunicationHttpRequest,
        httpRequestRejected: AuditingHttpCommunicationHttpRequestRejected,
        httpResponse: AuditingHttpCommunicationHttpResponse,
        httpResponseRejected: AuditingHttpCommunicationHttpResponseRejected,
        isReprocessing: AuditingHttpCommunicationIsReprocessing,
        reprocessingHttpCommunicationId: AuditingHttpCommunicationReprocessingHttpCommunicationId,
        createdAt: AuditingHttpCommunicationCreatedAt,
        updatedAt: AuditingHttpCommunicationUpdatedAt,
        deletedAt: AuditingHttpCommunicationDeletedAt,
    ): AuditingHttpCommunication
    {
        return new AuditingHttpCommunication(
            id,
            tags,
            event,
            status,
            method,
            url,
            httpRequest,
            httpRequestRejected,
            httpResponse,
            httpResponseRejected,
            isReprocessing,
            reprocessingHttpCommunicationId,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(httpCommunication: AuditingHttpCommunication): void
    {
        this.apply(
            new AuditingCreatedHttpCommunicationEvent(
                httpCommunication.id.value,
                httpCommunication.tags?.value,
                httpCommunication.event.value,
                httpCommunication.status?.value,
                httpCommunication.method.value,
                httpCommunication.url.value,
                httpCommunication.httpRequest?.value,
                httpCommunication.httpRequestRejected?.value,
                httpCommunication.httpResponse?.value,
                httpCommunication.httpResponseRejected?.value,
                httpCommunication.isReprocessing.value,
                httpCommunication.reprocessingHttpCommunicationId?.value,
                httpCommunication.createdAt?.value,
                httpCommunication.updatedAt?.value,
                httpCommunication.deletedAt?.value,
            ),
        );
    }

    updated(httpCommunication: AuditingHttpCommunication): void
    {
        this.apply(
            new AuditingUpdatedHttpCommunicationEvent(
                httpCommunication.id?.value,
                httpCommunication.tags?.value,
                httpCommunication.event?.value,
                httpCommunication.status?.value,
                httpCommunication.method?.value,
                httpCommunication.url?.value,
                httpCommunication.httpRequest?.value,
                httpCommunication.httpRequestRejected?.value,
                httpCommunication.httpResponse?.value,
                httpCommunication.httpResponseRejected?.value,
                httpCommunication.isReprocessing?.value,
                httpCommunication.reprocessingHttpCommunicationId?.value,
                httpCommunication.createdAt?.value,
                httpCommunication.updatedAt?.value,
                httpCommunication.deletedAt?.value,
            ),
        );
    }

    deleted(httpCommunication: AuditingHttpCommunication): void
    {
        this.apply(
            new AuditingDeletedHttpCommunicationEvent(
                httpCommunication.id.value,
                httpCommunication.tags?.value,
                httpCommunication.event.value,
                httpCommunication.status?.value,
                httpCommunication.method.value,
                httpCommunication.url.value,
                httpCommunication.httpRequest?.value,
                httpCommunication.httpRequestRejected?.value,
                httpCommunication.httpResponse?.value,
                httpCommunication.httpResponseRejected?.value,
                httpCommunication.isReprocessing.value,
                httpCommunication.reprocessingHttpCommunicationId?.value,
                httpCommunication.createdAt?.value,
                httpCommunication.updatedAt?.value,
                httpCommunication.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            tags: this.tags?.value,
            event: this.event.value,
            status: this.status?.value,
            method: this.method.value,
            url: this.url.value,
            httpRequest: this.httpRequest?.value,
            httpRequestRejected: this.httpRequestRejected?.value,
            httpResponse: this.httpResponse?.value,
            httpResponseRejected: this.httpResponseRejected?.value,
            isReprocessing: this.isReprocessing.value,
            reprocessingHttpCommunicationId: this.reprocessingHttpCommunicationId?.value,
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
            tags: this.tags?.value,
            event: this.event.value,
            status: this.status?.value,
            method: this.method.value,
            url: this.url.value,
            httpRequest: this.httpRequest?.value,
            httpRequestRejected: this.httpRequestRejected?.value,
            httpResponse: this.httpResponse?.value,
            httpResponseRejected: this.httpResponseRejected?.value,
            isReprocessing: this.isReprocessing.value,
            reprocessingHttpCommunicationId: this.reprocessingHttpCommunicationId?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
