import {
  AuditingFindSideEffectQuery,
  AuditingSideEffectMapper,
  AuditingSideEffectResponse,
} from '@app/auditing/side-effect';
import { AuditingFindSideEffectService } from '@app/auditing/side-effect/application/find/auditing-find-side-effect.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingFindSideEffectQuery)
export class AuditingFindSideEffectQueryHandler
  implements IQueryHandler<AuditingFindSideEffectQuery>
{
  private readonly mapper: AuditingSideEffectMapper =
    new AuditingSideEffectMapper();

  constructor(
    private readonly findSideEffectService: AuditingFindSideEffectService,
  ) {}

  async execute(
    query: AuditingFindSideEffectQuery,
  ): Promise<AuditingSideEffectResponse> {
    const sideEffect = await this.findSideEffectService.main(
      query.queryStatement,
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(sideEffect);
  }
}
