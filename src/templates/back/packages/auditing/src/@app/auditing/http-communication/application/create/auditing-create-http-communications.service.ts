import {
    AuditingAddHttpCommunicationsContextEvent,
    AuditingHttpCommunication,
    AuditingIHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import {
    AuditingHttpCommunicationCreatedAt,
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
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AuditingCreateHttpCommunicationsService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AuditingIHttpCommunicationRepository,
    ) {}

    async main(
        payload: {
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
        }[],
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const httpCommunications = payload.map((httpCommunication) =>
            AuditingHttpCommunication.register(
                httpCommunication.id,
                undefined, // rowId
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
                new AuditingHttpCommunicationCreatedAt({
                    currentTimestamp: true,
                }),
                new AuditingHttpCommunicationUpdatedAt({
                    currentTimestamp: true,
                }),
                null, // deleteAt
            ),
        );

        // insert
        await this.repository.insert(httpCommunications, {
            insertOptions: cQMetadata?.repositoryOptions,
        });

        // create AddHttpCommunicationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const httpCommunicationsRegistered = this.publisher.mergeObjectContext(
            new AuditingAddHttpCommunicationsContextEvent(
                httpCommunications,
                cQMetadata,
            ),
        );

        httpCommunicationsRegistered.created(); // apply event to model events
        httpCommunicationsRegistered.commit(); // commit all events of model
    }
}
