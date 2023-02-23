import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurora-ts/core';
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
import { AuditingHttpCommunication } from '../../domain/http-communication.aggregate';
import { httpCommunications } from '../seeds/http-communication.seed';
import * as _ from 'lodash';

@Injectable()
export class MockHttpCommunicationSeeder extends MockSeeder<AuditingHttpCommunication>
{
    public collectionSource: AuditingHttpCommunication[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (const httpCommunication of _.orderBy(httpCommunications, ['id']))
        {
            this.collectionSource.push(
                AuditingHttpCommunication.register(
                    new HttpCommunicationId(httpCommunication.id),
                    new HttpCommunicationTags(httpCommunication.tags),
                    new HttpCommunicationEvent(httpCommunication.event),
                    new HttpCommunicationStatus(httpCommunication.status),
                    new HttpCommunicationMethod(httpCommunication.method),
                    new HttpCommunicationUrl(httpCommunication.url),
                    new HttpCommunicationHttpRequest(httpCommunication.httpRequest),
                    new HttpCommunicationHttpRequestRejected(httpCommunication.httpRequestRejected),
                    new HttpCommunicationHttpResponse(httpCommunication.httpResponse),
                    new HttpCommunicationHttpResponseRejected(httpCommunication.httpResponseRejected),
                    new HttpCommunicationIsReprocessing(httpCommunication.isReprocessing),
                    new HttpCommunicationReprocessingHttpCommunicationId(httpCommunication.reprocessingHttpCommunicationId),
                    new HttpCommunicationCreatedAt({ currentTimestamp: true }),
                    new HttpCommunicationUpdatedAt({ currentTimestamp: true }),
                    new HttpCommunicationDeletedAt(null),
                ),
            );
        }
    }
}