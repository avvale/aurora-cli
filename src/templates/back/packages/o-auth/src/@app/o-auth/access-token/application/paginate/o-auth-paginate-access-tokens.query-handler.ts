import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { OAuthPaginateAccessTokensQuery } from './o-auth-paginate-access-tokens.query';
import { OAuthPaginateAccessTokensService } from './o-auth-paginate-access-tokens.service';

@QueryHandler(OAuthPaginateAccessTokensQuery)
export class OAuthPaginateAccessTokensQueryHandler implements IQueryHandler<OAuthPaginateAccessTokensQuery>
{
    constructor(
        private readonly paginateAccessTokensService: OAuthPaginateAccessTokensService,
    ) {}

    async execute(query: OAuthPaginateAccessTokensQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAccessTokensService.main(
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
