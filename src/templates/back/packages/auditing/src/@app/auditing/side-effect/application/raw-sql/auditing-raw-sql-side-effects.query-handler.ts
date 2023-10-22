import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuditingSideEffectResponse } from '../../domain/auditing-side-effect.response';
import { AuditingSideEffectMapper } from '../../domain/auditing-side-effect.mapper';
import { AuditingRawSQLSideEffectsQuery } from './auditing-raw-sql-side-effects.query';
import { AuditingRawSQLSideEffectsService } from './auditing-raw-sql-side-effects.service';

@QueryHandler(AuditingRawSQLSideEffectsQuery)
export class AuditingRawSQLSideEffectsQueryHandler implements IQueryHandler<AuditingRawSQLSideEffectsQuery>
{
    private readonly mapper: AuditingSideEffectMapper = new AuditingSideEffectMapper();

    constructor(
        private readonly rawSQLSideEffectsService: AuditingRawSQLSideEffectsService,
    ) {}

    async execute(query: AuditingRawSQLSideEffectsQuery): Promise<AuditingSideEffectResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLSideEffectsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
