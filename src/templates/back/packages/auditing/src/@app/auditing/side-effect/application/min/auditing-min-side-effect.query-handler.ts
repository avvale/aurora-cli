import { AuditingMinSideEffectQuery } from '@app/auditing/side-effect';
import { AuditingMinSideEffectService } from '@app/auditing/side-effect/application/min/auditing-min-side-effect.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingMinSideEffectQuery)
export class AuditingMinSideEffectQueryHandler implements IQueryHandler<AuditingMinSideEffectQuery>
{
    constructor(
        private readonly minSideEffectService: AuditingMinSideEffectService,
    ) {}

    async execute(query: AuditingMinSideEffectQuery): Promise<number>
    {
        return await this.minSideEffectService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
