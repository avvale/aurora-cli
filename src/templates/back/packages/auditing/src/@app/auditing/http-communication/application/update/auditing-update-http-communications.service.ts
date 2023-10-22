import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AuditingHttpCommunicationId,
    AuditingHttpCommunicationTags,
    AuditingHttpCommunicationEvent,
    AuditingHttpCommunicationStatus,
    AuditingHttpCommunicationMethod,
    AuditingHttpCommunicationUrl,
    AuditingHttpCommunicationHttpRequest,
    AuditingHttpCommunicationHttpRequestRejected,
    AuditingHttpCommunicationHttpResponse,
    AuditingHttpCommunicationHttpResponseRejected,
    AuditingHttpCommunicationIsReprocessing,
    AuditingHttpCommunicationReprocessingHttpCommunicationId,
    AuditingHttpCommunicationCreatedAt,
    AuditingHttpCommunicationUpdatedAt,
    AuditingHttpCommunicationDeletedAt,
} from '../../domain/value-objects';
import { AuditingIHttpCommunicationRepository } from '../../domain/auditing-http-communication.repository';
import { AuditingHttpCommunication } from '../../domain/auditing-http-communication.aggregate';
import { AuditingAddHttpCommunicationsContextEvent } from '../events/auditing-add-http-communications-context.event';

@Injectable()
export class AuditingUpdateHttpCommunicationsService
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


        // update
        await this.repository.update(
            httpCommunication,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
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

        httpCommunicationsRegister.updated(); // apply event to model events
        httpCommunicationsRegister.commit(); // commit all events of model
    }
}
