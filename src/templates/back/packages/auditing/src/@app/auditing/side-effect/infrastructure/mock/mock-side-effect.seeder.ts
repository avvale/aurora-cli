import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurora-ts/core';
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
} from '../../domain/value-objects';
import { AuditingSideEffect } from '../../domain/side-effect.aggregate';
import { sideEffects } from './mock-side-effect.data';
import * as _ from 'lodash';

@Injectable()
export class MockSideEffectSeeder extends MockSeeder<AuditingSideEffect>
{
    public collectionSource: AuditingSideEffect[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (const sideEffect of _.orderBy(sideEffects, ['id']))
        {
            this.collectionSource.push(
                AuditingSideEffect.register(
                    new SideEffectId(sideEffect.id),
                    new SideEffectTags(sideEffect.tags),
                    new SideEffectModelPath(sideEffect.modelPath),
                    new SideEffectModelName(sideEffect.modelName),
                    new SideEffectOperationId(sideEffect.operationId),
                    new SideEffectOperationSort(sideEffect.operationSort),
                    new SideEffectAccountId(sideEffect.accountId),
                    new SideEffectEmail(sideEffect.email),
                    new SideEffectEvent(sideEffect.event),
                    new SideEffectAuditableId(sideEffect.auditableId),
                    new SideEffectOldValue(sideEffect.oldValue),
                    new SideEffectNewValue(sideEffect.newValue),
                    new SideEffectIp(sideEffect.ip),
                    new SideEffectMethod(sideEffect.method),
                    new SideEffectBaseUrl(sideEffect.baseUrl),
                    new SideEffectParams(sideEffect.params),
                    new SideEffectQuery(sideEffect.query),
                    new SideEffectBody(sideEffect.body),
                    new SideEffectUserAgent(sideEffect.userAgent),
                    new SideEffectIsRollback(sideEffect.isRollback),
                    new SideEffectRollbackSideEffectId(sideEffect.rollbackSideEffectId),
                    new SideEffectCreatedAt({ currentTimestamp: true }),
                    new SideEffectUpdatedAt({ currentTimestamp: true }),
                    new SideEffectDeletedAt(null),
                ),
            );
        }
    }
}