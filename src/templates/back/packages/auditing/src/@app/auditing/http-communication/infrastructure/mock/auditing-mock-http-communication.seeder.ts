import { AuditingHttpCommunication, auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
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
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class AuditingMockHttpCommunicationSeeder extends MockSeeder<AuditingHttpCommunication>
{
    public collectionSource: AuditingHttpCommunication[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const httpCommunication of _.orderBy(auditingMockHttpCommunicationData, ['id']))
        {
            this.collectionSource.push(
                AuditingHttpCommunication.register(
                    new AuditingHttpCommunicationId(httpCommunication.id),
                    new AuditingHttpCommunicationTags(httpCommunication.tags),
                    new AuditingHttpCommunicationEvent(httpCommunication.event),
                    new AuditingHttpCommunicationStatus(httpCommunication.status),
                    new AuditingHttpCommunicationMethod(httpCommunication.method),
                    new AuditingHttpCommunicationUrl(httpCommunication.url),
                    new AuditingHttpCommunicationHttpRequest(httpCommunication.httpRequest),
                    new AuditingHttpCommunicationHttpRequestRejected(httpCommunication.httpRequestRejected),
                    new AuditingHttpCommunicationHttpResponse(httpCommunication.httpResponse),
                    new AuditingHttpCommunicationHttpResponseRejected(httpCommunication.httpResponseRejected),
                    new AuditingHttpCommunicationIsReprocessing(httpCommunication.isReprocessing),
                    new AuditingHttpCommunicationReprocessingHttpCommunicationId(httpCommunication.reprocessingHttpCommunicationId),
                    new AuditingHttpCommunicationCreatedAt({ currentTimestamp: true }),
                    new AuditingHttpCommunicationUpdatedAt({ currentTimestamp: true }),
                    new AuditingHttpCommunicationDeletedAt(null),
                ),
            );
        }
    }
}
