import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AuditingPaginateSideEffectsQuery } from './auditing-paginate-side-effects.query';
import { AuditingPaginateSideEffectsService } from './auditing-paginate-side-effects.service';

@QueryHandler(AuditingPaginateSideEffectsQuery)
export class AuditingPaginateSideEffectsQueryHandler implements IQueryHandler<AuditingPaginateSideEffectsQuery>
{
    constructor(
        private readonly paginateSideEffectsService: AuditingPaginateSideEffectsService,
    ) {}

    async execute(query: AuditingPaginateSideEffectsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateSideEffectsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
