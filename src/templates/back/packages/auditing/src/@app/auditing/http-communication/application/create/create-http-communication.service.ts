import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurorajs.dev/core';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { AuditingHttpCommunication } from '../../domain/http-communication.aggregate';
import {
    HttpCommunicationCreatedAt,
    HttpCommunicationDeletedAt,
    HttpCommunicationEvent,
    HttpCommunicationHttpRequest,
    HttpCommunicationHttpRequestRejected,
    HttpCommunicationHttpResponse,
    HttpCommunicationHttpResponseRejected,
    HttpCommunicationId,
    HttpCommunicationIsReprocessing,
    HttpCommunicationMethod,
    HttpCommunicationReprocessingHttpCommunicationId,
    HttpCommunicationStatus,
    HttpCommunicationTags,
    HttpCommunicationUpdatedAt,
    HttpCommunicationUrl,
} from '../../domain/value-objects';

@Injectable()
export class CreateHttpCommunicationService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IHttpCommunicationRepository,
    ) {}

    async main(
        payload: {
            id: HttpCommunicationId;
            tags: HttpCommunicationTags;
            event: HttpCommunicationEvent;
            status: HttpCommunicationStatus;
            method: HttpCommunicationMethod;
            url: HttpCommunicationUrl;
            httpRequest: HttpCommunicationHttpRequest;
            httpRequestRejected: HttpCommunicationHttpRequestRejected;
            httpResponse: HttpCommunicationHttpResponse;
            httpResponseRejected: HttpCommunicationHttpResponseRejected;
            isReprocessing: HttpCommunicationIsReprocessing;
            reprocessingHttpCommunicationId: HttpCommunicationReprocessingHttpCommunicationId;
        },
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
            new HttpCommunicationCreatedAt({ currentTimestamp: true }),
            new HttpCommunicationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(httpCommunication, { createOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const httpCommunicationRegister = this.publisher.mergeObjectContext(
            httpCommunication,
        );

        httpCommunicationRegister.created(httpCommunication); // apply event to model events
        httpCommunicationRegister.commit(); // commit all events of model
    }
}