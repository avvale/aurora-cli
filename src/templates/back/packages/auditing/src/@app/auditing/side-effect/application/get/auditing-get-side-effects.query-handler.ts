import { AuditingGetSideEffectsQuery, AuditingSideEffectMapper, AuditingSideEffectResponse } from '@app/auditing/side-effect';
import { AuditingGetSideEffectsService } from '@app/auditing/side-effect/application/get/auditing-get-side-effects.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingGetSideEffectsQuery)
export class AuditingGetSideEffectsQueryHandler implements IQueryHandler<AuditingGetSideEffectsQuery>
{
    private readonly mapper: AuditingSideEffectMapper = new AuditingSideEffectMapper();

    constructor(
        private readonly getSideEffectsService: AuditingGetSideEffectsService,
    ) {}

    async execute(query: AuditingGetSideEffectsQuery): Promise<AuditingSideEffectResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getSideEffectsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
