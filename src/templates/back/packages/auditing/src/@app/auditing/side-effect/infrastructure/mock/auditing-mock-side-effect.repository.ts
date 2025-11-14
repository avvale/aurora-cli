import {
    AuditingISideEffectRepository,
    auditingMockSideEffectData,
    AuditingSideEffect,
} from '@app/auditing/side-effect';
import {
    AuditingSideEffectAccountId,
    AuditingSideEffectAuditableId,
    AuditingSideEffectBaseUrl,
    AuditingSideEffectBody,
    AuditingSideEffectCreatedAt,
    AuditingSideEffectDeletedAt,
    AuditingSideEffectEmail,
    AuditingSideEffectEvent,
    AuditingSideEffectId,
    AuditingSideEffectIp,
    AuditingSideEffectIsRollback,
    AuditingSideEffectMethod,
    AuditingSideEffectModelName,
    AuditingSideEffectModelPath,
    AuditingSideEffectNewValue,
    AuditingSideEffectOldValue,
    AuditingSideEffectOperationId,
    AuditingSideEffectOperationSort,
    AuditingSideEffectParams,
    AuditingSideEffectQuery,
    AuditingSideEffectRollbackSideEffectId,
    AuditingSideEffectRowId,
    AuditingSideEffectTags,
    AuditingSideEffectUpdatedAt,
    AuditingSideEffectUserAgent,
} from '@app/auditing/side-effect/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingMockSideEffectRepository
    extends MockRepository<AuditingSideEffect>
    implements AuditingISideEffectRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AuditingSideEffect';
    public collectionSource: AuditingSideEffect[];

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

        for (const itemCollection of <any[]>auditingMockSideEffectData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                AuditingSideEffect.register(
                    new AuditingSideEffectId(itemCollection.id),
                    new AuditingSideEffectRowId(itemCollection.rowId),
                    new AuditingSideEffectTags(itemCollection.tags),
                    new AuditingSideEffectModelPath(itemCollection.modelPath),
                    new AuditingSideEffectModelName(itemCollection.modelName),
                    new AuditingSideEffectOperationId(
                        itemCollection.operationId,
                    ),
                    new AuditingSideEffectOperationSort(
                        itemCollection.operationSort,
                    ),
                    new AuditingSideEffectAccountId(itemCollection.accountId),
                    new AuditingSideEffectEmail(itemCollection.email),
                    new AuditingSideEffectEvent(itemCollection.event),
                    new AuditingSideEffectAuditableId(
                        itemCollection.auditableId,
                    ),
                    new AuditingSideEffectOldValue(itemCollection.oldValue),
                    new AuditingSideEffectNewValue(itemCollection.newValue),
                    new AuditingSideEffectIp(itemCollection.ip),
                    new AuditingSideEffectMethod(itemCollection.method),
                    new AuditingSideEffectBaseUrl(itemCollection.baseUrl),
                    new AuditingSideEffectParams(itemCollection.params),
                    new AuditingSideEffectQuery(itemCollection.query),
                    new AuditingSideEffectBody(itemCollection.body),
                    new AuditingSideEffectUserAgent(itemCollection.userAgent),
                    new AuditingSideEffectIsRollback(itemCollection.isRollback),
                    new AuditingSideEffectRollbackSideEffectId(
                        itemCollection.rollbackSideEffectId,
                    ),
                    new AuditingSideEffectCreatedAt(itemCollection.createdAt),
                    new AuditingSideEffectUpdatedAt(itemCollection.updatedAt),
                    new AuditingSideEffectDeletedAt(itemCollection.deletedAt),
                ),
            );
        }
    }
}
