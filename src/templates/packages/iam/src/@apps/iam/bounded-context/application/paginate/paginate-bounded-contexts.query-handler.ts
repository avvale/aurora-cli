import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from 'aurora-ts-core';
import { PaginateBoundedContextsQuery } from './paginate-bounded-contexts.query';
import { PaginateBoundedContextsService } from './paginate-bounded-contexts.service';

@QueryHandler(PaginateBoundedContextsQuery)
export class PaginateBoundedContextsQueryHandler implements IQueryHandler<PaginateBoundedContextsQuery>
{
    constructor(
        private readonly paginateBoundedContextsService: PaginateBoundedContextsService,
    ) {}

    async execute(query: PaginateBoundedContextsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateBoundedContextsService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}