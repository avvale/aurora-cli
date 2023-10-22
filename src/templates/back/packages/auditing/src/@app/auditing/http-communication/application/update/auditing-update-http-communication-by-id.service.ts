import { AuditingHttpCommunication, AuditingIHttpCommunicationRepository } from '@app/auditing/http-communication';
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
export class AuditingUpdateHttpCommunicationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AuditingIHttpCommunicationRepository,
    ) {}

    async main(
        payload: {
            id: AuditingHttpCommunicationId;
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

        // update by id
        await this.repository.updateById(
            httpCommunication,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const httpCommunicationRegister = this.publisher.mergeObjectContext(
            httpCommunication,
        );

        httpCommunicationRegister.updated(httpCommunication); // apply event to model events
        httpCommunicationRegister.commit(); // commit all events of model
    }
}
