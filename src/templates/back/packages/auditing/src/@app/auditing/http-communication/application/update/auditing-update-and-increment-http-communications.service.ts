import { AuditingAddHttpCommunicationsContextEvent, AuditingHttpCommunication, AuditingIHttpCommunicationRepository } from '@app/auditing/http-communication';
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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AuditingUpdateAndIncrementHttpCommunicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AuditingIHttpCommunicationRepository,
    ) {}

    async main(
        payload: {
            id?: AuditingHttpCommunicationId;
            tags?: AuditingHttpCommunicationTags;
            event?: AuditingHttpCommunicationEvent;
            status?: AuditingHttpCommunicationStatus;
            method?: AuditingHttpCommunicationMethod;
            url?: AuditingHttpCommunicationUrl;
            httpRequest?: AuditingHttpCommunicationHttpRequest;
            httpRequestRejected?: AuditingHttpCommunicationHttpRequestRejected;
            httpResponse?: AuditingHttpCommunicationHttpResponse;
            httpResponseRejected?: AuditingHttpCommunicationHttpResponseRejected;
            isReprocessing?: AuditingHttpCommunicationIsReprocessing;
            reprocessingHttpCommunicationId?: AuditingHttpCommunicationReprocessingHttpCommunicationId;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const httpCommunication = AuditingHttpCommunication.register(
            payload.id,
            payload.tags,
            payload.event,
            payload.status,
            payload.method,
            payload.url,
            payload.httpRequest,
            payload.httpRequestRejected,
            payload.httpResponse,
            payload.httpResponseRejected,
            payload.isReprocessing,
            payload.reprocessingHttpCommunicationId,
            null, // createdAt
            new AuditingHttpCommunicationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update and increment
        await this.repository.updateAndIncrement(
            httpCommunication,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const httpCommunications = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const httpCommunicationsRegister = this.publisher.mergeObjectContext(
            new AuditingAddHttpCommunicationsContextEvent(httpCommunications),
        );

        httpCommunicationsRegister.updatedAndIncremented(); // apply event to model events
        httpCommunicationsRegister.commit(); // commit all events of model
    }
}
