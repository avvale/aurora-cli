import { AuditingSumSideEffectQuery } from '@app/auditing/side-effect';
import { AuditingSumSideEffectService } from '@app/auditing/side-effect/application/sum/auditing-sum-side-effect.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingSumSideEffectQuery)
export class AuditingSumSideEffectQueryHandler implements IQueryHandler<AuditingSumSideEffectQuery>
{
    constructor(
        private readonly sumSideEffectService: AuditingSumSideEffectService,
    ) {}

    async execute(query: AuditingSumSideEffectQuery): Promise<number>
    {
        return await this.sumSideEffectService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
