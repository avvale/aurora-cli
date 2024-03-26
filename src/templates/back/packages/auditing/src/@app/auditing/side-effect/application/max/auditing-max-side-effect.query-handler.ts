import { AuditingMaxSideEffectQuery } from '@app/auditing/side-effect';
import { AuditingMaxSideEffectService } from '@app/auditing/side-effect/application/max/auditing-max-side-effect.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingMaxSideEffectQuery)
export class AuditingMaxSideEffectQueryHandler implements IQueryHandler<AuditingMaxSideEffectQuery>
{
    constructor(
        private readonly maxSideEffectService: AuditingMaxSideEffectService,
    ) {}

    async execute(query: AuditingMaxSideEffectQuery): Promise<number>
    {
        return await this.maxSideEffectService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
