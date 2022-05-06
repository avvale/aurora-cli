import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from 'aurora-ts-core';
import { PaginateScopesQuery } from './paginate-scopes.query';
import { PaginateScopesService } from './paginate-scopes.service';

@QueryHandler(PaginateScopesQuery)
export class PaginateScopesQueryHandler implements IQueryHandler<PaginateScopesQuery>
{
    constructor(
        private readonly paginateScopesService: PaginateScopesService,
    ) {}

    async execute(query: PaginateScopesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateScopesService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}