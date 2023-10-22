import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AuditingIHttpCommunicationRepository } from '@app/auditing/http-communication/domain/auditing-http-communication.repository';
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
} from '@app/auditing/http-communication/domain/value-objects';
import { AuditingHttpCommunication } from '../../domain/auditing-http-communication.aggregate';
import { auditingMockHttpCommunicationData } from './auditing-mock-http-communication.data';

@Injectable()
export class AuditingMockHttpCommunicationRepository extends MockRepository<AuditingHttpCommunication> implements AuditingIHttpCommunicationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AuditingHttpCommunication';
    public collectionSource: AuditingHttpCommunication[];
    public deletedAtInstance: AuditingHttpCommunicationDeletedAt = new AuditingHttpCommunicationDeletedAt(null);

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

        for (const itemCollection of <any[]>auditingMockHttpCommunicationData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AuditingHttpCommunication.register(
                new AuditingHttpCommunicationId(itemCollection.id),
                new AuditingHttpCommunicationTags(itemCollection.tags),
                new AuditingHttpCommunicationEvent(itemCollection.event),
                new AuditingHttpCommunicationStatus(itemCollection.status),
                new AuditingHttpCommunicationMethod(itemCollection.method),
                new AuditingHttpCommunicationUrl(itemCollection.url),
                new AuditingHttpCommunicationHttpRequest(itemCollection.httpRequest),
                new AuditingHttpCommunicationHttpRequestRejected(itemCollection.httpRequestRejected),
                new AuditingHttpCommunicationHttpResponse(itemCollection.httpResponse),
                new AuditingHttpCommunicationHttpResponseRejected(itemCollection.httpResponseRejected),
                new AuditingHttpCommunicationIsReprocessing(itemCollection.isReprocessing),
                new AuditingHttpCommunicationReprocessingHttpCommunicationId(itemCollection.reprocessingHttpCommunicationId),
                new AuditingHttpCommunicationCreatedAt(itemCollection.createdAt),
                new AuditingHttpCommunicationUpdatedAt(itemCollection.updatedAt),
                new AuditingHttpCommunicationDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
