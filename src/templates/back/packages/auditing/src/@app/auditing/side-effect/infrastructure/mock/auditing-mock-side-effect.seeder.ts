import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { AuditingSideEffect } from '../../domain/auditing-side-effect.aggregate';
import { auditingMockSideEffectData } from './auditing-mock-side-effect.data';
import * as _ from 'lodash';

@Injectable()
export class AuditingMockSideEffectSeeder extends MockSeeder<AuditingSideEffect>
{
    public collectionSource: AuditingSideEffect[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const sideEffect of _.orderBy(auditingMockSideEffectData, ['id']))
        {
            this.collectionSource.push(
                AuditingSideEffect.register(
                    new AuditingSideEffectId(sideEffect.id),
                    new AuditingSideEffectTags(sideEffect.tags),
                    new AuditingSideEffectModelPath(sideEffect.modelPath),
                    new AuditingSideEffectModelName(sideEffect.modelName),
                    new AuditingSideEffectOperationId(sideEffect.operationId),
                    new AuditingSideEffectOperationSort(sideEffect.operationSort),
                    new AuditingSideEffectAccountId(sideEffect.accountId),
                    new AuditingSideEffectEmail(sideEffect.email),
                    new AuditingSideEffectEvent(sideEffect.event),
                    new AuditingSideEffectAuditableId(sideEffect.auditableId),
                    new AuditingSideEffectOldValue(sideEffect.oldValue),
                    new AuditingSideEffectNewValue(sideEffect.newValue),
                    new AuditingSideEffectIp(sideEffect.ip),
                    new AuditingSideEffectMethod(sideEffect.method),
                    new AuditingSideEffectBaseUrl(sideEffect.baseUrl),
                    new AuditingSideEffectParams(sideEffect.params),
                    new AuditingSideEffectQuery(sideEffect.query),
                    new AuditingSideEffectBody(sideEffect.body),
                    new AuditingSideEffectUserAgent(sideEffect.userAgent),
                    new AuditingSideEffectIsRollback(sideEffect.isRollback),
                    new AuditingSideEffectRollbackSideEffectId(sideEffect.rollbackSideEffectId),
                    new AuditingSideEffectCreatedAt({ currentTimestamp: true }),
                    new AuditingSideEffectUpdatedAt({ currentTimestamp: true }),
                    new AuditingSideEffectDeletedAt(null),
                ),
            );
        }
    }
}
