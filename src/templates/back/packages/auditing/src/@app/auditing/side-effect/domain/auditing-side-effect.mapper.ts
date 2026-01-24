import {
  AuditingSideEffect,
  AuditingSideEffectResponse,
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
import {
  CQMetadata,
  IMapper,
  LiteralObject,
  MapperOptions,
} from '@aurorajs.dev/core';

export class AuditingSideEffectMapper implements IMapper {
  constructor(public options: MapperOptions = { eagerLoading: true }) {}

  /**
   * Map object to aggregate
   * @param sideEffect
   */
  mapModelToAggregate(
    sideEffect: LiteralObject,
    cQMetadata?: CQMetadata,
  ): AuditingSideEffect {
    if (!sideEffect) return;

    return this.makeAggregate(sideEffect, cQMetadata);
  }

  /**
   * Map array of objects to array aggregates
   * @param sideEffects
   */
  mapModelsToAggregates(
    sideEffects: LiteralObject[],
    cQMetadata?: CQMetadata,
  ): AuditingSideEffect[] {
    if (!Array.isArray(sideEffects)) return;

    return sideEffects.map((sideEffect) =>
      this.makeAggregate(sideEffect, cQMetadata),
    );
  }

  /**
   * Map aggregate to response
   * @param sideEffect
   */
  mapAggregateToResponse(
    sideEffect: AuditingSideEffect,
  ): AuditingSideEffectResponse {
    return this.makeResponse(sideEffect);
  }

  /**
   * Map array of aggregates to array responses
   * @param sideEffects
   */
  mapAggregatesToResponses(
    sideEffects: AuditingSideEffect[],
  ): AuditingSideEffectResponse[] {
    if (!Array.isArray(sideEffects)) return;

    return sideEffects.map((sideEffect) => this.makeResponse(sideEffect));
  }

  private makeAggregate(
    sideEffect: LiteralObject,
    cQMetadata?: CQMetadata,
  ): AuditingSideEffect {
    return AuditingSideEffect.register(
      new AuditingSideEffectId(sideEffect.id, { undefinable: true }),
      new AuditingSideEffectRowId(sideEffect.rowId, {
        undefinable: true,
      }),
      new AuditingSideEffectTags(sideEffect.tags, { undefinable: true }),
      new AuditingSideEffectModelPath(sideEffect.modelPath, {
        undefinable: true,
      }),
      new AuditingSideEffectModelName(sideEffect.modelName, {
        undefinable: true,
      }),
      new AuditingSideEffectOperationId(sideEffect.operationId, {
        undefinable: true,
      }),
      new AuditingSideEffectOperationSort(sideEffect.operationSort, {
        undefinable: true,
      }),
      new AuditingSideEffectAccountId(sideEffect.accountId, {
        undefinable: true,
      }),
      new AuditingSideEffectEmail(sideEffect.email, {
        undefinable: true,
      }),
      new AuditingSideEffectEvent(sideEffect.event, {
        undefinable: true,
      }),
      new AuditingSideEffectAuditableId(sideEffect.auditableId, {
        undefinable: true,
      }),
      new AuditingSideEffectOldValue(sideEffect.oldValue, {
        undefinable: true,
      }),
      new AuditingSideEffectNewValue(sideEffect.newValue, {
        undefinable: true,
      }),
      new AuditingSideEffectIp(sideEffect.ip, { undefinable: true }),
      new AuditingSideEffectMethod(sideEffect.method, {
        undefinable: true,
      }),
      new AuditingSideEffectBaseUrl(sideEffect.baseUrl, {
        undefinable: true,
      }),
      new AuditingSideEffectParams(sideEffect.params, {
        undefinable: true,
      }),
      new AuditingSideEffectQuery(sideEffect.query, {
        undefinable: true,
      }),
      new AuditingSideEffectBody(sideEffect.body, { undefinable: true }),
      new AuditingSideEffectUserAgent(sideEffect.userAgent, {
        undefinable: true,
      }),
      new AuditingSideEffectIsRollback(sideEffect.isRollback, {
        undefinable: true,
      }),
      new AuditingSideEffectRollbackSideEffectId(
        sideEffect.rollbackSideEffectId,
        { undefinable: true },
      ),
      new AuditingSideEffectCreatedAt(
        sideEffect.createdAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new AuditingSideEffectUpdatedAt(
        sideEffect.updatedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new AuditingSideEffectDeletedAt(
        sideEffect.deletedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
    );
  }

  private makeResponse(
    sideEffect: AuditingSideEffect,
  ): AuditingSideEffectResponse {
    if (!sideEffect) return null;

    return new AuditingSideEffectResponse(
      sideEffect.id.value,
      sideEffect.rowId.value,
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
