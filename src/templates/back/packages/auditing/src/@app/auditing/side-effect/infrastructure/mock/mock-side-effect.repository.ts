import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurora-ts/core';
import { ISideEffectRepository } from '@app/auditing/side-effect/domain/side-effect.repository';
import {
    SideEffectId,
    SideEffectTags,
    SideEffectModelPath,
    SideEffectModelName,
    SideEffectOperationId,
    SideEffectOperationSort,
    SideEffectAccountId,
    SideEffectEmail,
    SideEffectEvent,
    SideEffectAuditableId,
    SideEffectOldValue,
    SideEffectNewValue,
    SideEffectIp,
    SideEffectMethod,
    SideEffectBaseUrl,
    SideEffectParams,
    SideEffectQuery,
    SideEffectBody,
    SideEffectUserAgent,
    SideEffectIsRollback,
    SideEffectRollbackSideEffectId,
    SideEffectCreatedAt,
    SideEffectUpdatedAt,
    SideEffectDeletedAt,
} from '@app/auditing/side-effect/domain/value-objects';
import { AuditingSideEffect } from '../../domain/side-effect.aggregate';
import { sideEffects } from './mock-side-effect.data';

@Injectable()
export class MockSideEffectRepository extends MockRepository<AuditingSideEffect> implements ISideEffectRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AuditingSideEffect';
    public collectionSource: AuditingSideEffect[];
    public deletedAtInstance: SideEffectDeletedAt = new SideEffectDeletedAt(null);

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

        for (const itemCollection of <any[]>sideEffects)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AuditingSideEffect.register(
                new SideEffectId(itemCollection.id),
                new SideEffectTags(itemCollection.tags),
                new SideEffectModelPath(itemCollection.modelPath),
                new SideEffectModelName(itemCollection.modelName),
                new SideEffectOperationId(itemCollection.operationId),
                new SideEffectOperationSort(itemCollection.operationSort),
                new SideEffectAccountId(itemCollection.accountId),
                new SideEffectEmail(itemCollection.email),
                new SideEffectEvent(itemCollection.event),
                new SideEffectAuditableId(itemCollection.auditableId),
                new SideEffectOldValue(itemCollection.oldValue),
                new SideEffectNewValue(itemCollection.newValue),
                new SideEffectIp(itemCollection.ip),
                new SideEffectMethod(itemCollection.method),
                new SideEffectBaseUrl(itemCollection.baseUrl),
                new SideEffectParams(itemCollection.params),
                new SideEffectQuery(itemCollection.query),
                new SideEffectBody(itemCollection.body),
                new SideEffectUserAgent(itemCollection.userAgent),
                new SideEffectIsRollback(itemCollection.isRollback),
                new SideEffectRollbackSideEffectId(itemCollection.rollbackSideEffectId),
                new SideEffectCreatedAt(itemCollection.createdAt),
                new SideEffectUpdatedAt(itemCollection.updatedAt),
                new SideEffectDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}