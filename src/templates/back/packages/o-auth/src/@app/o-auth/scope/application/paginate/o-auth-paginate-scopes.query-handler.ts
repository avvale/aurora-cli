import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { OAuthPaginateScopesQuery } from './o-auth-paginate-scopes.query';
import { OAuthPaginateScopesService } from './o-auth-paginate-scopes.service';

@QueryHandler(OAuthPaginateScopesQuery)
export class OAuthPaginateScopesQueryHandler implements IQueryHandler<OAuthPaginateScopesQuery>
{
    constructor(
        private readonly paginateScopesService: OAuthPaginateScopesService,
    ) {}

    async execute(query: OAuthPaginateScopesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateScopesService.main(
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
