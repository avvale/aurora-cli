import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurora-ts/core';
import {
    HttpCommunicationId,
    HttpCommunicationTags,
    HttpCommunicationEvent,
    HttpCommunicationStatus,
    HttpCommunicationMethod,
    HttpCommunicationUrl,
    HttpCommunicationHttpRequest,
    HttpCommunicationHttpRequestRejected,
    HttpCommunicationHttpResponse,
    HttpCommunicationHttpResponseRejected,
    HttpCommunicationIsReprocessing,
    HttpCommunicationReprocessingHttpCommunicationId,
    HttpCommunicationCreatedAt,
    HttpCommunicationUpdatedAt,
    HttpCommunicationDeletedAt,
} from '../../domain/value-objects';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { AuditingHttpCommunication } from '../../domain/http-communication.aggregate';
import { AddHttpCommunicationsContextEvent } from '../events/add-http-communications-context.event';

@Injectable()
export class CreateHttpCommunicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IHttpCommunicationRepository,
    ) {}

    async main(
        httpCommunications: {
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
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateHttpCommunications = httpCommunications.map(httpCommunication => AuditingHttpCommunication.register(
            httpCommunication.id,
            httpCommunication.tags,
            httpCommunication.event,
            httpCommunication.status,
            httpCommunication.method,
            httpCommunication.url,
            httpCommunication.httpRequest,
            httpCommunication.httpRequestRejected,
            httpCommunication.httpResponse,
            httpCommunication.httpResponseRejected,
            httpCommunication.isReprocessing,
            httpCommunication.reprocessingHttpCommunicationId,
            new HttpCommunicationCreatedAt({ currentTimestamp: true }),
            new HttpCommunicationUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateHttpCommunications, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddHttpCommunicationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const httpCommunicationsRegistered = this.publisher.mergeObjectContext(new AddHttpCommunicationsContextEvent(aggregateHttpCommunications));

        httpCommunicationsRegistered.created(); // apply event to model events
        httpCommunicationsRegistered.commit(); // commit all events of model
    }
}