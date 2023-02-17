import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from '@aurora-ts/core';
import { AuditingHttpCommunication } from './http-communication.aggregate';
import { HttpCommunicationResponse } from './http-communication.response';
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
} from './value-objects';

export class HttpCommunicationMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param httpCommunication
     */
    mapModelToAggregate(httpCommunication: LiteralObject, cQMetadata?: CQMetadata): AuditingHttpCommunication
    {
        if (!httpCommunication) return;

        return this.makeAggregate(httpCommunication, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param httpCommunications
     */
    mapModelsToAggregates(httpCommunications: LiteralObject[], cQMetadata?: CQMetadata): AuditingHttpCommunication[]
    {
        if (!Array.isArray(httpCommunications)) return;

        return httpCommunications.map(httpCommunication  => this.makeAggregate(httpCommunication, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param httpCommunication
     */
    mapAggregateToResponse(httpCommunication: AuditingHttpCommunication): HttpCommunicationResponse
    {
        return this.makeResponse(httpCommunication);
    }

    /**
     * Map array of aggregates to array responses
     * @param httpCommunications
     */
    mapAggregatesToResponses(httpCommunications: AuditingHttpCommunication[]): HttpCommunicationResponse[]
    {
        if (!Array.isArray(httpCommunications)) return;

        return httpCommunications.map(httpCommunication => this.makeResponse(httpCommunication));
    }

    private makeAggregate(httpCommunication: LiteralObject, cQMetadata?: CQMetadata): AuditingHttpCommunication
    {
        return AuditingHttpCommunication.register(
            new HttpCommunicationId(httpCommunication.id, { undefinable: true }),
            new HttpCommunicationCode(httpCommunication.code, { undefinable: true }),
            new HttpCommunicationEvent(httpCommunication.event, { undefinable: true }),
            new HttpCommunicationStatus(httpCommunication.status, { undefinable: true }),
            new HttpCommunicationMethod(httpCommunication.method, { undefinable: true }),
            new HttpCommunicationUrl(httpCommunication.url, { undefinable: true }),
            new HttpCommunicationHttpRequest(httpCommunication.httpRequest, { undefinable: true }),
            new HttpCommunicationHttpRequestRejected(httpCommunication.httpRequestRejected, { undefinable: true }),
            new HttpCommunicationHttpResponse(httpCommunication.httpResponse, { undefinable: true }),
            new HttpCommunicationHttpResponseRejected(httpCommunication.httpResponseRejected, { undefinable: true }),
            new HttpCommunicationCreatedAt(httpCommunication.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new HttpCommunicationUpdatedAt(httpCommunication.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new HttpCommunicationDeletedAt(httpCommunication.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(httpCommunication: AuditingHttpCommunication): HttpCommunicationResponse
    {
        if (!httpCommunication) return;

        return new HttpCommunicationResponse(
            httpCommunication.id.value,
            httpCommunication.code.value,
            httpCommunication.event.value,
            httpCommunication.status.value,
            httpCommunication.method.value,
            httpCommunication.url.value,
            httpCommunication.httpRequest.value,
            httpCommunication.httpRequestRejected.value,
            httpCommunication.httpResponse.value,
            httpCommunication.httpResponseRejected.value,
            httpCommunication.createdAt.value,
            httpCommunication.updatedAt.value,
            httpCommunication.deletedAt.value,
        );
    }
}