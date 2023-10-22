import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuditingSideEffectResponse } from '../../domain/auditing-side-effect.response';
import { AuditingSideEffectMapper } from '../../domain/auditing-side-effect.mapper';
import { AuditingGetSideEffectsQuery } from './auditing-get-side-effects.query';
import { AuditingGetSideEffectsService } from './auditing-get-side-effects.service';

@QueryHandler(AuditingGetSideEffectsQuery)
export class AuditingGetSideEffectsQueryHandler implements IQueryHandler<AuditingGetSideEffectsQuery>
{
    private readonly mapper: AuditingSideEffectMapper = new AuditingSideEffectMapper();

    constructor(
        private readonly getSideEffectsService: AuditingGetSideEffectsService,
    ) {}

    async execute(query: AuditingGetSideEffectsQuery): Promise<AuditingSideEffectResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getSideEffectsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
