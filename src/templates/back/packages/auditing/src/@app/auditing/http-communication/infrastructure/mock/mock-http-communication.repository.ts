import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurora-ts/core';
import { IHttpCommunicationRepository } from '@app/auditing/http-communication/domain/http-communication.repository';
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
} from '@app/auditing/http-communication/domain/value-objects';
import { AuditingHttpCommunication } from '../../domain/http-communication.aggregate';
import { httpCommunications } from '../seeds/http-communication.seed';

@Injectable()
export class MockHttpCommunicationRepository extends MockRepository<AuditingHttpCommunication> implements IHttpCommunicationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AuditingHttpCommunication';
    public collectionSource: AuditingHttpCommunication[];
    public deletedAtInstance: HttpCommunicationDeletedAt = new HttpCommunicationDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>httpCommunications)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AuditingHttpCommunication.register(
                new HttpCommunicationId(itemCollection.id),
                new HttpCommunicationCode(itemCollection.code),
                new HttpCommunicationEvent(itemCollection.event),
                new HttpCommunicationStatus(itemCollection.status),
                new HttpCommunicationMethod(itemCollection.method),
                new HttpCommunicationUrl(itemCollection.url),
                new HttpCommunicationHttpRequest(itemCollection.httpRequest),
                new HttpCommunicationHttpRequestRejected(itemCollection.httpRequestRejected),
                new HttpCommunicationHttpResponse(itemCollection.httpResponse),
                new HttpCommunicationHttpResponseRejected(itemCollection.httpResponseRejected),
                new HttpCommunicationCreatedAt(itemCollection.createdAt),
                new HttpCommunicationUpdatedAt(itemCollection.updatedAt),
                new HttpCommunicationDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}