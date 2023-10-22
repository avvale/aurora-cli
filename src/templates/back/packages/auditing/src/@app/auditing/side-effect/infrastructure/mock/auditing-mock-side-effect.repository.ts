import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AuditingISideEffectRepository } from '@app/auditing/side-effect/domain/auditing-side-effect.repository';
import {
    AuditingSideEffectId,
    AuditingSideEffectTags,
    AuditingSideEffectModelPath,
    AuditingSideEffectModelName,
    AuditingSideEffectOperationId,
    AuditingSideEffectOperationSort,
    AuditingSideEffectAccountId,
    AuditingSideEffectEmail,
    AuditingSideEffectEvent,
    AuditingSideEffectAuditableId,
    AuditingSideEffectOldValue,
    AuditingSideEffectNewValue,
    AuditingSideEffectIp,
    AuditingSideEffectMethod,
    AuditingSideEffectBaseUrl,
    AuditingSideEffectParams,
    AuditingSideEffectQuery,
    AuditingSideEffectBody,
    AuditingSideEffectUserAgent,
    AuditingSideEffectIsRollback,
    AuditingSideEffectRollbackSideEffectId,
    AuditingSideEffectCreatedAt,
    AuditingSideEffectUpdatedAt,
    AuditingSideEffectDeletedAt,
} from '@app/auditing/side-effect/domain/value-objects';
import { AuditingSideEffect } from '../../domain/auditing-side-effect.aggregate';
import { auditingMockSideEffectData } from './auditing-mock-side-effect.data';

@Injectable()
export class AuditingMockSideEffectRepository extends MockRepository<AuditingSideEffect> implements AuditingISideEffectRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AuditingSideEffect';
    public collectionSource: AuditingSideEffect[];
    public deletedAtInstance: AuditingSideEffectDeletedAt = new AuditingSideEffectDeletedAt(null);

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

        for (const itemCollection of <any[]>auditingMockSideEffectData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AuditingSideEffect.register(
                new AuditingSideEffectId(itemCollection.id),
                new AuditingSideEffectTags(itemCollection.tags),
                new AuditingSideEffectModelPath(itemCollection.modelPath),
                new AuditingSideEffectModelName(itemCollection.modelName),
                new AuditingSideEffectOperationId(itemCollection.operationId),
                new AuditingSideEffectOperationSort(itemCollection.operationSort),
                new AuditingSideEffectAccountId(itemCollection.accountId),
                new AuditingSideEffectEmail(itemCollection.email),
                new AuditingSideEffectEvent(itemCollection.event),
                new AuditingSideEffectAuditableId(itemCollection.auditableId),
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
                new AuditingSideEffectRollbackSideEffectId(itemCollection.rollbackSideEffectId),
                new AuditingSideEffectCreatedAt(itemCollection.createdAt),
                new AuditingSideEffectUpdatedAt(itemCollection.updatedAt),
                new AuditingSideEffectDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
