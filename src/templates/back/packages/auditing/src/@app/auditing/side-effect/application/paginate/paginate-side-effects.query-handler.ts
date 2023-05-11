import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { PaginateSideEffectsQuery } from './paginate-side-effects.query';
import { PaginateSideEffectsService } from './paginate-side-effects.service';

@QueryHandler(PaginateSideEffectsQuery)
export class PaginateSideEffectsQueryHandler implements IQueryHandler<PaginateSideEffectsQuery>
{
    constructor(
        private readonly paginateSideEffectsService: PaginateSideEffectsService,
    ) {}

    async execute(query: PaginateSideEffectsQuery): Promise<PaginationResponse>
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