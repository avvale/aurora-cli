import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuditingSideEffectResponse } from '../../domain/auditing-side-effect.response';
import { AuditingSideEffectMapper } from '../../domain/auditing-side-effect.mapper';
import { AuditingFindSideEffectQuery } from './auditing-find-side-effect.query';
import { AuditingFindSideEffectService } from './auditing-find-side-effect.service';

@QueryHandler(AuditingFindSideEffectQuery)
export class AuditingFindSideEffectQueryHandler implements IQueryHandler<AuditingFindSideEffectQuery>
{
    private readonly mapper: AuditingSideEffectMapper = new AuditingSideEffectMapper();

    constructor(
        private readonly findSideEffectService: AuditingFindSideEffectService,
    ) {}

    async execute(query: AuditingFindSideEffectQuery): Promise<AuditingSideEffectResponse>
    {
        const sideEffect = await this.findSideEffectService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(sideEffect);
    }
}
