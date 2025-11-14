import {
    AuditingHttpCommunication,
    AuditingIHttpCommunicationRepository,
    auditingMockHttpCommunicationData,
} from '@app/auditing/http-communication';
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
    AuditingHttpCommunicationRowId,
    AuditingHttpCommunicationStatus,
    AuditingHttpCommunicationTags,
    AuditingHttpCommunicationUpdatedAt,
    AuditingHttpCommunicationUrl,
} from '@app/auditing/http-communication/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingMockHttpCommunicationRepository
    extends MockRepository<AuditingHttpCommunication>
    implements AuditingIHttpCommunicationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AuditingHttpCommunication';
    public collectionSource: AuditingHttpCommunication[];

    constructor() {
        super();
        this.createSourceMockData();
    }

    public reset(): void {
        this.createSourceMockData();
    }

    private createSourceMockData(): void {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>auditingMockHttpCommunicationData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                AuditingHttpCommunication.register(
                    new AuditingHttpCommunicationId(itemCollection.id),
                    new AuditingHttpCommunicationRowId(itemCollection.rowId),
                    new AuditingHttpCommunicationTags(itemCollection.tags),
                    new AuditingHttpCommunicationEvent(itemCollection.event),
                    new AuditingHttpCommunicationStatus(itemCollection.status),
                    new AuditingHttpCommunicationMethod(itemCollection.method),
                    new AuditingHttpCommunicationUrl(itemCollection.url),
                    new AuditingHttpCommunicationHttpRequest(
                        itemCollection.httpRequest,
                    ),
                    new AuditingHttpCommunicationHttpRequestRejected(
                        itemCollection.httpRequestRejected,
                    ),
                    new AuditingHttpCommunicationHttpResponse(
                        itemCollection.httpResponse,
                    ),
                    new AuditingHttpCommunicationHttpResponseRejected(
                        itemCollection.httpResponseRejected,
                    ),
                    new AuditingHttpCommunicationIsReprocessing(
                        itemCollection.isReprocessing,
                    ),
                    new AuditingHttpCommunicationReprocessingHttpCommunicationId(
                        itemCollection.reprocessingHttpCommunicationId,
                    ),
                    new AuditingHttpCommunicationCreatedAt(
                        itemCollection.createdAt,
                    ),
                    new AuditingHttpCommunicationUpdatedAt(
                        itemCollection.updatedAt,
                    ),
                    new AuditingHttpCommunicationDeletedAt(
                        itemCollection.deletedAt,
                    ),
                ),
            );
        }
    }
}
