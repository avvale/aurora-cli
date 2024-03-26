import { AuditingCreatedHttpCommunicationEvent, AuditingCreatedHttpCommunicationsEvent, AuditingDeletedHttpCommunicationEvent, AuditingDeletedHttpCommunicationsEvent, AuditingHttpCommunication, AuditingUpdatedAndIncrementedHttpCommunicationEvent, AuditingUpdatedAndIncrementedHttpCommunicationsEvent, AuditingUpdatedHttpCommunicationEvent, AuditingUpdatedHttpCommunicationsEvent } from '@app/auditing/http-communication';
import { AggregateRoot } from '@nestjs/cqrs';

export class AuditingAddHttpCommunicationsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AuditingHttpCommunication[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new AuditingCreatedHttpCommunicationsEvent(
                this.aggregateRoots.map(httpCommunication =>
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
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AuditingUpdatedHttpCommunicationsEvent(
                this.aggregateRoots.map(httpCommunication =>
                    new AuditingUpdatedHttpCommunicationEvent(
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
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new AuditingUpdatedAndIncrementedHttpCommunicationsEvent(
                this.aggregateRoots.map(httpCommunication =>
                    new AuditingUpdatedAndIncrementedHttpCommunicationEvent(
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
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AuditingDeletedHttpCommunicationsEvent(
                this.aggregateRoots.map(httpCommunication =>
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
                ),
            ),
        );
    }
}
