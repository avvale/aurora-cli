import {
    AuditingCreatedHttpCommunicationEvent,
    AuditingCreatedHttpCommunicationsEvent,
    AuditingDeletedHttpCommunicationEvent,
    AuditingDeletedHttpCommunicationsEvent,
    AuditingHttpCommunication,
    AuditingUpdatedHttpCommunicationEvent,
    AuditingUpdatedHttpCommunicationsEvent,
} from '@app/auditing/http-communication';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class AuditingAddHttpCommunicationsContextEvent extends AggregateRoot {
    constructor(
        public readonly aggregateRoots: AuditingHttpCommunication[] = [],
        public readonly cQMetadata?: CQMetadata,
    ) {
        super();
    }

    *[Symbol.iterator]() {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void {
        this.apply(
            new AuditingCreatedHttpCommunicationsEvent({
                payload: this.aggregateRoots.map(
                    (httpCommunication) =>
                        new AuditingCreatedHttpCommunicationEvent({
                            payload: {
                                id: httpCommunication.id.value,
                                tags: httpCommunication.tags?.value,
                                event: httpCommunication.event.value,
                                status: httpCommunication.status?.value,
                                method: httpCommunication.method.value,
                                url: httpCommunication.url.value,
                                httpRequest:
                                    httpCommunication.httpRequest?.value,
                                httpRequestRejected:
                                    httpCommunication.httpRequestRejected
                                        ?.value,
                                httpResponse:
                                    httpCommunication.httpResponse?.value,
                                httpResponseRejected:
                                    httpCommunication.httpResponseRejected
                                        ?.value,
                                isReprocessing:
                                    httpCommunication.isReprocessing.value,
                                reprocessingHttpCommunicationId:
                                    httpCommunication
                                        .reprocessingHttpCommunicationId?.value,
                                createdAt: httpCommunication.createdAt?.value,
                                updatedAt: httpCommunication.updatedAt?.value,
                                deletedAt: httpCommunication.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updated(): void {
        this.apply(
            new AuditingUpdatedHttpCommunicationsEvent({
                payload: this.aggregateRoots.map(
                    (httpCommunication) =>
                        new AuditingUpdatedHttpCommunicationEvent({
                            payload: {
                                id: httpCommunication.id.value,
                                tags: httpCommunication.tags?.value,
                                event: httpCommunication.event.value,
                                status: httpCommunication.status?.value,
                                method: httpCommunication.method.value,
                                url: httpCommunication.url.value,
                                httpRequest:
                                    httpCommunication.httpRequest?.value,
                                httpRequestRejected:
                                    httpCommunication.httpRequestRejected
                                        ?.value,
                                httpResponse:
                                    httpCommunication.httpResponse?.value,
                                httpResponseRejected:
                                    httpCommunication.httpResponseRejected
                                        ?.value,
                                isReprocessing:
                                    httpCommunication.isReprocessing.value,
                                reprocessingHttpCommunicationId:
                                    httpCommunication
                                        .reprocessingHttpCommunicationId?.value,
                                createdAt: httpCommunication.createdAt?.value,
                                updatedAt: httpCommunication.updatedAt?.value,
                                deletedAt: httpCommunication.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    deleted(): void {
        this.apply(
            new AuditingDeletedHttpCommunicationsEvent({
                payload: this.aggregateRoots.map(
                    (httpCommunication) =>
                        new AuditingDeletedHttpCommunicationEvent({
                            payload: {
                                id: httpCommunication.id.value,
                                rowId: httpCommunication.rowId.value,
                                tags: httpCommunication.tags?.value,
                                event: httpCommunication.event.value,
                                status: httpCommunication.status?.value,
                                method: httpCommunication.method.value,
                                url: httpCommunication.url.value,
                                httpRequest:
                                    httpCommunication.httpRequest?.value,
                                httpRequestRejected:
                                    httpCommunication.httpRequestRejected
                                        ?.value,
                                httpResponse:
                                    httpCommunication.httpResponse?.value,
                                httpResponseRejected:
                                    httpCommunication.httpResponseRejected
                                        ?.value,
                                isReprocessing:
                                    httpCommunication.isReprocessing.value,
                                reprocessingHttpCommunicationId:
                                    httpCommunication
                                        .reprocessingHttpCommunicationId?.value,
                                createdAt: httpCommunication.createdAt?.value,
                                updatedAt: httpCommunication.updatedAt?.value,
                                deletedAt: httpCommunication.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
