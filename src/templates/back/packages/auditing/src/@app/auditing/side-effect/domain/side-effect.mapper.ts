import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AuditingSideEffect } from './side-effect.aggregate';
import { SideEffectResponse } from './side-effect.response';
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
} from './value-objects';

export class SideEffectMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param sideEffect
     */
    mapModelToAggregate(sideEffect: LiteralObject, cQMetadata?: CQMetadata): AuditingSideEffect
    {
        if (!sideEffect) return;

        return this.makeAggregate(sideEffect, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param sideEffects
     */
    mapModelsToAggregates(sideEffects: LiteralObject[], cQMetadata?: CQMetadata): AuditingSideEffect[]
    {
        if (!Array.isArray(sideEffects)) return;

        return sideEffects.map(sideEffect => this.makeAggregate(sideEffect, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param sideEffect
     */
    mapAggregateToResponse(sideEffect: AuditingSideEffect): SideEffectResponse
    {
        return this.makeResponse(sideEffect);
    }

    /**
     * Map array of aggregates to array responses
     * @param sideEffects
     */
    mapAggregatesToResponses(sideEffects: AuditingSideEffect[]): SideEffectResponse[]
    {
        if (!Array.isArray(sideEffects)) return;

        return sideEffects.map(sideEffect => this.makeResponse(sideEffect));
    }

    private makeAggregate(sideEffect: LiteralObject, cQMetadata?: CQMetadata): AuditingSideEffect
    {
        return AuditingSideEffect.register(
            new SideEffectId(sideEffect.id, { undefinable: true }),
            new SideEffectTags(sideEffect.tags, { undefinable: true }),
            new SideEffectModelPath(sideEffect.modelPath, { undefinable: true }),
            new SideEffectModelName(sideEffect.modelName, { undefinable: true }),
            new SideEffectOperationId(sideEffect.operationId, { undefinable: true }),
            new SideEffectOperationSort(sideEffect.operationSort, { undefinable: true }),
            new SideEffectAccountId(sideEffect.accountId, { undefinable: true }),
            new SideEffectEmail(sideEffect.email, { undefinable: true }),
            new SideEffectEvent(sideEffect.event, { undefinable: true }),
            new SideEffectAuditableId(sideEffect.auditableId, { undefinable: true }),
            new SideEffectOldValue(sideEffect.oldValue, { undefinable: true }),
            new SideEffectNewValue(sideEffect.newValue, { undefinable: true }),
            new SideEffectIp(sideEffect.ip, { undefinable: true }),
            new SideEffectMethod(sideEffect.method, { undefinable: true }),
            new SideEffectBaseUrl(sideEffect.baseUrl, { undefinable: true }),
            new SideEffectParams(sideEffect.params, { undefinable: true }),
            new SideEffectQuery(sideEffect.query, { undefinable: true }),
            new SideEffectBody(sideEffect.body, { undefinable: true }),
            new SideEffectUserAgent(sideEffect.userAgent, { undefinable: true }),
            new SideEffectIsRollback(sideEffect.isRollback, { undefinable: true }),
            new SideEffectRollbackSideEffectId(sideEffect.rollbackSideEffectId, { undefinable: true }),
            new SideEffectCreatedAt(sideEffect.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new SideEffectUpdatedAt(sideEffect.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new SideEffectDeletedAt(sideEffect.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(sideEffect: AuditingSideEffect): SideEffectResponse
    {
        if (!sideEffect) return;

        return new SideEffectResponse(
            sideEffect.id.value,
            sideEffect.tags.value,
            sideEffect.modelPath.value,
            sideEffect.modelName.value,
            sideEffect.operationId.value,
            sideEffect.operationSort.value,
            sideEffect.accountId.value,
            sideEffect.email.value,
            sideEffect.event.value,
            sideEffect.auditableId.value,
            sideEffect.oldValue.value,
            sideEffect.newValue.value,
            sideEffect.ip.value,
            sideEffect.method.value,
            sideEffect.baseUrl.value,
            sideEffect.params.value,
            sideEffect.query.value,
            sideEffect.body.value,
            sideEffect.userAgent.value,
            sideEffect.isRollback.value,
            sideEffect.rollbackSideEffectId.value,
            sideEffect.createdAt.value,
            sideEffect.updatedAt.value,
            sideEffect.deletedAt.value,
        );
    }
}