import {
  AuditingFindSideEffectByIdQuery,
  AuditingSideEffectMapper,
  AuditingSideEffectResponse,
} from '@app/auditing/side-effect';
import { AuditingFindSideEffectByIdService } from '@app/auditing/side-effect/application/find/auditing-find-side-effect-by-id.service';
import { AuditingSideEffectId } from '@app/auditing/side-effect/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingFindSideEffectByIdQuery)
export class AuditingFindSideEffectByIdQueryHandler
  implements IQueryHandler<AuditingFindSideEffectByIdQuery>
{
  private readonly mapper: AuditingSideEffectMapper =
    new AuditingSideEffectMapper();

  constructor(
    private readonly findSideEffectByIdService: AuditingFindSideEffectByIdService,
  ) {}

  async execute(
    query: AuditingFindSideEffectByIdQuery,
  ): Promise<AuditingSideEffectResponse> {
    const sideEffect = await this.findSideEffectByIdService.main(
      new AuditingSideEffectId(query.id),
      query.constraint,
      query.cQMetadata,
    );

    return this.mapper.mapAggregateToResponse(sideEffect);
  }
}
