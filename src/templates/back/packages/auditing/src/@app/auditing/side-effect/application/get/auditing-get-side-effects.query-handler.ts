import {
  AuditingGetSideEffectsQuery,
  AuditingSideEffect,
  AuditingSideEffectMapper,
  AuditingSideEffectResponse,
} from '@app/auditing/side-effect';
import { AuditingGetSideEffectsService } from '@app/auditing/side-effect/application/get/auditing-get-side-effects.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingGetSideEffectsQuery)
export class AuditingGetSideEffectsQueryHandler
  implements IQueryHandler<AuditingGetSideEffectsQuery>
{
  private readonly mapper: AuditingSideEffectMapper =
    new AuditingSideEffectMapper();

  constructor(
    private readonly getSideEffectsService: AuditingGetSideEffectsService,
  ) {}

  async execute(
    query: AuditingGetSideEffectsQuery,
  ): Promise<AuditingSideEffectResponse[] | LiteralObject[]> {
    const models = await this.getSideEffectsService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    if (query.cQMetadata?.excludeMapModelToAggregate) return models;

    return this.mapper.mapAggregatesToResponses(models as AuditingSideEffect[]);
  }
}
