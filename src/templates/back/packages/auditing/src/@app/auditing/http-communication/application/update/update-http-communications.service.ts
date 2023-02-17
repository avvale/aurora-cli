import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import {
    HttpCommunicationId,
    HttpCommunicationCode,
    HttpCommunicationEvent,
    HttpCommunicationStatus,
    HttpCommunicationMethod,
    HttpCommunicationUrl,
    HttpCommunicationHttpRequest,
    HttpCommunicationHttpRequestRejected,
    HttpCommunicationHttpResponse,
    HttpCommunicationHttpResponseRejected,
    HttpCommunicationCreatedAt,
    HttpCommunicationUpdatedAt,
    HttpCommunicationDeletedAt,
} from '../../domain/value-objects';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { AuditingHttpCommunication } from '../../domain/http-communication.aggregate';
import { AddHttpCommunicationsContextEvent } from '../events/add-http-communications-context.event';

@Injectable()
export class UpdateHttpCommunicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IHttpCommunicationRepository,
    ) {}

    async main(
        payload: {
            id?: HttpCommunicationId;
            code?: HttpCommunicationCode;
            event?: HttpCommunicationEvent;
            status?: HttpCommunicationStatus;
            method?: HttpCommunicationMethod;
            url?: HttpCommunicationUrl;
            httpRequest?: HttpCommunicationHttpRequest;
            httpRequestRejected?: HttpCommunicationHttpRequestRejected;
            httpResponse?: HttpCommunicationHttpResponse;
            httpResponseRejected?: HttpCommunicationHttpResponseRejected;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const httpCommunication = AuditingHttpCommunication.register(
            payload.id,
            payload.code,
            payload.event,
            payload.status,
            payload.method,
            payload.url,
            payload.httpRequest,
            payload.httpRequestRejected,
            payload.httpResponse,
            payload.httpResponseRejected,
            null, // createdAt
            new HttpCommunicationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(httpCommunication, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const httpCommunications = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const httpCommunicationsRegister = this.publisher.mergeObjectContext(
            new AddHttpCommunicationsContextEvent(httpCommunications),
        );

        httpCommunicationsRegister.updated(); // apply event to model events
        httpCommunicationsRegister.commit(); // commit all events of model
    }
}