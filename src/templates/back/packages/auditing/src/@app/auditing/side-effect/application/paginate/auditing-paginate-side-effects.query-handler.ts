import { AuditingPaginateSideEffectsQuery } from '@app/auditing/side-effect';
import { AuditingPaginateSideEffectsService } from '@app/auditing/side-effect/application/paginate/auditing-paginate-side-effects.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingPaginateSideEffectsQuery)
export class AuditingPaginateSideEffectsQueryHandler
    implements IQueryHandler<AuditingPaginateSideEffectsQuery>
{
    constructor(
        private readonly paginateSideEffectsService: AuditingPaginateSideEffectsService,
    ) {}

    async execute(
        query: AuditingPaginateSideEffectsQuery,
    ): Promise<PaginationResponse> {
        const { total, count, rows } =
            await this.paginateSideEffectsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            );

        return new PaginationResponse(
            total,
            count,
            rows.map((item) => item.toDTO()),
        );
    }
}
