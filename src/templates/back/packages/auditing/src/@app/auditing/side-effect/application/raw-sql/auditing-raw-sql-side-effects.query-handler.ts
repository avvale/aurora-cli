import { AuditingRawSQLSideEffectsQuery, AuditingSideEffectMapper, AuditingSideEffectResponse } from '@app/auditing/side-effect';
import { AuditingRawSQLSideEffectsService } from '@app/auditing/side-effect/application/raw-sql/auditing-raw-sql-side-effects.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
