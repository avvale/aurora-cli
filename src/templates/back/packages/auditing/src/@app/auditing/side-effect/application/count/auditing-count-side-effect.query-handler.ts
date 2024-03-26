import { AuditingCountSideEffectQuery } from '@app/auditing/side-effect';
import { AuditingCountSideEffectService } from '@app/auditing/side-effect/application/count/auditing-count-side-effect.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingCountSideEffectQuery)
export class AuditingCountSideEffectQueryHandler implements IQueryHandler<AuditingCountSideEffectQuery>
{
    constructor(
        private readonly countSideEffectService: AuditingCountSideEffectService,
    ) {}

    async execute(query: AuditingCountSideEffectQuery): Promise<number>
    {
        return await this.countSideEffectService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
