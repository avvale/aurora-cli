import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuditingSideEffectResponse } from '../../domain/auditing-side-effect.response';
import { AuditingSideEffectMapper } from '../../domain/auditing-side-effect.mapper';
import { AuditingSideEffectId } from '../../domain/value-objects';
import { AuditingFindSideEffectByIdQuery } from './auditing-find-side-effect-by-id.query';
import { AuditingFindSideEffectByIdService } from './auditing-find-side-effect-by-id.service';

@QueryHandler(AuditingFindSideEffectByIdQuery)
export class AuditingFindSideEffectByIdQueryHandler implements IQueryHandler<AuditingFindSideEffectByIdQuery>
{
    private readonly mapper: AuditingSideEffectMapper = new AuditingSideEffectMapper();

    constructor(
        private readonly findSideEffectByIdService: AuditingFindSideEffectByIdService,
    ) {}

    async execute(query: AuditingFindSideEffectByIdQuery): Promise<AuditingSideEffectResponse>
    {
        const sideEffect = await this.findSideEffectByIdService.main(
            new AuditingSideEffectId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(sideEffect);
    }
}
