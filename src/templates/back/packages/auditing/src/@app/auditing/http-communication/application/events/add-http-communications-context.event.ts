import { AggregateRoot } from '@nestjs/cqrs';
import { AuditingHttpCommunication } from '../../domain/http-communication.aggregate';
import { CreatedHttpCommunicationEvent } from './created-http-communication.event';
import { CreatedHttpCommunicationsEvent } from './created-http-communications.event';
import { UpdatedHttpCommunicationEvent } from './updated-http-communication.event';
import { UpdatedHttpCommunicationsEvent } from './updated-http-communications.event';
import { DeletedHttpCommunicationEvent } from './deleted-http-communication.event';
import { DeletedHttpCommunicationsEvent } from './deleted-http-communications.event';

export class AddHttpCommunicationsContextEvent extends AggregateRoot
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
            new CreatedHttpCommunicationsEvent(
                this.aggregateRoots.map(httpCommunication =>
                    new CreatedHttpCommunicationEvent(
                        httpCommunication.id.value,
                        httpCommunication.code?.value,
                        httpCommunication.event.value,
                        httpCommunication.status?.value,
                        httpCommunication.method.value,
                        httpCommunication.url.value,
                        httpCommunication.httpRequest?.value,
                        httpCommunication.httpRequestRejected?.value,
                        httpCommunication.httpResponse?.value,
                        httpCommunication.httpResponseRejected?.value,
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
            new UpdatedHttpCommunicationsEvent(
                this.aggregateRoots.map(httpCommunication =>
                    new UpdatedHttpCommunicationEvent(
                        httpCommunication.id.value,
                        httpCommunication.code?.value,
                        httpCommunication.event.value,
                        httpCommunication.status?.value,
                        httpCommunication.method.value,
                        httpCommunication.url.value,
                        httpCommunication.httpRequest?.value,
                        httpCommunication.httpRequestRejected?.value,
                        httpCommunication.httpResponse?.value,
                        httpCommunication.httpResponseRejected?.value,
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
            new DeletedHttpCommunicationsEvent(
                this.aggregateRoots.map(httpCommunication =>
                    new DeletedHttpCommunicationEvent(
                        httpCommunication.id.value,
                        httpCommunication.code?.value,
                        httpCommunication.event.value,
                        httpCommunication.status?.value,
                        httpCommunication.method.value,
                        httpCommunication.url.value,
                        httpCommunication.httpRequest?.value,
                        httpCommunication.httpRequestRejected?.value,
                        httpCommunication.httpResponse?.value,
                        httpCommunication.httpResponseRejected?.value,
                        httpCommunication.createdAt?.value,
                        httpCommunication.updatedAt?.value,
                        httpCommunication.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}